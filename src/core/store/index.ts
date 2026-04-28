import { configureStore } from '@reduxjs/toolkit';
import { techReqReducer } from '@/features/tech-req/slice';

export const store = configureStore({
  reducer: {
    techReq: techReqReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
