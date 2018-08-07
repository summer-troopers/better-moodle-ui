import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Specialty } from '@shared/models/specialty';
import { GroupsService } from '@modules/groups/groups.service';
import { SpecialtiesService } from '@modules/specialties/specialties.service';
import { Group } from '@shared/models/group';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: './edit-group-modal.component.html',
  styleUrls: ['./edit-group-modal.component.scss']
})
export class EditGroupModalComponent implements OnInit, OnDestroy {

  @Input()
  group: Group;

  @Input()
  specialty: Specialty;

  @Output()
  updateGroup = new EventEmitter();

  destroy$: Subject<boolean> = new Subject<boolean>();

  id: string;
  modalRef: BsModalRef;
  groupForm: FormGroup;
  isSubmitted = false;
  specialties: Array<Specialty> = [];

  constructor(private route: ActivatedRoute,
              private modalService: BsModalService,
              private fromBuilder: FormBuilder,
              private groupsService: GroupsService,
              private specialtiesService: SpecialtiesService) {}

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.id = params.id;
    });
    this.initForm();
    this.specialtiesService.getSpecialties().pipe(takeUntil(this.destroy$)).subscribe(specialties => this.specialties = specialties);
  }

  initForm() {
    this.groupForm = this.fromBuilder.group({
      name: ['', Validators.required],
      specialty: ['', Validators.required]
    });
  }

  get fields() {
    return this.groupForm.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.groupForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const specialtyName: string = this.groupForm.value.specialty;
    const specialty = this.specialties.find((spec) => spec.name === specialtyName);
    const newGroup = {
      name: this.groupForm.value.name,
      idSpecialty: specialty.id
    };
  this.groupsService.updateGroup(this.id, newGroup).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.modalRef.hide();
      this.updateGroup.emit({
        groupName: this.groupForm.get('name').value,
        specialty
      });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
