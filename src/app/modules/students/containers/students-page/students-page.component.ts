import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentsService } from '@modules/students/students.service';
import { Student } from '../../../../shared/models/student';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit, OnDestroy {
  offset: number = 0;
  limit: number = 10;
  totalItems: number;
  page: number = 1;
  pageParam: number;

  students: Array<Student> = [];
  private subscription: Subscription;

  constructor(private api: StudentsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe((params) => {
      this.pageParam = +params.page;
      if (this.pageParam != null || this.pageParam != NaN) {
        if (this.pageParam > 0) {
          this.pageChanged(this.pageParam);
        } else {
          this.pageChanged(1)
        }
      } else {
        this.pageChanged(1)
      }
    });
    this.subscription = this.api.getStudents(this.offset, this.limit)
      .subscribe(students => this.students = students);
    this.subscription = this.api.getNumberOfStudents()
      .subscribe(students => this.totalItems = students);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  pageChanged(selectedPage) {
    this.page = selectedPage;
    this.offset = this.limit * (selectedPage - 1);
    this.subscription = this.api.getStudents(this.offset, this.limit)
      .subscribe(students => this.students = students);
    this.router.navigate(['students'], { queryParams: { page: selectedPage } });
  }
}
