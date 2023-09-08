import React, { useEffect, useMemo, useRef, useState } from 'react';
import _ from 'lodash';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { railscasts } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import beautify from 'js-beautify';
import styled from 'styled-components';
import { IoMdCopy } from 'react-icons/all';
import CopyToClipboard from 'react-copy-to-clipboard';
import ButtonIcon from '../ButtonIcon';
import {
  AVAILABLE_LANG_LABELS,
  OPEN_AI_QUESTION_URL,
  PRETTIER_OPTIONS,
} from './constants.openAiAnswer';
import { IOpenAIAnswerProps, ITextBlock } from './types.openAiAnswer';

const OpenAIAnswer: React.FC<IOpenAIAnswerProps> = ({
  question,
  answer = '',
  onReceivedData,
}) => {
  const [text, setText] = useState(answer);
  const started = useRef<string>('');

  useEffect(() => {
    if (!question && text) {
      setText('');
    }
  }, [question, text]);

  const textBlocks = useMemo<ITextBlock[]>(() => {
    if (!text) return [];
    const modifiedText = text.replaceAll('__', '\n');
    const regex = /(```[\s\S]*?```|[^`]+)/g;
    const matches = modifiedText.match(regex);
    if (!matches?.length) return [];

    return matches.map((match) => {
      if (match.startsWith('```')) {
        return {
          type: 'code',
          content: match.slice(3, -3),
        };
      }
      return { type: 'text', content: match };
    }) as ITextBlock[];
  }, [text]);

  const handleCopy = () => {
    console.warn('text is copied!');
  };

  const formattedBlocks = useMemo(() => {
    return textBlocks.map((block, index) => {
      if (block.type === 'code') {
        try {
          const clearRegex = /```(\w+)?\s[\s\S]*?|```/g;

          const regexString = `^(?<language>(${AVAILABLE_LANG_LABELS.join(
            '|'
          )}))\\s`;
          const regexLangLabels = new RegExp(regexString, 'm');

          const match = regexLangLabels.exec(block.content);
          const langTag = match?.groups?.language;

          const formattedText = beautify(
            block.content.replace(clearRegex, '').replace(regexLangLabels, ''),
            PRETTIER_OPTIONS
          );
          return (
            <div className="my-3" key={_.uniqueId(`-${index}`)}>
              <LangLabel>
                <span>{langTag || 'code'}</span>
                <CopyToClipboard text={formattedText} onCopy={handleCopy}>
                  <ButtonIcon>
                    <IoMdCopy />
                  </ButtonIcon>
                </CopyToClipboard>
              </LangLabel>
              <SyntaxHighlighter
                language="javascript"
                style={railscasts}
                wrapLines
              >
                {formattedText}
              </SyntaxHighlighter>
            </div>
          );
        } catch (e) {
          console.error(e);
          return block.content;
        }
      } else {
        const re = /`([\w\s\S]+?)`/g;
        const output = block.content
          .replace(re, (match, group) => {
            return `<strong>${group}</strong>`;
          })
          .replaceAll('\n', '');
        return (
          <span
            key={_.uniqueId(`-${index}`)}
            dangerouslySetInnerHTML={{ __html: output }}
          />
        );
      }
    });
  }, [textBlocks]);

  useEffect(() => {
    if (!question || answer || !!started.current) return;
    const eventSource = new EventSource(`${OPEN_AI_QUESTION_URL}${question}`);

    eventSource.onmessage = (event) => {
      const response = event.data;
      started.current += response;
      setText((prev) => prev + response);
    };

    eventSource.onerror = (err) => {
      console.error(err);
      if (started.current) {
        onReceivedData(started.current || '');
        started.current = '';
      }
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [answer, onReceivedData, question]);
  return <div>{formattedBlocks}</div>;
};

export default React.memo(OpenAIAnswer);

const LangLabel = styled.div`
  background: #294d7f;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  justify-content: space-between;
  color: #fff;
`;
