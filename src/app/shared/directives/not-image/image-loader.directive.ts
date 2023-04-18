import {
  Directive,
  Attribute,
  Renderer2,
  ElementRef,
  HostListener
} from '@angular/core';

@Directive({
  selector: '[appImageLoader]',
  standalone: true,
})
export class UiImageLoaderDirective {
  private onErrorSrc = 'assets/images/no-image.png';
  private loader = 'assets/images/tail-spin.svg';
  constructor(
    private renderer: Renderer2,
    private el: ElementRef) {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.loader);
  }

  @HostListener('load') onLoad() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.el.nativeElement.src);
  }
  @HostListener('error') onError() {
    this.renderer.setAttribute(this.el.nativeElement, 'src', this.onErrorSrc);
  }
}
