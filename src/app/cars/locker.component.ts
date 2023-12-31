import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

declare var $: any; // Declare jQuery to avoid TypeScript errors

@Component({
  selector: 'app-locker',
  templateUrl: './locker.component.html',
  styleUrls: ['./locker.component.scss']
})
export class LockerComponent implements OnInit {

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {

    $(document).ready(() => {
      $(window).on("load", () => {
        setTimeout(() => {
          this.renderer.setStyle(this.el.nativeElement.querySelector('#loaderWrap'), 'display', 'none');
          this.renderer.setStyle(this.el.nativeElement.querySelector('#pageContent'), 'display', 'block');
        }, 3000);
      });
    });
  }
}
