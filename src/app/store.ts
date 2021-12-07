import { configureStore } from '@reduxjs/toolkit'
import animalsReducer from '../features/animalsSlice'


const store = configureStore({
  reducer: {
    animal: animalsReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export default store;