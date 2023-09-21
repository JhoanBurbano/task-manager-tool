import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'jb-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: [ './navbar.component.scss' ],
  imports: [ CommonModule, RouterModule, SharedModule ],
  providers: [ NavbarService ],
})
export class NavbarComponent {
  constructor(public navbarService: NavbarService) {}
}
