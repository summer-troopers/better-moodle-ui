import { Component, OnInit, OnDestroy } from '@angular/core';
import { TeachersService } from '../../teachers.service';
import Teacher from '../../../../shared/models/teacher';

@Component({
  selector: 'app-teachers-page',
  templateUrl: './teachers-page.component.html',
  styleUrls: ['./teachers-page.component.scss']
})
export class TeachersPageComponent implements OnInit, OnDestroy {

  private subscription: any;
  teachers: Array<Teacher> = [];

  constructor(private teacherService: TeachersService) { }

  ngOnInit() {
    this.subscription = this.teacherService.getTeachers()
      .subscribe(data => this.teachers = data);

    this.getAllTeachers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getAllTeachers() {
    this.teacherService.getTeachers();

  }
}
