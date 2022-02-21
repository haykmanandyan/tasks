import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, map, Observable, Observer, Subject, takeUntil} from "rxjs";
import {ApiUserInterface, CustomUserInterface} from "../interfaces"
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-combine-user',
  templateUrl: './combine-user.component.html',
  styleUrls: ['./combine-user.component.scss']
})
export class CombineUserComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient
  ) {
  }

  public ngOnInit(): void {
    this.getCombineUsers();
  }

  private getObsUsers(): Observable<CustomUserInterface> {
    let value = 1;
    let user: CustomUserInterface = {
      email: 'email@email.com',
      name: 'name'
    };
    return Observable.create((observer: Observer<CustomUserInterface>) => {
      setInterval(() => {
        user.id = value;
        observer.next(user);
        value++;
      }, 5000);
    });
  }

  private getApiUsers(): Observable<ApiUserInterface[]> {
    return this.http
      .get<ApiUserInterface[]>('https://jsonplaceholder.typicode.com/users');
  }

  private getCombineUsers(): void {
    const combineData = combineLatest([this.getObsUsers(), this.getApiUsers()]);
    let clone: any;
    combineData
      .pipe(
        takeUntil(this.destroy$),
        map(([myUser, apiUser]) => {
          clone = apiUser.map(x => x);
          clone.push(myUser)
          return clone;
        })
      )
      .subscribe(
        (data) => console.log(data)
      )
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
