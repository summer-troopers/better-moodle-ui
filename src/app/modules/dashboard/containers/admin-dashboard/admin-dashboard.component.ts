import { Component, Input, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { EditAdminModalComponent } from '../../modals/edit-admin-modal/edit-admin-modal.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  @Input() user;

  modal: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  openEditModal() {
    const initialState = {
      user: this.user
    };

    this.modal = this.modalService.show(EditAdminModalComponent, { initialState });
  }
}
