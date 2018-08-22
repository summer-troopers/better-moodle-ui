import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { catchError, mergeMap, takeUntil } from 'rxjs/operators';

import Group from '@shared/models/group';
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
  currentPage: number;
  totalItems: number;

  constructor(private crudService: CrudService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private router: Router,
              private paginatorHelperService: PaginatorHelperService) {
  }

  ngOnInit() {
    this.initPage();
  }

  initPage() {
    this.route.queryParams.subscribe((params) => {
      this.currentPage = this.paginatorHelperService.getCurrentPage(params.page);
      this.initNumberOfGroups();
    });
  }

  getGroups(): Observable<Array<Group>> {
    return this.crudService.getItems(GROUPS_URL, this.paginationParams.offset, this.paginationParams.limit)
      .pipe(takeUntil(this.destroy$),
        catchError((error) => {
          this.alerts.push({type: AlertType.Error, message: `Couldn't get the groups!`});

          return throwError(error);
        }));
  }

  initNumberOfGroups() {
    this.crudService.getNumberOfItems(GROUPS_URL)
      .pipe(
        takeUntil(this.destroy$),
        mergeMap((groupsNumber: number) => {
          this.totalItems = groupsNumber;
          this.paginationParams = this.paginatorHelperService.getPaginationParams(this.totalItems, this.currentPage);

          return this.getGroups();
        }))
      .subscribe((groups) => {
        this.setGroups(groups);
      });
  }

  openAddModal() {
    this.modalRef = this.modalService.show(AddGroupModalComponent);
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.router.navigate([GROUPS_URL], {queryParams: {page: event.page}});
  }

  setGroups(groups) {
    this.groups = groups.reverse();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
