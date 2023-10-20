import { Component, OnInit,ViewChild, ElementRef,Renderer2 } from '@angular/core';


@Component({
  selector: 'app-restablecer',
  templateUrl: './restablecer.page.html',
  styleUrls: ['./restablecer.page.scss'],
})
export class RestablecerPage implements OnInit {

  @ViewChild('btn') btn :ElementRef;

  constructor(private renderer : Renderer2) { }

    applyBounce() {
      this.renderer.addClass(this.btn.nativeElement, 'bounce');
      setTimeout(() => {
        this.renderer.removeClass(this.btn.nativeElement, 'bounce');
      }, 200);}

  ngOnInit() {
  }

}
