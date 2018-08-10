import { Component, OnDestroy, OnInit } from '@angular/core';
import Course from '@shared/models/course';
import { CoursesService } from '@modules/courses/courses.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EditCourseModalComponent } from '@modules/courses/components';
import { DeleteCourseModalComponent } from '@modules/courses/components/delete-course-modal/delete-course-modal.component';

@Component({
  selector: 'app-course-details-page',
  templateUrl: './course-details-page.component.html',
  styleUrls: ['./course-details-page.component.scss']
})
export class CourseDetailsPageComponent implements OnInit, OnDestroy {

  course: Course = {id: '', name: ''};
  destroy$: Subject<boolean> = new Subject<boolean>();

  modalRef: BsModalRef;

  constructor(
    private coursesService: CoursesService,
    private modalService: BsModalService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.course.id = params.get('id');
      this.coursesService.getCourse(this.course.id).pipe(takeUntil(this.destroy$)).subscribe((course: Course) => {
        this.course = course;
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  openEditModal() {
    const initialState: any = {
      course: this.course
    };
    this.modalRef = this.modalService.show(EditCourseModalComponent, {initialState});

    this.modalRef.content.event.pipe(takeUntil(this.destroy$))
      .subscribe((course) => this.course = course, error => {
        return Observable.throw(error);
      });
  }

  openDeleteModal() {
    const initialState: any = {
      course: this.course
    };
    this.modalRef = this.modalService.show(DeleteCourseModalComponent, {initialState});

    this.modalRef.content.event.pipe(takeUntil(this.destroy$))
      .subscribe((course) => this.course = course, error => {
        return Observable.throw(error);
      });
  }
}
