import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  @ViewChild('tagButton')
  public buttonTag!: ElementRef<HTMLButtonElement>;
  constructor(private gifsService: GifsService) { }

  get tags(): string[] {
    // console.log(this.gifsService.tagsHistory);
    return [...this.gifsService.tagsHistory];
  }

  searchSideBar(tag: string): void {
    this.gifsService.searchTag(tag);
  }
}
