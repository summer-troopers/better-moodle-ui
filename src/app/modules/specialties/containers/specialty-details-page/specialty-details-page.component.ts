import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { flatMap, takeUntil } from 'rxjs/operators';

import { CrudService } from '@shared/services/crud/crud.service';
import { Alert, AlertType } from '@shared/models/alert';
import { SPECIALTIES_URL, MODAL_OPTIONS } from '@shared/constants';
import { Specialty } from '@shared/models/specialty';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';
import { ConfirmModalComponent } from '@shared/components/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-specialty-details-page',
  templateUrl: './specialty-details-page.component.html'
})
export class SpecialtyDetailsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  isEditable = false;
  specialty: Specialty;
  modal: BsModalRef;
  alerts: Array<Alert> = [];
  message: string;

  constructor(private route: ActivatedRoute,
    private modalService: BsModalService,
    private crudService: CrudService) {
  }

  ngOnInit() {
    this.initSpecialty();
  }

  openEditModal() {
    MODAL_OPTIONS['initialState'] = {
      onAdd: false,
      itemType: 'specialty',
      item: this.specialty,
      title: 'Edit Specialty',
      buttonTitle: 'Update Specialty'
    };
    this.modal = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);
    this.modal.content.itemEdited
      .pipe(takeUntil(this.destroy$))
      .subscribe((specialty) => {
        this.specialty = specialty;
        this.alerts.push({ type: AlertType.Success, message: 'Teacher was edited!' });
      }, error => {
        this.alerts.push({ type: AlertType.Error, message: error });
      });
  }

  editItem(event: any) {
    this.specialty.name = event.specialtyName;
  }

  initSpecialty() {
    this.route.params.pipe(
      flatMap(
        params => {
          return this.crudService.getItem(SPECIALTIES_URL, params.id);
        }),
      takeUntil(this.destroy$)
    ).subscribe(
      specialty => {
        this.specialty = specialty;
      },
      error => {
        this.alerts.push({ type: AlertType.Error, message: `Couldn't get the specialty!` });
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openDeleteModal() {
    this.modal = this.modalService.show(ConfirmModalComponent);
    this.modal.content.onConfirm.pipe(
      flatMap(() => {
        return this.crudService.deleteItem(SPECIALTIES_URL, this.specialty.id);
      }),
      takeUntil(this.destroy$)
    ).subscribe(succ => {
      this.modal.content.afterConfirmAction(SPECIALTIES_URL);
      this.alerts.push({ type: AlertType.Success, message: 'Deleted!\nYou will be redirected in a moment!' });
    }, error => {
      this.alerts.push({ type: AlertType.Error, message: error });
    });
  }
}
