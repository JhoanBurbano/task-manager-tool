import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from '../enums';

@Injectable({
  providedIn: 'root',
})
export class RedirectsService {
  constructor(private readonly router: Router) {}

  public redirectTo(page: Paths): void {
    this.router.navigate([page]);
  }
}
