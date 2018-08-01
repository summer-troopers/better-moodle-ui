import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Specialty } from '../../../../shared/models/specialty';
import { GroupsService } from '../../groups.service';
import { SpecialtiesService } from '../../../specialties/specialties.service';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.scss']
})
export class AddGroupModalComponent implements OnInit , OnDestroy {

  modalRef: BsModalRef;
  groupForm: FormGroup;
  submitted = false;
  subscriptions: Array<Subscription> = [];
  specialties: Array<Specialty> = [];

  constructor(private modalService: BsModalService, private fromBuilder: FormBuilder, private groupsService: GroupsService, private specialtiesService: SpecialtiesService) {
  }

  ngOnInit() {
    this.groupForm = this.fromBuilder.group({
      name: ['', [Validators.required]],
      specialty: ['', [Validators.required]]
    });
    this.subscriptions.push(this.specialtiesService.getSpecialties().subscribe(specialties => this.specialties = specialties ));
  }

  get fields() {
    return this.groupForm.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  onSubmit() {
    this.submitted = true;
    const specialtyName: string = this.groupForm.value.specialty;
    const { id } = this.specialties.find((specialty) => specialty.name === specialtyName );
    const newGroup = {
      name: this.groupForm.value.name,
      idSpecialty: id
    };
   this.subscriptions.push(this.groupsService.addGroup(newGroup).subscribe(() => {
      this.modalRef.hide();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach( (sub: Subscription) => sub.unsubscribe());
  }
}
