import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerService } from '../../services/spinner/spinner.service'

@Component({
  selector: 'app--spinner',
  templateUrl: './page-preloader-spinner.component.html',
  styleUrls: ['./page-preloader-spinner.component.scss']
})
export class PagePreloaderSpinnerComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService,
    //public handleSpinner: SpinnerService
  ) { }

  ngOnInit() {
    //this.handleSpinner.handleEvents();
    this.spinner.show();
    this.hideSpinner();
  }
  hideSpinner() {
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
