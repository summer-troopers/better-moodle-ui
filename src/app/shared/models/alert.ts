export class Alert {
  type: AlertType;
  message: string;
}

export enum AlertType {
<<<<<<< HEAD
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning'
=======
  Success,
  Error,
  Info,
  Warning
>>>>>>> [FIXED][TASK-4046] delete httpheader in techer-service and modify models
}
