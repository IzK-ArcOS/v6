export interface ErrorDialog {
  title: string;
  message?: string;
  buttons: ErrorButton[];
  image?: string;
  component?: any;
  shrunk?: boolean;
  sound?: string;
}

export interface ErrorButton {
  caption: string;
  action: () => void;
  suggested?: boolean;
}
