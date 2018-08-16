import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Group } from '@shared/models/group';
import { Specialty } from '@shared/models/specialty';
import { EditGroupModalComponent } from '@modules/groups/components/edit-group-modal/edit-group-modal.component';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { GROUPS_URL, SPECIALTIES_URL } from '@shared/constants';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-group-details-page',
  templateUrl: './group-details-page.component.html'
})
export class GroupDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  id: string;
  isEditable = false;
  modalRef: BsModalRef;
  group: Group;
  specialty: Specialty;
  alerts: Array<Alert> = [];
  message: string;

  constructor(private route: ActivatedRoute,
              private crudService: CrudService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(
      params => {
        this.id = params.id;
        if (this.id === undefined) {
          this.alerts.push({type: AlertType.Error, message: `Couldn't get the id of the group!`});
        } else {
          this.crudService.getItem(GROUPS_URL, this.id).pipe(takeUntil(this.destroy$)).subscribe(
            element => {
              this.group = element;
              this.crudService.getItem(SPECIALTIES_URL, this.group.specialtyId).pipe(takeUntil(this.destroy$)).subscribe(
                elementSp => {
                  this.specialty = elementSp;
                },
                () => {
                  this.alerts.push({type: AlertType.Error, message: `Couldn't get the specialty of the group!`});
                });
            },
            () => {
              this.alerts.push({type: AlertType.Error, message: `Couldn't get the group!`});
            });
        }
      });
  }

  openEditModal() {
    const initialState: any = {
      group: this.group,
      id: this.id,
      specialty: this.specialty,
      editItem: this.editItem,
    };
    this.modalRef = this.modalService.show(EditGroupModalComponent, {initialState});
  }

  editItem(event: any) {
    this.group.name = event.groupName;
    this.specialty.name = event.specialty.name;
    this.specialty.id = event.specialty.id;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDeleteModal() {
    this.modalRef = this.modalService.show(ConfirmModalComponent);
    this.modalRef.content.onConfirm.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.crudService.deleteItem(GROUPS_URL, this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.modalRef.content.afterConfirmAction(GROUPS_URL, `The group was successfully deleted!`);
          },
          () => {
            this.modalRef.content.message = `Error on deleting group!`;
          }
        ),
    );
  }
}
