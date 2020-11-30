import { Course } from './../model/course';
import { map, tap } from 'rxjs/operators';
import { interval, timer, Observable, noop, of, concat, pipe, merge } from 'rxjs';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { createHttpObservable } from '../common/util';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // // An observable is a blueprint for a stream
    // const interval$ = timer(3000, 1000);
    // // const interval$ = interval(1000);
    // const sub = interval$.subscribe(val => console.log(`Stream 1 ${val}`));
    // // interval$.subscribe(val => console.log(`Stream 2 ${val}`));
    // setTimeout(() => sub.unsubscribe(), 5000);

    // const click$ = fromEvent(document, 'click');
    // click$.subscribe(
    //   evt => console.log(evt),
    //   err => console.error(err),
    //   () => console.log('Stream completed')
    // );
    // const http$ = createHttpObservable('/api/courses');
    // const courses$: Observable<Course[]> = http$
    //   .pipe(
    //     map(res => Object.values(res['payload']))
    //   );
    // courses$.subscribe(
    //   courses => console.log(courses),
    //   noop,
    //   () => console.log('complete')
    // );
    // const source1$ = of(1, 2, 3);
    // const source2$ = of(4, 5, 6);
    // const source3$ = of(7, 8, 9);
    // const result$ = concat(source1$, source2$, source3$);
    // result$.subscribe(console.log);
    // const interval1$ = interval(1000);
    // const interval2$ = interval1$.pipe(map(val => 10 * val));
    // const result$ = merge(interval1$, interval2$);
    // result$.subscribe(console.log);
    // const interval1$ = interval(1000);
    // const sub = interval1$.subscribe(console.log);
    // setTimeout(() => sub.unsubscribe(), 5000);
    // const http$ = createHttpObservable('/api/courses');
    // const sub = http$.subscribe(console.log);
    // setTimeout(() => sub.unsubscribe(), 0);
  }
}
