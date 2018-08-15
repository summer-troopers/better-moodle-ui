import {Component, Input, OnInit} from '@angular/core';
import {Student} from '@shared/models/student';
import {STUDENTS_URL} from '@shared/constants';
import {CrudService} from '@shared/services/crud/crud.service';

import {Observable, Subject, throwError} from 'rxjs';
import {takeUntil, catchError} from 'rxjs/operators';
import {Alert, AlertType} from '@shared/models/alert';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.scss']
})
export class MyStudentsComponent implements OnInit {
  id: string;
  students: Student;
  @Input() user;

  destroy$: Subject<boolean> = new Subject<boolean>();

  alerts: Alert[] = [];
  students: Array<Student> = [];

  constructor(private crudService: CrudService,
              private modalService: BsModalService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.getAllStudents();
  }

  getAllStudents(): Observable<Array<Student>> {
    const userId = this.user.id;
    const a = this.crudService.getItemsofTeacher(STUDENTS_URL, userId);
    console.log(a);

    const r = this.crudService.getItemsofTeacher(STUDENTS_URL, userId)
      .subscribe((students) => {
        return this.students;
      });
    console.log(r);
    return r;
  }

}
