import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-page-preloader-spinner',
  templateUrl: './page-preloader-spinner.component.html',
  styleUrls: ['./page-preloader-spinner.component.scss']
})
export class PagePreloaderSpinnerComponent implements OnInit {

  @Output('savePreloader') savePreloader: EventEmitter<any> = new EventEmitter();

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.savePreloader.emit(this.spinner);
  }
}
