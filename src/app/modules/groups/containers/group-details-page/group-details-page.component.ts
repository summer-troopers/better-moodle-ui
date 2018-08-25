import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject, throwError } from 'rxjs';
import { flatMap, takeUntil, mergeMap, catchError } from 'rxjs/operators';

import { Group } from '@shared/models/group';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { GROUPS_URL, MODAL_OPTIONS, SPECIALTIES_URL } from '@shared/constants';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';

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
    this.initGroup();
  }

  openEditModal() {
    MODAL_OPTIONS['initialState'] = {
      onAdd: false,
      itemType: 'group',
      item: this.group,
      title: 'Edit Group',
      buttonTitle: 'Update Group'
    };
    this.modalRef = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);
    this.modalRef.content.itemEdited
      .pipe(
        takeUntil(this.destroy$),
        mergeMap((updatedData: any) => {
          this.group = updatedData;
          return this.crudService.getItem(SPECIALTIES_URL, updatedData.specialtyId.toString())
            .pipe(
              catchError((error) => {
                this.alerts.push({ type: AlertType.Error, message: error });
                return throwError(error);
              })
            );
        }),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return throwError(error);
        })
      )
      .subscribe((specialty) => {
        this.group.specialty = specialty;
        this.alerts.push({ type: AlertType.Success, message: 'Student data updated!' });
      });
    this.modalRef = this.modalService.show(EditGroupModalComponent, { initialState });
  }

  editItem(event: any) {
    this.group.name = event.groupName;
    this.group.specialty = event.specialty;
  }

  initGroup() {
    this.route.params
      .pipe(
        flatMap(
          params => {
            return this.crudService.getItem(GROUPS_URL, params.id);
          }),
        takeUntil(this.destroy$)
      ).subscribe(
        group => {
          this.group = group;
        },
        error => {
          this.alerts.push({ type: AlertType.Error, message: `Couldn't get the group!` });
        }
      );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDeleteModal() {
    this.modalRef = this.modalService.show(ConfirmModalComponent);
    this.modalRef.content.onConfirm.pipe(
      flatMap(() => {
        return this.crudService.deleteItem(GROUPS_URL, this.group.id);
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      success => {
        this.modalRef.content.afterConfirmAction(GROUPS_URL, `The group was successfully deleted!`);
      },
      error => {
        this.modalRef.content.message = `Error on deleting group!`;
      }
    );
  }
}
