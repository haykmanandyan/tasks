import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subscription, switchMap, takeUntil, tap} from "rxjs";

@Component({
  selector: 'app-move',
  templateUrl: './move.component.html',
  styleUrls: ['./move.component.scss']
})
export class MoveComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  @ViewChild('roundBoxRef', {static: true})
  public roundBoxRef: ElementRef<HTMLDivElement>;

  public roundBoxPressState = false;
  public top = '0px';
  public left = '0px';

  constructor() {
  }

  public ngOnInit(): void {
    const mouseDown$ = fromEvent(this.roundBoxRef.nativeElement, 'mousedown')
      .pipe(
        tap(() => console.log('down')),
        tap(() => this.roundBoxPressState = true)
      );

    const mouseUp$ = fromEvent(this.roundBoxRef.nativeElement, 'mouseup')
      .pipe(
        tap(() => console.log('up')),
        tap(() => this.roundBoxPressState = false)
      );

    const move$ = fromEvent(document, 'mousemove')
      .pipe(
        takeUntil(mouseUp$)
      );

    this.subscription = mouseDown$
      .pipe(
        switchMap(() => move$),
      )
      .subscribe((ev: MouseEvent) => {
        // console.log(this.left, this.top);
        // this.left = +(this.left.slice(0, this.left.length - 2)) + ev.movementX + 'px';
        // this.top = +(this.top.slice(0, this.top.length - 2)) + ev.movementY + 'px';
        // console.log(this.left, this.top);
        //   this.left = ev.clientX + 'px'
        const rect = (ev.target as HTMLDivElement).getBoundingClientRect();
        this.top = ev.clientY - rect.height/2 + 'px';
        this.left = ev.clientX - rect.width/2 + 'px';
        console.log(this.roundBoxRef);
        console.log('move', ev);
      });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
