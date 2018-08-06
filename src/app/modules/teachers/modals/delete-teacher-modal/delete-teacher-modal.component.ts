import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TeachersService } from '@modules/teachers/teachers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-teacher-modal',
  templateUrl: './delete-teacher-modal.component.html',
  styleUrls: ['./delete-teacher-modal.component.scss']
})
export class DeleteTeacherModalComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  message: String;

  constructor(public bsModalRef: BsModalRef,
    private teachersService: TeachersService,
    private router: Router) { }

  ngOnInit() {

  }

  confirm(): void {

    this.teachersService.deleteTeacher(this.teachersService.id).pipe(takeUntil(this.destroy$)).subscribe(
      suc => {
        this.message = "Successfully deleted";
        setTimeout(() => {
          this.bsModalRef.hide();
          this.router.navigate(['teachers']);
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
