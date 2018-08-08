import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  message: String;

  service: any;
  id: string;
  pageUrl: string;

  constructor(public bsModalRef: BsModalRef,
    private router: Router) { }

  ngOnInit() {
  }

  confirm(): void {
    this.service.deleteItem(this.id, this.pageUrl).pipe(takeUntil(this.destroy$)).subscribe(
      suc => {
        this.message = "Successfully deleted";
        setTimeout(() => {
          this.bsModalRef.hide();
          this.router.navigate([`${this.pageUrl}`]);
        }, 1500);
      },
      err => {
        this.message = "Error on delete !!!";
      }
    );

  }

  decline(): void {
    this.bsModalRef.hide();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
