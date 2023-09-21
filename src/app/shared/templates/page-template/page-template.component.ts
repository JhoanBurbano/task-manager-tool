import { Component, Input, OnInit } from '@angular/core';
@Component({
  selector: 'jb-page-template',
  templateUrl: './page-template.component.html',
  styleUrls: [ './page-template.component.scss' ],
})
export class PageTemplateComponent implements OnInit{
  @Input() title!: string;
  @Input() leftSize!: string;
  public isClose: boolean;

  constructor() {
    this.isClose = false;
  }

  ngOnInit(): void {
    this.isClose = this.title?.toLowerCase() == 'list';
  }

  public toggleClose(): void {
    this.isClose = !this.isClose;
  }
}
