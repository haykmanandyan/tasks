import {Component, OnDestroy, OnInit} from '@angular/core';
import {distinctUntilChanged, filter, Observable, Observer, skip, Subject, takeUntil, takeWhile} from "rxjs";

@Component({
  selector: 'app-random-number',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.scss']
})
export class RandomNumberComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor() {
  }

  public ngOnInit(): void {
    this.getRandomNumbers();
  }

  private getRandomNumbers(): void {
    const randomNumbers = Observable.create((observer: Observer<Number>) => {
      setInterval(
        () => {
          observer.next(Math.round(Math.random() * 40));
        }, 1000);
    });
    randomNumbers
      .pipe(
        skip(2),
        filter((randomNumber: number) => randomNumber % 2 !== 0),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        takeWhile((randomNumber: number) => randomNumber < 30),
      )
      .subscribe(
        (randomNumber: number) => {
          console.log(randomNumber);
        }
      )
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
