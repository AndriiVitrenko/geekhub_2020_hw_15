import { Component, OnInit } from '@angular/core';

interface PageListInterface {
  title: string;
  path: string;
}

interface PageCollectionInterface {
  isCollection: boolean;
  array: PageListInterface[];
  name: string;
}

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss']
})
export class PageListComponent implements OnInit {
  pages: Array<PageListInterface> = [
    {
      title: 'Table',
      path: 'table',
    },
    {
      title: 'List',
      path: 'list',
    },
  ];
  collections: PageCollectionInterface[] = [
    {
      name: 'Articles',
      isCollection: true,
      array: [
        {
          title: 'Article 1',
          path: '1'
        },
        {
          title: 'Article 2',
          path: '2',
        },
        {
          title: 'Article 3',
          path: '3',
        },
      ]
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
