import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {setArticle, setImage, setUsers} from '../actions/app.actions';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient, private store: Store<{article: {
    title: string,
    content: string,
    }}>) { }

  public getArticle(id: number): void {
    this.http.get('https://newsapi.org/v2/everything?q=Google&from=2021-04-06&sortBy=popularity&apiKey=233ba64de45f4c799d0047aabd04cf92')
        .subscribe((res: any) => {
          this.store.dispatch(setArticle({
            title: res.articles[id].title,
            content: res.articles[id].content,
          }));
        });
  }
  public getImages(id: number): void {
    this.http.get('https://jsonplaceholder.typicode.com/photos/' + id)
        .subscribe((res: any) => this.store.dispatch(setImage({src: res.thumbnailUrl})));
  }
  public getUsers(): void {
    this.http.get('https://api.github.com/users')
        .subscribe((res: any) => {
          this.store.dispatch(setUsers({users: res}));
        });
  }
  public login(auth: string): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/users', undefined, {
      headers: {
        'Content-Type': 'text/xml',
        'Authorization': auth,
      }
    });
  }
}
