interface State {
  name: string;
  content: any;
  attribs: { [key: string]: boolean | string | number };
  key: string;
  onload?: () => void;
  image?: string;
}

type States = Map<string, State>;
