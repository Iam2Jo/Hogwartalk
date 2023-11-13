export interface Message {
  id: string;
  text: string;
  userId: string; // 메세지를 보낸 사람의 id
  createdAt: Date;
}

export interface ResponseData {
  messages: Message[];
}