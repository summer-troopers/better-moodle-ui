import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-teacher-details-page',
  templateUrl: './teacher-details-page.component.html',
  styleUrls: ['./teacher-details-page.component.scss']
})
export class TeacherDetailsPageComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      console.log(params);
    });
  }

}
