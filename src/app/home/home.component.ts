import { Component, OnInit } from '@angular/core';
import { Course } from "../model/course";
import { interval, Observable, of, timer, noop, throwError } from 'rxjs';
import { catchError, delayWhen, finalize, map, retryWhen, shareReplay, tap } from 'rxjs/operators';
import { createHttpObservable } from '../common/util';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    begginnerCourses$: Observable<Course[]>;
    advancedCourses$: Observable<Course[]>;

    constructor() {

    }

    ngOnInit() {

        const http$ = createHttpObservable('/api/courses');
        const courses$: Observable<Course[]> = http$
            .pipe(
                // catchError(err => {{
                //     console.log(`Error occurred: ${err}`);
                //     return throwError(err);
                // }}),
                // finalize(() => {
                //     console.log('Method finalization ocurred.')
                // }),
                tap(() => console.log('HTTP Request sent!')),
                map(res => Object.values(res['payload'])),
                shareReplay<any>(),
                retryWhen(errors => errors.pipe(
                    delayWhen(() => timer(2000))
                ))
            );

        this.begginnerCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category === 'BEGINNER')));
        this.advancedCourses$ = courses$.pipe(map(courses => courses.filter(course => course.category === 'ADVANCED')));
        // courses$.subscribe(
        //     courses => {
        //         this.begginnerCourses = courses.filter(course => course.category === 'BEGINNER');
        //         this.advancedCourses = courses.filter(course => course.category === 'ADVANCED');
        //     },
        //     noop,
        //     () => console.log('complete')
        // );

    }

}
