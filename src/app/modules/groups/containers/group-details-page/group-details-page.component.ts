import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject, throwError } from 'rxjs';
import { catchError, flatMap, map, takeUntil } from 'rxjs/operators';

import { Group } from '@shared/models/group';
import { EditGroupModalComponent } from '@modules/groups/components/edit-group-modal/edit-group-modal.component';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { GROUPS_URL } from '@shared/constants';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-group-details-page',
  templateUrl: './group-details-page.component.html'
})
export class GroupDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  isEditable = false;
  modalRef: BsModalRef;
  group: Group;
  alerts: Array<Alert> = [];
  message: string;

  constructor(private route: ActivatedRoute,
              private crudService: CrudService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(
        params => {
          return this.crudService.getItem(GROUPS_URL, params.id).pipe(
            catchError(err => {
              this.alerts.push({type: AlertType.Error, message: `Couldn't get the group!`});

              return throwError(err);
            }),
            map(
              group => {
                this.group = group;
              }));
        }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  openEditModal() {
    const initialState: any = {
      group: this.group,
      editItem: this.editItem,
    };
    this.modalRef = this.modalService.show(EditGroupModalComponent, {initialState});
  }

  editItem(event: any) {
    this.group.name = event.groupName;
    this.group.specialty = event.specialty;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDeleteModal() {
    this.modalRef = this.modalService.show(ConfirmModalComponent);
    this.modalRef.content.onConfirm.pipe(
      flatMap(() => {
        return this.crudService.deleteItem(GROUPS_URL, this.group.id)
          .pipe(
            catchError(
              err => {
                this.modalRef.content.message = `Error on deleting group!`;

                return throwError(err);
              }),
            map(
              () => {
                this.modalRef.content.afterConfirmAction(GROUPS_URL, `The group was successfully deleted!`);
              }));
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
