import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';

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
    this.initGroup();
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

  initGroup() {
    this.route.params.pipe(
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
        this.alerts.push({type: AlertType.Error, message: `Couldn't get the group!`});
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
