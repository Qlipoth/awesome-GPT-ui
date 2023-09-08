import React, { useMemo } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import { SiOpenai } from 'react-icons/all';
import { ParticipantType } from './OpenAIAnswer/types.openAiAnswer';
import { useStore } from './StoreProvider';

interface IChatItemProps {
  participantType: ParticipantType;
}

const ChatItem: React.FC<IChatItemProps> = ({ participantType, children }) => {
  const { user } = useStore('sessionStore');
  const isUser = useMemo(
    () => participantType === ParticipantType.USER,
    [participantType]
  );

  return (
    <Root isUser={isUser}>
      <UserIcon isUser={isUser}>
        {(isUser && user?.email.at(0)) || (
          <span>
            <SiOpenai className="icon-spin" />
          </span>
        )}
      </UserIcon>

      <div className="p-3 pl-4 w-full">{children}</div>
    </Root>
  );
};

export default observer(ChatItem);

const Root = styled.div<{ isUser?: boolean }>`
  display: flex;
  align-items: baseline;
  padding: 1rem;
  background-color: ${({ isUser }) => (isUser && '#2f3d52') || '#1f2937'};
`;

const UserIcon = styled.span<{ isUser?: boolean }>`
  display: flex;
  width: 1.5rem;
  height: 1.5rem;
  padding: 1.5rem;
  align-items: center;
  color: #ffffff;
  justify-content: center;
  border-radius: ${({ isUser }) => (isUser && '1.5rem') || 'initial'};
  background-color: ${({ isUser }) => (isUser && '#ff5722') || '#9c27b0'};
  font-size: ${({ isUser }) => (isUser && '1.5rem') || 'initial'};

  span {
    transform: scale(1.5);
  }
`;
