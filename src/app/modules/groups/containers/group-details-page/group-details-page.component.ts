import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject, throwError } from 'rxjs';
import { flatMap, takeUntil, mergeMap, catchError } from 'rxjs/operators';

import { Group } from '@shared/models/group';
import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { GROUPS_URL, STUDENTS_URL, MODAL_OPTIONS, SPECIALTIES_URL } from '@shared/constants';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';

@Component({
  selector: 'app-group-details-page',
  templateUrl: './group-details-page.component.html'
})
export class GroupDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  isEditable = false;
  modal: BsModalRef;
  group: Group;
  groupStudents: any;
  alerts: Alert[] = [];
  message: string;

  constructor(private route: ActivatedRoute,
    private crudService: CrudService,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getItem();
    this.getGroupStudents();
  }

  getItem() {
    this.route.params
      .pipe(
        flatMap(params => {
          return this.crudService.getItem(GROUPS_URL, params.id)
            .pipe(catchError(error => {
              this.alerts.push({ type: AlertType.Error, message: error });

              return throwError(error);
            }));
        }),
        takeUntil(this.destroy$)
      ).subscribe(group => {
        this.group = group;
      },
        error => {
          this.alerts.push({ type: AlertType.Error, message: `Can not get the group!` });
        }
      );
  }

  getGroupStudents() {
    return this.crudService.getItems(STUDENTS_URL)
      .subscribe(
        students => {
          const temp: any = [];
          for (let i = 0; i < students.length; i++) {
            if (students[i].group.id == this.route.params.value.id) {
              temp[i] = students[i];
            }
          }
          this.groupStudents = temp.filter(element => {
            return element !== undefined;
          });
        }, catchError(error => {
          this.alerts.push({ type: AlertType.Error, message: error });
          return throwError(error);
        }));
  }

  openEditModal() {
    MODAL_OPTIONS['initialState'] = {
      onAdd: false,
      itemType: 'group',
      item: this.group,
      title: 'Edit Group',
      buttonTitle: 'Update Group'
    };
    this.modal = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);
    this.modal.content.itemEdited
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
  }

  editItem(event: any) {
    this.group.name = event.groupName;
    this.group.specialty = event.specialty;
  }
  openDeleteModal() {
    this.modal = this.modalService.show(ConfirmModalComponent);
    this.modal.content.onConfirm.pipe(
      flatMap(() => {
        return this.crudService.deleteItem(GROUPS_URL, this.group.id);
      }),
      takeUntil(this.destroy$)
    ).subscribe(succ => {
      this.modal.content.afterConfirmAction(GROUPS_URL);
      this.alerts.push({ type: AlertType.Success, message: 'Deleted!\nYou will be redirected in a moment!' });
    }, error => {
      this.alerts.push({ type: AlertType.Error, message: error });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
