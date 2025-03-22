import { inject, Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, retry, catchError, delay, take } from 'rxjs/operators';
import { firstValueFrom, Observable, of, throwError } from 'rxjs';

interface Post {
  userId: string;
  id: string;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // constructor(@Inject('https://jsonplaceholder.typicode.com/posts') private url: string, private http: HttpClient) { }

  url = 'https://jsonplaceholder.typicode.com/posts';
  private http = inject(HttpClient);

  getAll() {
    return firstValueFrom(
      this.http.get<Post[]>(this.url).pipe(delay(2000))
    );
  }

  create(resource: any) {
    return this.http
      .post(this.url, resource)
      .pipe(catchError(this.handleError));
  }

  update(resource: any) {
    return this.http
      .put(this.url + '/' + resource.id, resource)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 404) return throwError(error.message);

    if (error.status === 400) return throwError(error.message);

    return throwError(error.message);
  }
}
