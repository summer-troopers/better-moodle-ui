import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '@modules/students/students.service';
import { Student } from '../../../../shared/models/student';
import { Subscription } from '../../../../../../node_modules/rxjs';

@Component({
  selector: 'app-student-details-page',
  templateUrl: './student-details-page.component.html',
  styleUrls: ['./student-details-page.component.scss']
})
export class StudentDetailsPageComponent implements OnInit, OnDestroy {
  id: number;
  student: Student;
  groupName: string;
  private subscription: Subscription;

  constructor(private route: ActivatedRoute, private studentsService: StudentsService) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.studentsService.getStudent(this.id).subscribe((element) => {
        this.student = element;
        this.studentsService.getStudentsGroup(this.student.idGroup).subscribe((groupName) => {
          this.groupName = groupName;
        });
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteStudent(id: number) {
    this.studentsService.deleteStudent(id)
      .subscribe((result) => console.log(result));
  }

}
