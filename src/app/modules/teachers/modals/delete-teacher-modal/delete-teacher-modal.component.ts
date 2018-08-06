import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { TeachersService } from '@modules/teachers/teachers.service';
import { Router } from '../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-delete-teacher-modal',
  templateUrl: './delete-teacher-modal.component.html',
  styleUrls: ['./delete-teacher-modal.component.scss']
})
export class DeleteTeacherModalComponent implements OnInit {
  modalRef: BsModalRef;
  submitted = false;

  constructor(public bsModalRef: BsModalRef,
    private teachersService: TeachersService,
    private router: Router) { }

  ngOnInit() {

  }

  confirm(): void {
    this.teachersService.deleteTeacher(this.teachersService.id).subscribe();
    this.bsModalRef.hide();
    this.router.navigate(['teachers']);
  }

  decline(): void {
    this.bsModalRef.hide();
  }
}
