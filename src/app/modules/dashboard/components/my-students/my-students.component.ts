import { Component, Input, OnInit } from '@angular/core';
import { Student } from '@shared/models/student';
import { STUDENTS_URL } from '@shared/constants';
import { CrudService } from '@shared/services/crud/crud.service';

@Component({
  selector: 'app-my-students',
  templateUrl: './my-students.component.html',
  styleUrls: ['./my-students.component.scss']
})
export class MyStudentsComponent implements OnInit {
  id: string;
  students: Student;
  @Input() user;

  constructor(private crudService: CrudService) { }

  ngOnInit() {
    const teacherId = this.user.id;
    this.crudService.getItemsofTeacher(STUDENTS_URL, teacherId);
  }
}
