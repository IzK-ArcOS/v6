export interface ErrorDialog {
  title: string;
  message?: string;
  buttons: ErrorButton[];
  image?: string;
  component?: any;
  shrunk?: boolean
}

export interface ErrorButton {
  caption: string;
  action: () => void;
  suggested?: boolean;
}
