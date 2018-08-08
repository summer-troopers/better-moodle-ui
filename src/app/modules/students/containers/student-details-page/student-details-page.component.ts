import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { StudentsService } from '@modules/students/students.service';
import { Student } from '@shared/models/student';


@Component({
  selector: 'app-student-details-page',
  templateUrl: './student-details-page.component.html',
  styleUrls: ['./student-details-page.component.scss']
})
export class StudentDetailsPageComponent implements OnInit, OnDestroy {
  id: number;
  student: Student;
  groupName: string;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Array<any> = [];

  constructor(private route: ActivatedRoute,
    private studentsService: StudentsService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.studentsService.getStudent(this.id)
        .pipe(mergeMap((student: Student) => {
          this.student = student;
          return this.studentsService.getStudentsGroup(student.idGroup)
            .pipe(takeUntil(this.destroy$));
        }))
        .catch(error => {
          this.alerts.push({ type: "danger", msg: error.message });
          return Observable.throw(error.message);
        })
        .subscribe((groupName) => this.groupName = groupName);
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
