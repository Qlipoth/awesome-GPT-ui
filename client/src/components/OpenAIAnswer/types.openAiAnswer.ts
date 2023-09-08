export interface IOpenAIAnswerProps {
  answer: string;
  question: string;
  onReceivedData: (text: string) => void;
}

export enum ParticipantType {
  AI = 'ai',
  USER = 'user',
}

export interface ITextBlock {
  type: 'text | code';
  content: string;
}

export interface IChatItem {
  type: ParticipantType;
  item: string;
  question?: string;
}
