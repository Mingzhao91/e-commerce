import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { User } from '../models/user';

import * as UsersActions from './users.actions';

export const USERS_FEATURE_KEY = 'users';

export interface UsersState {
    user: User;
    isAuthenticated: boolean;
}

export interface UsersPartialState {
    readonly [USERS_FEATURE_KEY]: UsersState;
}

export const initialUsersState: UsersState = {
    user: null,
    isAuthenticated: false
};

const usersReducer = createReducer(
    initialUsersState,
    on(UsersActions.buildUserSession, (state) => ({ ...state })),
    on(UsersActions.buildUserSessionSuccess, (state, action) => ({ ...state, user: action.user, isAuthenticated: true })),
    on(UsersActions.buildUserSessionFailed, (state, action) => ({ ...state, user: null, isAuthenticated: false }))
);

export function reducer(state: UsersState | undefined, action: Action) {
    return usersReducer(state, action);
}

// export interface State extends EntityState<UsersEntity> {
//     selectedId?: string | number; // which Users record has been selected
//     loaded: boolean; // has the Users list been loaded
//     error?: string | null; // last known error (if any)
// }

// export interface UsersPartialState {
//     readonly [USERS_FEATURE_KEY]: State;
// }

// export const usersAdapter: EntityAdapter<UsersEntity> = createEntityAdapter<UsersEntity>();

// export const initialState: State = usersAdapter.getInitialState({
//     // set initial required properties
//     loaded: false
// });

// const usersReducer = createReducer(
//     initialState,
//     on(UsersActions.init, (state) => ({ ...state, loaded: false, error: null })),
//     on(UsersActions.loadUsersSuccess, (state, { users }) => usersAdapter.setAll(users, { ...state, loaded: true })),
//     on(UsersActions.loadUsersFailure, (state, { error }) => ({ ...state, error }))
// );

// export function reducer(state: State | undefined, action: Action) {
//     return usersReducer(state, action);
// }
