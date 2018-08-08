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
  itemName: String;
  service: any;
  id: string;
  test: any;

  constructor(public bsModalRef: BsModalRef,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  confirm(): void {
    console.log(this.service)
    // this.service.deleteItem(this.id).pipe(takeUntil(this.destroy$)).subscribe(
    //   suc => {
    //     this.message = "Successfully deleted";
    //     setTimeout(() => {
    //       this.bsModalRef.hide();
    //       this.router.navigate([`${this.service.pageUrl}`]);
    //     }, 1500);
    //   },
    //   err => {
    //     this.message = "Error on delete !!!";
    //   }
    // );

  }

  decline(): void {
    this.bsModalRef.hide();
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
