import { createReducer, on } from '@ngrx/store';
import {changeState, setArticle, setImage, setUsers} from '../actions/app.actions';
import {UserInterface} from '../components/table/table.component';
import { Todo } from '../components/list/list.component';

interface IArticle {
    title: string;
    content: string;
    img: string;
}

const ArticleState: IArticle = {
    title: '',
    content: '',
    img: '',
};

const TodoState: Todo[] = [
    {
        title: 'Feed the cat',
        time: '08:15',
        isDone: false,
    },
    {
        title: 'Do homework',
        time: '10:00',
        isDone: true,
    },
];

const UsersState: UserInterface[] = [];

const articleReducer = createReducer(
    ArticleState,
    on(setArticle, (state, {title, content}) => ({...state, title, content})),
    on(setImage, (state, {src}) => ({...state, img: src}))
);

const usersReducer = createReducer(
    UsersState,
    on(setUsers, (state, {users}) => ([...users]))
);

const todoReducer = createReducer(
    TodoState,
    on(changeState, (state, {index}) => {
       const newState: Todo[] = [];
       state.map((todo) => {
           newState.push({...todo});
       });
       newState[index].isDone = !newState[index].isDone;
       return newState;
    })
);

export const reducer = {
    article: articleReducer,
    users: usersReducer,
    todos: todoReducer,
};
