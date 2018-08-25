import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, throwError } from 'rxjs';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { catchError, mergeMap, takeUntil } from 'rxjs/operators';

import { Group } from '@shared/models/group';
import { CrudService } from '@shared/services/crud/crud.service';
import { GROUPS_URL, NUMBER_ITEMS_PAGE, MODAL_OPTIONS } from '@shared/constants';
import { PaginationParams } from '@shared/models/pagination-params';
import { PaginatorHelperService } from '@shared/services/paginator-helper/paginator-helper.service';
import { Alert, AlertType } from '@shared/models/alert';
import { GlobalModalComponent } from '@shared/components/global-modal/global-modal.component';

@Component({
  selector: 'app-groups-page',
  templateUrl: './groups-page.component.html'
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
          this.alerts.push({ type: AlertType.Error, message: `Couldn't get the groups!` });

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
    MODAL_OPTIONS['initialState'] = {
      onAdd: true,
      itemType: 'group',
      title: 'Add New Group',
      buttonTitle: 'Add Group'
    };
    this.modalRef = this.modalService.show(GlobalModalComponent, MODAL_OPTIONS);
    this.modalRef.content.itemAdded
      .pipe(takeUntil(this.destroy$))
      .subscribe((group) => {
        this.groups.unshift(group);
      });
  }

  pageChanged(event: any) {
    this.currentPage = event.page;
    this.router.navigate([GROUPS_URL], { queryParams: { page: event.page } });
  }

  setGroups(groups) {
    this.groups = groups.reverse();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
