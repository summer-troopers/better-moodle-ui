import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { catchError, mergeMap, takeUntil } from 'rxjs/operators';

import { Specialty } from '@shared/models/specialty';
import { AddSpecialtyModalComponent } from '@modules/specialties/components/add-specialty-modal/add-specialty-modal.component';
import { PaginationParams } from '@shared/models/pagination-params';
import { Alert, AlertType } from '@shared/models/alert';
import { CrudService } from '@shared/services/crud/crud.service';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { SPECIALTIES_URL, NUMBER_ITEMS_PAGE } from '@shared/constants';

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
  currentPage = 1;
  pageParam: number;
  specialties: Array<Specialty> = [];
  modalRef: BsModalRef;

  constructor(private crudService: CrudService,
              private route: ActivatedRoute,
              private router: Router,
              private paginatorHelperService: PaginatorHelperService,
              private modalService: BsModalService) {}

  ngOnInit() {
    this.initPage();
    this.initNumberOfSpecialties();
  }

  initPage() {
    this.route.queryParams.subscribe((params) => {
      this.pageParam = +params.page;
      this.paginatorHelperService.getCurrentPage(this.pageParam);
    });
  }

  initNumberOfSpecialties() {
    this.crudService.getNumberOfItems(SPECIALTIES_URL)
      .pipe(
        mergeMap((teachersNumber: number) => {
          this.totalItems = teachersNumber;
          this.paginationParams.offset = this.paginatorHelperService.getOffset(this.totalItems, NUMBER_ITEMS_PAGE);

          return this.crudService.getItems(SPECIALTIES_URL, this.paginationParams.offset, this.paginationParams.limit)
            .pipe(takeUntil(this.destroy$));
        }),
        catchError((error) => {
          this.alerts.push({ type: AlertType.Error, message: error });

          return throwError(error);
        })
      )
      .subscribe((specialties) => {
        this.specialties = specialties;
        this.specialties.reverse();
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;

    this.paginationParams = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage);

    this.crudService.getItems(SPECIALTIES_URL, this.paginationParams.offset, this.paginationParams.limit)
      .pipe(takeUntil(this.destroy$),
        catchError(error => {
        this.alerts.push({ type: AlertType.Error, message: error });

        return throwError(error);
      }))
      .subscribe((specialties) => {
        this.specialties = specialties;
        this.specialties.reverse();
      });

    this.router.navigate([`${SPECIALTIES_URL}`], { queryParams: { page: event.page } });
  }

  openAddModal() {
    this.modalRef = this.modalService.show(AddSpecialtyModalComponent);
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
