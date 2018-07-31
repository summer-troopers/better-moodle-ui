import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentsService } from '@modules/students/students.service';
import { Student } from '../../../../shared/models/student';
import { Subscription } from '../../../../../../node_modules/rxjs';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  students: Array<Student> = [];
  private subscription: Subscription;

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.subscription = this.studentsService.getStudents()
      .subscribe(students => this.students = students);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
