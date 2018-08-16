import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { SPECIALTIES_URL} from '@shared/constants';
import { Specialty } from '@shared/models/specialty';
import { EditSpecialtyModalComponent } from '@modules/specialties/components/edit-specialty-modal/edit-specialty-modal.component';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-specialty-details-page',
  templateUrl: './specialty-details-page.component.html'
})
export class SpecialtyDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  id: string;
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
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe(
      params => {
        this.id = params.id;
        if (this.id === undefined) {
          this.alerts.push({type: AlertType.Error, message: `Couldn't get the id of the specialty!`});
        } else {
          this.crudService.getItem(SPECIALTIES_URL, this.id).pipe(takeUntil(this.destroy$)).subscribe(
            element => {
              this.specialty = element;
            },
            () => {
              this.alerts.push({type: AlertType.Error, message: `Couldn't get the specialty!`});
            });
        }
      });
  }

  openEditModal() {
    const initialState: any = {
      specialty: this.specialty,
      id: this.id,
      editItem: this.editItem,
    };
    this.modalRef = this.modalService.show(EditSpecialtyModalComponent, {initialState});
  }

  editItem(event: any) {
    this.specialty.name = event.specialtyName;
    this.specialty.id = event.id;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDeleteModal() {
    this.modalRef = this.modalService.show(ConfirmModalComponent);
    this.modalRef.content.onConfirm.pipe(takeUntil(this.destroy$)).subscribe(
      () => this.crudService.deleteItem(SPECIALTIES_URL, this.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.modalRef.content.afterConfirmAction(SPECIALTIES_URL, `The specialty was successfully deleted!`);
          },
          () => {
            this.modalRef.content.message = `Error on deleting specialty!`;
          }
        ),
    );
  }
}
