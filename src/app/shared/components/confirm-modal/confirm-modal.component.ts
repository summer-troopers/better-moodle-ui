import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TeachersService } from '../../../modules/teachers/teachers.service'

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();

  message: String;

  id: string;
  pageUrl: string;

  constructor(public bsModalRef: BsModalRef,
    private router: Router,
    private teachersService: TeachersService) { }

  ngOnInit() {
  }

  confirm(): void {
    this.teachersService.deleteTeacher(this.teachersService.id).pipe(takeUntil(this.destroy$)).subscribe(
      suc => {
        this.message = 'Successfully deleted';
        setTimeout(() => {
          this.bsModalRef.hide();
          this.router.navigate([`teachers`]);
        }, 1500);
      },
      err => {
        this.message = 'Error on delete !!!';
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
