import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Alert } from '@shared/models/alert';
import { AlertService } from '@shared/services/alert/alert.service';
import { LocalAlertComponent } from '@shared/components/alert/local-alert/local-alert.component';

@Component({
  selector: 'app-alert',
  templateUrl: './local-alert/local-alert.component.html',
})
export class AlertComponent extends LocalAlertComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {
    super();
  }

  ngOnInit() {
    this.alertService.getAlert().pipe(takeUntil(this.destroy$)).subscribe((alert: Alert) => {
      if (!alert) {
        this.alerts = [];
        return;
      }

      this.alerts.push(alert);
    });
  }
}
