import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClientService} from '../../services/http-client.service';
import { Store } from '@ngrx/store';
import {article} from '../../selectors/app.selector';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  id = 0;
  img = '';
  title = '';
  content = '';

  constructor(private route: ActivatedRoute, private http: HttpClientService, private store: Store<any>) {
    this.store.select(article)
        .subscribe(result => {
          this.title = result.title;
          this.content = result.content;
          this.img = result.img;
        });
  }

  ngOnInit(): void {
    this.id = +`${this.route.snapshot.paramMap.get('id')}`;
    this.http.getArticle(this.id);
    this.http.getImages(this.id);
  }

}
