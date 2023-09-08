import React, { useCallback, useState } from 'react';
import 'regenerator-runtime/runtime';

import styled from 'styled-components';
import _ from 'lodash';
import Dictaphone from '../components/Dictaphone';
import OpenAIAnswer from '../components/OpenAIAnswer/OpenAIAnswer';
import {
  IChatItem,
  ParticipantType,
} from '../components/OpenAIAnswer/types.openAiAnswer';
import ChatItem from '../components/ChatItem';

function Main() {
  const [text, setText] = useState('');
  const [chatItems, setChatItems] = useState<IChatItem[]>([]);

  const addQuestion = useCallback(
    (question: string) => {
      setChatItems((prev) => {
        return [
          ...prev,
          {
            item: question,
            type: ParticipantType.USER,
          },
          {
            item: '',
            type: ParticipantType.AI,
            question,
          },
        ];
      });
    },
    [setChatItems]
  );

  const receiveData = useCallback(
    (str: string) => {
      const updatingItems = _.cloneDeep(chatItems);
      const last = updatingItems.pop();
      updatingItems.push({
        item: str,
        type: last.type,
        question: last.question,
      });

      setChatItems(updatingItems);
    },
    [chatItems]
  );

  return (
    <Page>
      <div className="flex-1">
        {chatItems.map((item, index) => (
          <ChatItem key={_.uniqueId(`-${index}`)} participantType={item.type}>
            {item.type === 'user' ? (
              item.item
            ) : (
              <OpenAIAnswer
                question={`${item.question}`}
                answer={item.item}
                onReceivedData={receiveData}
              />
            )}
          </ChatItem>
        ))}
      </div>
      <Dictaphone onStop={addQuestion} onReset={() => setChatItems([])} />
    </Page>
  );
}

export default Main;

const Page = styled.div`
  display: flex;
  flex-flow: column;
  min-height: calc(100vh - 136px);
`;
