import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-students-page',
  templateUrl: './students-page.component.html',
  styleUrls: ['./students-page.component.scss']
})
export class StudentsPageComponent implements OnInit {
  students: Array<any> = [
    {
      id: 1,
      firstName: "Steve",
      lastName: "Rogers",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Doe",
    },
    {
      id: 3,
      firstName: "Jane",
      lastName: "Doe",
    },
    {
      id: 4,
      firstName: "Mary",
      lastName: "Smith",
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
