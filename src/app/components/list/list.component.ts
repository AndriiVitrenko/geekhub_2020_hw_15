import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import {Store} from '@ngrx/store';
import {todos} from '../../selectors/app.selector';
import {changeState} from '../../actions/app.actions';

export interface Todo {
  title: string;
  time: string;
  isDone: boolean;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  filterForm!: FormGroup;
  todoList: Todo[] = [];

  sortedData: Todo[];

  constructor(private store: Store<any>) {
    this.sortedData = this.todoList.slice();
    this.store.select(todos)
        .subscribe(list => {
          this.todoList = list;
          this.sortedData = list;
        });
  }

  ngOnInit(): void {
    this.filterForm =  new FormGroup({
      isDoneOnly: new FormControl(false, Validators.required),
      time: new FormControl('', Validators.pattern(/^\d{2}:\d{2}$/))
    });
  }

  sortData(sort: Sort): void {
    const data = [...this.todoList];
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'time': return compare(a.time, b.time, isAsc);
        case 'isDone': return compare(a.isDone, b.isDone, isAsc);
        case 'position': return compare(this.sortedData.indexOf(a), this.sortedData.indexOf(b), isAsc);
        default: return 0;
      }
    });
  }

  changeState(index: number): void {
    this.store.dispatch(changeState({index}));
    // this.sortedData[index].isDone = !this.sortedData[index].isDone;
  }
}

function compare(a: number | string | boolean, b: number | string | boolean, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
