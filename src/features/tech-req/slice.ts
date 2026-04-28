import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { TechReqState, TabCategory } from './models/types';

const initialState: TechReqState = {
  tasks: [],
  activeTab: 'frontend',
};

const techReqSlice = createSlice({
  name: 'techReq',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<{ name: string; specification: string; category: TabCategory }>) {
      state.tasks.push({
        id: crypto.randomUUID(),
        name: action.payload.name,
        specification: action.payload.specification,
        category: action.payload.category,
        isActive: false,
        createdAt: new Date().toISOString(),
      });
    },
    setActiveTask(state, action: PayloadAction<{ taskId: string; category: TabCategory }>) {
      for (const task of state.tasks) {
        if (task.category === action.payload.category) {
          task.isActive = task.id === action.payload.taskId;
        }
      }
    },
    setActiveTab(state, action: PayloadAction<TabCategory>) {
      state.activeTab = action.payload;
    },
    deleteTask(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, setActiveTask, setActiveTab, deleteTask } = techReqSlice.actions;
export const techReqReducer = techReqSlice.reducer;
