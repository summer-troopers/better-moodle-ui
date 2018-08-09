import { Component, Input } from '@angular/core';

import { Alert, AlertType } from '../../../models/alert';

@Component({
  selector: 'app-local-alert',
  templateUrl: './local-alert.component.html',
})
export class LocalAlertComponent {
  @Input('alerts') alerts: Alert[] = [];

  constructor() { }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter(alertElement => alertElement !== alert);
  }

  generateAlertCssClass(alert: Alert): string {
    if (!alert) {
      return;
    }

    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success';
      case AlertType.Error:
        return 'alert alert-danger';
      case AlertType.Info:
        return 'alert alert-info';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }
}
