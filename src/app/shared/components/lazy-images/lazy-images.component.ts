import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-images',
  templateUrl: './lazy-images.component.html',
})
export class LazyImagesComponent implements OnInit {
  ngOnInit(): void {
    if (!this.src) throw new Error('LazyImagesComponent: src is required');
  }

  @Input()
  public src!: string;

  @Input()
  public alt!: string;

  public hasLoaded: boolean = false;

  onLoaded(): void {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 1000);

  }
}
