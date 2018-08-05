import { Directive, HostBinding, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appPagePreloader]'
})
export class PagePreloaderDirective implements OnInit {

  @Input('appPagePreloader') source: string;
  @HostBinding('attr.src') srcImage: any;

  private placeholder = 'http://www.esicsronoida.org.in/loading.gif';
  private imageToPreload: any;

  constructor() {
  }

  ngOnInit() {

    this.setImage(this.placeholder);

    this.imageToPreload = new Image();
    this.imageToPreload.onload = () => {
      this.setImage(this.source);
    };

    if (this.source) {
      this.imageToPreload.src = this.source;
    }

  }

  setImage(image: string) {
    if (!image) {
      return;
    }

    this.srcImage = image;
  }
}
