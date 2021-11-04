import {AnyAction, combineReducers} from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import {configureStore, MiddlewareArray} from "@reduxjs/toolkit";

import appReducer from "./reducers/appSlice";
import registerReducer from "./reducers/registerSlice";

const reducers = combineReducers({
   app: appReducer,
   register: registerReducer,
})

const store = configureStore({
   reducer: reducers,
   middleware: new MiddlewareArray().concat(thunk)
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;