import { Injectable } from '@angular/core';
import { Icons, Paths } from '../enums';
import { NavbarItem } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  public navbarItems: Array<NavbarItem>;
  constructor() {
    this.navbarItems = [
      {
        title: 'Create task',
        icon: Icons.icon_note_favorite,
        link: Paths.create_task,
      },
      {
        title: 'List tasks',
        icon: Icons.icon_note_two,
        link: Paths.list_tasks,
      },
    ];
  }
}
