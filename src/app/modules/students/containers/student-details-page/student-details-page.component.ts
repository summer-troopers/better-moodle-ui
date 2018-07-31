import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentsService } from '@modules/students/students.service';

@Component({
  selector: 'app-student-details-page',
  templateUrl: './student-details-page.component.html',
  styleUrls: ['./student-details-page.component.scss']
})
export class StudentDetailsPageComponent implements OnInit, OnDestroy {
  id: number;
  student: any;
  private subscription: any;


  constructor(private route: ActivatedRoute, private studentsService: StudentsService) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.id = +params['id'];
      this.studentsService.getStudent(this.id).subscribe((element) => {
        this.student = element;
      })
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
