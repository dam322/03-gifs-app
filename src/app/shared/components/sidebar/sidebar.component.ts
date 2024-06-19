import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {

  constructor(private gifsService: GifsService) { }

  get tags(): string[] {
    // console.log(this.gifsService.tagsHistory);
    return [...this.gifsService.tagsHistory];
  }
}
