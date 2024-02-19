export interface Server {
  secure: boolean;
  port: number;
  host: string;
  authCode?: string;
  meta?: ServerMeta;
}

export interface ServerMeta {
  protected: boolean;
  revision: number;
  name: string;
}

export type Params = Record<string, any>;

export interface ServerSelectOption {
  private: boolean;
  hostname: string;
  authCode: string;
}
