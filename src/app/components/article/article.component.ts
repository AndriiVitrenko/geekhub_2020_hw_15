import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClientService} from '../../services/http-client.service';

interface ArticleInterface {
  title: string;
  text: string;
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  id = 0;
  img = '';
  article: ArticleInterface = { title: '', text: ''};

  constructor(private route: ActivatedRoute, private http: HttpClientService) { }

  ngOnInit(): void {
    this.id = +`${this.route.snapshot.paramMap.get('id')}`;
    this.http.getArticle()
        .subscribe(res => {
          this.article.title = res.articles[this.id - 1].title;
          this.article.text = res.articles[this.id - 1].content;
        });
    this.http.getImages(this.id)
        .subscribe(res => this.img = res.thumbnailUrl);
  }

}
