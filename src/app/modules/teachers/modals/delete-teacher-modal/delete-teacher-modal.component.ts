import { Component, OnInit, OnDestroy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { TeachersService } from '@modules/teachers/teachers.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-delete-teacher-modal',
  templateUrl: './delete-teacher-modal.component.html',
  styleUrls: ['./delete-teacher-modal.component.scss']
})
export class DeleteTeacherModalComponent implements OnInit, OnDestroy {

  message: String;
  submitted = false;

  private subscription: Subscription;

  constructor(public bsModalRef: BsModalRef,
    private teachersService: TeachersService,
    private router: Router) { }

  ngOnInit() {

  }

  confirm(): void {

    this.subscription = this.teachersService.deleteTeacher(this.teachersService.id).subscribe(
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
    this.subscription.unsubscribe();
  }
}
