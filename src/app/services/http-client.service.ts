import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private http: HttpClient) { }

  public getArticle(): Observable<any> {
    return this.http.get('https://newsapi.org/v2/everything?q=Google&from=2021-04-06&sortBy=popularity&apiKey=233ba64de45f4c799d0047aabd04cf92');
  }
  public getImages(id: number): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/photos/' + id);
  }
  public getUsers(): Observable<any> {
    return this.http.get('https://api.github.com/users');
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
