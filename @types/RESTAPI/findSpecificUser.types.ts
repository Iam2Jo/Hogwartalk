export type ResponseValue = {
  user: User;
};

export interface User {
  id: string;
  name: string;
  picture: string;
}
