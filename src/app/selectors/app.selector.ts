import { createSelector,  } from '@ngrx/store';
import {UserInterface} from '../components/table/table.component';
import {Todo} from '../components/list/list.component';

interface IArticle {
    title: string;
    content: string;
    img: string;
}

interface IState {
    article: IArticle;
    users: UserInterface[];
    todos: Todo[];
}

const store = (state: IState) => state;

export const article = createSelector(
    store,
    state => state.article
);

export const users = createSelector(
    store,
    state => state.users
);

export const todos = createSelector(
    store,
    state => state.todos
);
