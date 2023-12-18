export interface ErrorDialog {
  title: string;
  message?: string;
  buttons: ErrorButton[];
  image?: string;
  component?: any;
}

export interface ErrorButton {
  caption: string;
  action: () => void;
  suggested?: boolean;
}
