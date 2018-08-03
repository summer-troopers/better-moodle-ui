import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { Specialty } from '@shared/models/specialty';
import { GroupsService } from '@modules/groups/groups.service';
import { SpecialtiesService } from '@modules/specialties/specialties.service';
import { Group } from '@shared/models/group';
import { GroupDetailsPageComponent } from '@modules/groups/containers';

@Component({
  selector: 'app-edit-group-modal',
  templateUrl: './edit-group-modal.component.html',
  styleUrls: ['./edit-group-modal.component.scss']
})
export class EditGroupModalComponent implements OnInit, OnDestroy {

  @Input('group')
  group: Group;

  @Input('specialty')
  specialty: Specialty;

  @Input('parent')
  parent: GroupDetailsPageComponent;

  id: string;
  modalRef: BsModalRef;
  groupForm: FormGroup;
  submitted = false;
  subscriptions: Array<Subscription> = [];
  specialties: Array<Specialty> = [];

  constructor(private route: ActivatedRoute, private modalService: BsModalService, private fromBuilder: FormBuilder, private groupsService: GroupsService, private specialtiesService: SpecialtiesService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    this.groupForm = this.fromBuilder.group({
      name: ['', [Validators.required]],
      specialty: ['', [Validators.required]]
    });
    this.subscriptions.push(this.specialtiesService.getSpecialties().subscribe(specialties => this.specialties = specialties));
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
    const {id} = this.specialties.find((specialty) => specialty.name === specialtyName);
    const newGroup = {
      name: this.groupForm.value.name,
      idSpecialty: id
    };
    this.subscriptions.push(this.groupsService.updateGroup(this.id, newGroup).subscribe(() => {
      this.modalRef.hide();
      this.parent.group = newGroup;
      this.parent.specialty = {id, name: specialtyName};
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
