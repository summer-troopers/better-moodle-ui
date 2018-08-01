import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeachersService } from '@modules/teachers/teachers.service';

import Teacher from '../../../../shared/models/teacher';

@Component({
  selector: 'app-teacher-details-page',
  templateUrl: './teacher-details-page.component.html',
  styleUrls: ['./teacher-details-page.component.scss']
})
export class TeacherDetailsPageComponent implements OnInit, OnDestroy {
  private subscription: any;
  id: number;
  teacher: Teacher = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
  };

  constructor(private route: ActivatedRoute,
    private teachersService: TeachersService) { }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.teachersService.getTeacher(this.id).subscribe((data) => {
        this.teacher = data;
      })
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(id) {
    this.teachersService.deleteTeacher(id);
  }

}
