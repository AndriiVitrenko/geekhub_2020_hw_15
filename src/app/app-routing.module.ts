import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HomeComponent} from './components/home/home.component';
import {PageListComponent} from './components/page-list/page-list.component';
import {LogInComponent} from './components/log-in/log-in.component';
import {SignUpComponent} from './components/sign-up/sign-up.component';
import {TableComponent} from './components/table/table.component';
import {ListComponent} from './components/list/list.component';
import {ArticleComponent} from './components/article/article.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'pages',
    component: PageListComponent
  },
  {
    path: 'log-in',
    component: LogInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'table',
    component: TableComponent,
  },
  {
    path: 'list',
    component: ListComponent,
  },
  {
    path: 'article/:id',
    component: ArticleComponent,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
