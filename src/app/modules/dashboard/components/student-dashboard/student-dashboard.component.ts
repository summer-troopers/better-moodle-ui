import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from '../../../../../../node_modules/rxjs';
import {UserService} from '@shared/services/user.service';
import Student from '@shared/models/students';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  public student: Student;

  Person = {
    id: 1,
    firstName: 'Jora',
    lastName: 'Buba',
    email: 'lalala@gmail.com',
    phoneNumber: '069383481',
    idGroup: 3,
  };


  constructor(private studentsService: UserService) {
  }

  ngOnInit() {
    localStorage.setItem('user', JSON.stringify(this.Person));
    this.student =  this.studentsService.getUserLocalStorage('user');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
