import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject, throwError } from 'rxjs';
import { catchError, flatMap, map, takeUntil } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { SPECIALTIES_URL } from '@shared/constants';
import { Specialty } from '@shared/models/specialty';
import { EditSpecialtyModalComponent } from '@modules/specialties/components/edit-specialty-modal/edit-specialty-modal.component';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-specialty-details-page',
  templateUrl: './specialty-details-page.component.html'
})
export class SpecialtyDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  isEditable = false;
  specialty: Specialty;
  modalRef: BsModalRef;
  alerts: Array<Alert> = [];
  message: string;

  constructor(private route: ActivatedRoute,
              private modalService: BsModalService,
              private crudService: CrudService) {
  }

  ngOnInit() {
    this.route.params.pipe(
      flatMap(
        params => {
          return this.crudService.getItem(SPECIALTIES_URL, params.id).pipe(
            catchError(err => {
              this.alerts.push({type: AlertType.Error, message: `Couldn't get the specialty!`});

              return throwError(err);
            }),
            map(
              specialty => {
                this.specialty = specialty;
              }));
        }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  openEditModal() {
    const initialState: any = {
      specialty: this.specialty,
      editItem: this.editItem,
    };
    this.modalRef = this.modalService.show(EditSpecialtyModalComponent, {initialState});
  }

  editItem(event: any) {
    this.specialty.name = event.specialtyName;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDeleteModal() {
    this.modalRef = this.modalService.show(ConfirmModalComponent);
    this.modalRef.content.onConfirm.pipe(
      flatMap(() => {
        return this.crudService.deleteItem(SPECIALTIES_URL, this.specialty.id)
          .pipe(
            catchError(
              err => {
                this.modalRef.content.message = `Error on deleting specialty!`;

                return throwError(err);
              }),
            map(
              () => {
                this.modalRef.content.afterConfirmAction(SPECIALTIES_URL, `The specialty was successfully deleted!`);
              }));
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }
}
