import { Component, OnInit, Input } from '@angular/core';
import { Subject } from "rxjs";

@Component({
  selector: 'app-default-modal',
  templateUrl: './default-modal.component.html',
  styleUrls: ['./default-modal.component.scss']
})
export class DefaultModalComponent implements OnInit {

  @Input() public showObservable: Subject<boolean>;
  @Input() public title: string;

  constructor() { }

  ngOnInit() {
  }

  public onClose() {
    this.showObservable.next(false);
  }

}
