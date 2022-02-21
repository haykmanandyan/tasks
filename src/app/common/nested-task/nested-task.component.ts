import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, map, Subject, zip} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ApiCommentInterface, ApiPostInterface, CustomDataInterface} from "../interfaces";

@Component({
  selector: 'app-nested-task',
  templateUrl: './nested-task.component.html',
  styleUrls: ['./nested-task.component.scss']
})
export class NestedTaskComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>()

  constructor(
    private http: HttpClient
  ) {
  }

  public ngOnInit(): void {
    this.getCustomData();
  }

  private getCustomData(): void {
    this.http
      .get<ApiCommentInterface>('https://jsonplaceholder.typicode.com/comments/94')
      .subscribe((comment: ApiCommentInterface) => {
        this.http
          .get<ApiPostInterface>(`https://jsonplaceholder.typicode.com/posts/${comment.postId}`)
          .subscribe((post: ApiPostInterface) => {
            const postUser = this.http
              .get(`https://jsonplaceholder.typicode.com/users/${post.userId}`)
            const userTodos = this.http
              .get(
                `https://jsonplaceholder.typicode.com/todos`,
                {params: {userId: post.userId}}
              )
            const result = forkJoin(postUser, userTodos);
            result
              .pipe(
                map(([user, userTodos]) => ({user, userTodos}))
              )
              .subscribe((data: CustomDataInterface) => {
                console.log(data)
              })
          })
      })
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.unsubscribe();
  }
}
