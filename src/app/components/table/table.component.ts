import { Component, OnInit, ViewChild } from '@angular/core';
import {HttpClientService} from '../../services/http-client.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {Store} from '@ngrx/store';
import {users} from '../../selectors/app.selector';

export interface UserInterface {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  users: UserInterface[] = [];
  columns = ['position', 'login', 'avatar_url', 'url', 'repos_url'];
  data = new MatTableDataSource<UserInterface>(this.users);

  constructor(private http: HttpClientService, private store: Store<any>) {
    this.store.select(users)
        .subscribe(state => {
          this.users = state;
          this.data = new MatTableDataSource<UserInterface>(this.users);
          this.data.paginator = this.paginator;
        });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.http.getUsers();
  }
}
