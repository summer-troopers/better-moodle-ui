import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Alert, AlertType } from '@shared/models/alert';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';
import { MODAL_OPTIONS } from '@shared/constants';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  @Input() user;

  serForm: FormGroup;
  alerts: Alert[] = [];
  userForm: FormGroup;

  modal: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
    this.userForm = new FormGroup({
      id: new FormControl(this.user.id),
      firstName: new FormControl(this.user.firstName, Validators.required),
      lastName: new FormControl(this.user.lastName, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      phoneNumber: new FormControl(this.user.phoneNumber, Validators.required),
    });
  }

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
      }, error => {
        this.alerts.push({ type: AlertType.Error, message: error });
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
