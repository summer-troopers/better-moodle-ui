import { Component, OnInit } from '@angular/core';
import { StudentsService } from '@modules/students/students.service';
import Student from '../../../../shared/models/student';
@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit {
  students: Array<Student> = [];

  constructor(private studentsService: StudentsService) { }

  ngOnInit() {
    this.studentsService.getStudents()
      .subscribe(students => this.students = students);
  }

}
