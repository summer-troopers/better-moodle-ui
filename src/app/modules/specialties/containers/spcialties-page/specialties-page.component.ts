import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { catchError, mergeMap, takeUntil } from 'rxjs/operators';

import { Specialty } from '@shared/models/specialty';
import { AddSpecialtyModalComponent } from '@modules/specialties/components/add-specialty-modal/add-specialty-modal.component';
import { PaginationParams } from '@shared/models/pagination-params';
import { Alert, AlertType } from '@shared/models/alert';
import { CrudService } from '@shared/services/crud/crud.service';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';
import { SPECIALTIES_URL, NUMBER_ITEMS_PAGE, MODAL_OPTIONS } from '@shared/constants';

@Component({
  selector: 'app-specialties-page',
  templateUrl: './specialties-page.component.html',
  styleUrls: ['./specialties-page.component.scss']
})
export class SpecialtiesPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  alerts: Array<Alert> = [];
  paginationParams = new PaginationParams(0, NUMBER_ITEMS_PAGE);
  totalItems: number;
  currentPage: number;
  specialties: Array<Specialty> = [];
  modalRef: BsModalRef;

  constructor(private crudService: CrudService,
    private route: ActivatedRoute,
    private router: Router,
    private paginatorHelperService: PaginatorHelperService,
    private modalService: BsModalService) {
  }

  ngOnInit() {
    this.initPage();
  }

  initPage() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = this.paginatorHelperService.getCurrentPage(params.page);
      this.initNumberOfSpecialties();
    });
  }

  getSpecialties(): Observable<Array<Specialty>> {
    return this.crudService.getItems(SPECIALTIES_URL, this.paginationParams.offset, this.paginationParams.limit)
      .pipe(takeUntil(this.destroy$),
        catchError(error => {
          this.alerts.push({ type: AlertType.Error, message: error });

          return throwError(error);
        }));
  }

  initNumberOfSpecialties() {
    this.crudService.getNumberOfItems(SPECIALTIES_URL)
      .pipe(
        takeUntil(this.destroy$),
        mergeMap((specialtiesNumber: number) => {
          this.totalItems = specialtiesNumber;
          this.paginationParams = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage);

          return this.getSpecialties();
        }))
      .subscribe((specialties) => {
        this.setSpecialties(specialties);
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.router.navigate([SPECIALTIES_URL], { queryParams: { page: event.page } });
  }

  openAddModal() {
    MODAL_OPTIONS['initialState'] = {
      onAdd: true,
      itemType: 'specialty'
    };
    this.modalRef = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);
    this.modalRef.content.itemAdded
      .subscribe((newSpecialty) => {
        this.specialties.unshift(newSpecialty);
      });
  }

  setSpecialties(specialties) {
    this.specialties = specialties.reverse();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
