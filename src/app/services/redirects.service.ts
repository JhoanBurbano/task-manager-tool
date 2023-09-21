import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Paths } from '../enums';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RedirectsService {

  private loadingBehaviorSubject: BehaviorSubject<boolean>;
  public loading$: Observable<boolean>;

  constructor(private readonly router: Router) {
    this.loadingBehaviorSubject = new BehaviorSubject<boolean>(false);
    this.loading$ = this.loadingBehaviorSubject.asObservable();
  }

  public setLoading(loading: boolean): void {
    let timeout = 0
    if(!loading){
      timeout = 100
    }
    setTimeout(() => {
      this.loadingBehaviorSubject.next(loading);
    }, timeout);
  }



  public redirectTo(page: Paths): void {
    this.router.navigate([ page ]);
  }
}
