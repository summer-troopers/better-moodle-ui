export class Alert {
  type: AlertType;
  message: string;
}

export enum AlertType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
}
