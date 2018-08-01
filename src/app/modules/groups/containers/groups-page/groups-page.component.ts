import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { catchError, mergeMap, takeUntil } from 'rxjs/operators';

import { Group } from '@shared/models/group';
import { CrudService } from '@shared/services/crud/crud.service';
import { AddGroupModalComponent } from '@modules/groups/components/add-group-modal/add-group-modal.component';
import { GROUPS_URL, NUMBER_ITEMS_PAGE } from '@shared/constants';
import { PaginationParams } from '@shared/models/pagination-params';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { Alert, AlertType } from '@shared/models/alert';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html',
  styleUrls: ['./groups-page.component.scss']
})
export class GroupsPageComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  paginationParams = new PaginationParams(0, NUMBER_ITEMS_PAGE);
  alerts: Array<Alert> = [];
  groups: Array<Group> = [];
  modalRef: BsModalRef;
  group: Group;
  currentPage = 1;
  id: string;
  totalItems: number;
  pageParam: number;

  constructor(private crudService: CrudService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private router: Router,
              private paginatorHelperService: PaginatorHelperService) {
  }

  ngOnInit() {
    this.initPage();
    this.initNumberOfGroups();
  }

  initPage() {
    this.route.queryParams.subscribe((params) => {
      this.pageParam = +params.page;
      this.paginatorHelperService.getCurrentPage(this.pageParam);
    });
  }

  initNumberOfGroups() {
    this.crudService.getNumberOfItems(GROUPS_URL)
      .pipe(
        takeUntil(this.destroy$),
        mergeMap((groupsNumber: number) => {
          this.totalItems = groupsNumber;
          this.paginationParams.offset = this.paginatorHelperService.getOffset(this.totalItems, NUMBER_ITEMS_PAGE);
          return this.crudService.getItems(GROUPS_URL, this.paginationParams.offset, this.paginationParams.limit)
            .pipe(takeUntil(this.destroy$));
        }),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: `Couldn't get the groups!`});

          return throwError(error);
        })
      )
      .subscribe((groups) => {
        this.groups = groups;
        this.groups.reverse();
      });
  }

  openAddModal() {
    this.modalRef = this.modalService.show(AddGroupModalComponent);
  }

  pageChanged(event: any) {
    this.currentPage = event.page;

    this.paginationParams = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage);

    this.crudService.getItems(GROUPS_URL, this.paginationParams.offset, this.paginationParams.limit)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: `Couldn't get the groups!`});
          return throwError(error);
        }))
      .subscribe((groups) => {
        this.groups = groups;
        this.groups.reverse();
      });

    this.router.navigate([`${GROUPS_URL}`], {queryParams: {page: event.page}});
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
