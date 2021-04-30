import { createAction, props } from '@ngrx/store';
import {UserInterface} from '../components/table/table.component';

export const setArticle = createAction('[Article Component] setArticle', props<{title: string, content: string}>());

export const setImage = createAction('[Article Component] setImage', props<{src: string}>());

export const setUsers = createAction('[Table Component] setUsers', props<{users: UserInterface[]}>());

export const changeState = createAction('[List Component] change state', props<{index: number}>());
