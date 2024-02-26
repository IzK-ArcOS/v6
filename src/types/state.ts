import { Login } from "$state/Login/ts/main";

export interface State {
  name: string;
  content: any;
  attribs: { [key: string]: boolean | string | number };
  key: string;
  onload?: () => void;
  image?: string;
  className?: string;
}

export interface LoginState {
  name: string;
  content: any;
  attribs: { [key: string]: boolean | string | number };
  key: string;
  onload?: (runtime: Login) => void;
  image?: string;
}

export type States = Map<string, State>;
export type LoginStates = Map<string, LoginState>;
