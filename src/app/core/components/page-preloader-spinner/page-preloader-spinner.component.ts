import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app--spinner',
  templateUrl: './page-preloader-spinner.component.html',
  styleUrls: ['./page-preloader-spinner.component.scss']
})
export class PagePreloaderSpinnerComponent implements OnInit {

  constructor(private spinner: NgxSpinnerService) { }

  ngOnInit() {

  }

  showSpinner() {
    this.spinner.show();
  }

  hideSpinner() {
    setTimeout(() => {
      this.spinner.hide();
    }, 2000);
  }
}
