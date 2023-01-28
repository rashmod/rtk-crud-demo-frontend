import { configureStore } from '@reduxjs/toolkit';
import TodosReducer from './features/TodosSlice';

const store = configureStore({
	reducer: {
		todosState: TodosReducer,
	},
});

export default store;
