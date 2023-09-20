import { Component, Input } from '@angular/core';
@Component({
  selector: 'jb-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: ['./page-template.component.scss'],
})
export class PageTemplateComponent {
  @Input() title!: string;
  @Input() leftSize!: string;
  public isClose: boolean = false;

  public toggleClose(): void {
    this.isClose = !this.isClose;
  }
}
