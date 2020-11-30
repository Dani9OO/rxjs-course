import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Course} from "../model/course";
import {
    debounceTime,
    distinctUntilChanged,
    startWith,
    tap,
    delay,
    map,
    concatMap,
    switchMap,
    withLatestFrom,
    concatAll, shareReplay, throttle, throttleTime
} from 'rxjs/operators';
import { merge, Observable, concat, interval, fromEvent, forkJoin } from 'rxjs';
import {Lesson} from '../model/lesson';
import { createHttpObservable } from '../common/util';
import { debug, RxJsLoggingLevel } from '../common/debug';


@Component({
    selector: 'course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, AfterViewInit {

    courseId: string;
    course$: Observable<Course>;
    lessons$: Observable<Lesson[]>;


    @ViewChild('searchInput', { static: true }) input: ElementRef;

    constructor(private route: ActivatedRoute) {


    }

    ngOnInit() {

        this.courseId = this.route.snapshot.params['id'];

        // this.course$ = createHttpObservable(`/api/courses/${this.courseId}`)
        //     .pipe(
        //         debug( RxJsLoggingLevel.INFO, 'course ')
        //     );

        const course$ = createHttpObservable(`/api/courses/${this.courseId}`);

        const lessons$ = this.loadLessons();

        forkJoin([course$, lessons$])
            .pipe(
                tap(([course, lessons]) => {
                    console.log('course', course);
                    console.log('lesson', lessons);
                })
            )
            .subscribe();

    }

    ngAfterViewInit() {

        // const initialLessons$ = this.loadLessons();

        // const searchLessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
        //     .pipe(
        //         map(event => event.target.value),
        //         debounceTime(400),
        //         distinctUntilChanged(),
        //         switchMap(search => this.loadLessons(search))
        //     );

        // this.lessons$ = concat(initialLessons$, searchLessons$);
        // this.lessons$.subscribe();

        // this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
        //     .pipe(
        //         map(event => event.target.value),
        //         startWith(''),
        //         debounceTime(400),
        //         distinctUntilChanged(),
        //         switchMap(search => this.loadLessons(search))
        //     );
        // this.lessons$.subscribe();

        // fromEvent<any>(this.input.nativeElement, 'keyup')
        //     .pipe(
        //         map(event => event.target.value),
        //         startWith(''),
        //         debounceTime(400)
        //         // throttleTime(500)
        //     )
        //     .subscribe(console.log);

        // this.lessons$ = fromEvent<any>(this.input.nativeElement, 'keyup')
        //     .pipe(
        //         map(event => event.target.value),
        //         startWith(''),
        //         debug( RxJsLoggingLevel.TRACE, 'search '),
        //         debounceTime(400),
        //         distinctUntilChanged(),
        //         switchMap(search => this.loadLessons(search)),
        //         debug( RxJsLoggingLevel.DEBUG, 'lessons value '),
        //     );
        // this.lessons$.subscribe();

        fromEvent<any>(this.input.nativeElement, 'keyup')
            .pipe(
                map(event => event.target.value),
                // startWith(''),
                // debounceTime(400)
                throttleTime(500)
            )
            .subscribe(console.log);

    }

    loadLessons(search = ''): Observable<Lesson[]> {
        return createHttpObservable(`/api/lessons?courseId=${this.courseId}&pageSize=100&filter=${search}`)
        .pipe(
            map(res => res['payload'])
        );
    }


}
