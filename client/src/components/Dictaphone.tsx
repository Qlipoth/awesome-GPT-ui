import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { IoIosMic, IoIosRefresh } from 'react-icons/all';
import styled from 'styled-components';
import ButtonIcon from './ButtonIcon';

interface IDictProps {
  onStop: (text) => void;
  onReset: () => void;
}

const Dictaphone: React.FC<IDictProps> = ({ onStop, onReset }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [textValue, setTextValue] = useState('');

  const textRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setTextValue(transcript);
  }, [transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesnt support speech recognition.</span>;
  }

  const toggleMicro = useCallback(async () => {
    try {
      if (!listening) {
        return await SpeechRecognition.startListening({ continuous: true });
      }
      await SpeechRecognition.stopListening();
      if (!textRef?.current?.focus) return;
      textRef.current.focus();
      textRef.current.selectionStart = textRef.current.value.length;
      textRef.current.selectionEnd = textRef.current.value.length;
    } catch (err) {
      console.error(err);
    }
  }, [listening]);

  const onSent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey) {
    } else if (e.keyCode === 13) {
      e.preventDefault();
      e.stopPropagation();
      onStop(textValue);
      setTextValue('');
      resetTranscript();
    }
  };

  const reset = useCallback(() => {
    resetTranscript();
    onReset();
  }, [onReset, resetTranscript]);

  return (
    <Root className="flex align-middle w-full">
      <Wrapper listening={listening} className="flex-1">
        <TextareaAutosize
          ref={textRef}
          minRows={1}
          className="w-full pl-4 pr-8 py-2 area-field"
          value={textValue}
          onKeyDown={onSent}
          placeholder="Send a message..."
          onChange={(e) => setTextValue(e.target.value)}
        />
        <Panel>
          <ButtonIcon className="micro" onClick={toggleMicro}>
            <IoIosMic />
          </ButtonIcon>
          <ButtonIcon className="text-white ml-2" onClick={reset}>
            <IoIosRefresh />
          </ButtonIcon>
        </Panel>
      </Wrapper>
    </Root>
  );
};
export default Dictaphone;

const Panel = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div<{ listening?: boolean }>`
  position: relative;

  .micro {
    color: ${({ listening }) => (listening && '#991b1b') || '#fff'};
  }

  .area-field {
    border: 2px solid #6b7280;
    background-color: #1f2937;
    color: #fff;
    border-radius: 0 0 5px 5px;
    outline: none;

    &::placeholder {
      color: #fff;
    }

    &:focus {
      border-color: #fff;
      box-shadow: 0px 0px 7px #feecec;
    }
  }
`;

const Root = styled.div`
  position: sticky;
  bottom: -5px;
`;
