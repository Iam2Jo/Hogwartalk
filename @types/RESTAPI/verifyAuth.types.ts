export interface ResponseValue {
  auth: boolean;
  user?: User;
}

export interface User {
  id: string;
  name: string;
  picture: string;
}
