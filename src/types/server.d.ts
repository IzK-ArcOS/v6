interface Server {
  secure: boolean;
  port: number;
  host: string;
  authCode?: string;
  meta?: ServerMeta;
}

interface ServerMeta {
  protected: boolean;
  revision: number;
  name: string;
}

type Params = Record<string, any>;
