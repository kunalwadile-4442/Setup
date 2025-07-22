import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
}

interface TaskState {
  tasks: Task[];
  sortOrder: string;
}

const initialState: TaskState = {
  tasks: [],
  sortOrder: "",
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Task = {
        id: new Date().toISOString(),
        title: action.payload,
      };
      state.tasks.push(newTask); // ✅ correct: state.tasks (not task)
    },
    removeTask: (state, action: PayloadAction<any>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTask: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      const task = state.tasks.find((task) => task.id === action.payload.id);
      if (task) {
        task.title = action.payload.title;
      }
    },
    clearAllTask: (state) => {
      state.tasks = [];
    },
    setSortOrder: (state, action) => {
    state.sortOrder = action.payload;
  },
  sortTasks: (state, action) => {
    if (action.payload === "asc") {
      state.tasks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (action.payload === "desc") {
      state.tasks.sort((a, b) => b.title.localeCompare(a.title));
    }
  },
  }
});

export const { addTask, removeTask, updateTask, clearAllTask ,setSortOrder,sortTasks} =
  taskSlice.actions;
export default taskSlice.reducer;
