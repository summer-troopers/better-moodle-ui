import { Component, Input, OnDestroy, EventEmitter } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Alert, AlertType } from '@shared/models/alert';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';
import { MODAL_OPTIONS } from '@shared/constants';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() user;

  serForm: FormGroup;
  alerts: Alert[] = [];

  modal: BsModalRef;

  downloadAlertEvent: EventEmitter<any> = new EventEmitter<any>();

  constructor(private modalService: BsModalService,
    private dashboardService: DashboardService) { }

  openEditModal() {
    MODAL_OPTIONS['initialState'] = {
      onAdd: false,
      itemType: 'admin',
      item: this.user,
      title: 'Edit Admin',
      buttonTitle: 'Update Admin'
    };
    this.modal = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);
    this.modal.content.itemEdited
      .pipe(takeUntil(this.destroy$))
      .subscribe((admin) => {
        this.user = admin;
        this.alerts.push({ type: AlertType.Success, message: 'Admin was edited!' });
        this.downloadAlertEvent.emit(this.dashboardService.downloadAlert.next(this.alerts));
      }, error => {
        this.alerts.push({ type: AlertType.Error, message: error });
        this.downloadAlertEvent.emit(this.dashboardService.downloadAlert.next(this.alerts));
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
