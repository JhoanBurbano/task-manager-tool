import { Component } from '@angular/core';
import { RedirectsService } from './services/redirects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ],
})
export class AppComponent {
  title = 'tasks';
  constructor(public readonly redirectsService: RedirectsService) {}
}
