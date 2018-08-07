import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


import { Specialty } from '@shared/models/specialty';
import { GroupsService } from '@modules/groups/groups.service';
import { SpecialtiesService } from '@modules/specialties/specialties.service';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.scss']
})
export class AddGroupModalComponent implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();

  modalRef: BsModalRef;
  groupForm: FormGroup;
  isSubmitted = false;
  specialties: Array<Specialty> = [];

  constructor(private modalService: BsModalService,
              private fromBuilder: FormBuilder,
              private groupsService: GroupsService,
              private specialtiesService: SpecialtiesService) {}

  ngOnInit() {
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

    const specialtyName: string = this.groupForm.value.idSpecialty;
    const {id} = this.specialties.find((specialty) => specialty.name === specialtyName);
    const newGroup = {
      name: this.groupForm.value.name,
      idSpecialty: id
    };
    this.groupsService.addGroup(newGroup).pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.modalRef.hide();
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
