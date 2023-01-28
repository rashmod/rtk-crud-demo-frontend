import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASEURL = process.env.REACT_APP_BASEURL;

const initialState = {
	todos: [],
	getTodoStatus: '',
	getTodoError: '',
	addTodoStatus: '',
	addTodoError: '',
	deleteTodoStatus: '',
	deleteTodoError: '',
};

export const addTodos = createAsyncThunk(
	'todos/addTodos',
	async (todo, { rejectWithValue }) => {
		try {
			const response = await axios.post(`${BASEURL}todos`, todo);

			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const getTodos = createAsyncThunk(
	'todos/getTodos',
	async (todoId = null, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${BASEURL}todos`);

			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

export const deleteTodos = createAsyncThunk(
	'todos/deleteTodos',
	async (todoId, { rejectWithValue }) => {
		try {
			const response = await axios.delete(`${BASEURL}todos/${todoId}`);

			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue(error.response.data);
		}
	}
);

const TodosSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getTodos.pending, (state, action) => {
			state.getTodoStatus = 'loading';
			state.getTodoError = '';
			state.addTodoStatus = '';
			state.addTodoError = '';
			state.deleteTodoStatus = '';
			state.deleteTodoError = '';
		});

		builder.addCase(getTodos.fulfilled, (state, action) => {
			state.todos.push(...action.payload);
			state.getTodoStatus = 'success';
			state.getTodoError = '';
			state.addTodoStatus = '';
			state.addTodoError = '';
			state.deleteTodoStatus = '';
			state.deleteTodoError = '';
		});

		builder.addCase(getTodos.rejected, (state, action) => {
			state.getTodoStatus = 'failure';
			state.getTodoError = action.payload;
			state.addTodoStatus = '';
			state.addTodoError = '';
			state.deleteTodoStatus = '';
			state.deleteTodoError = '';
		});

		builder.addCase(addTodos.pending, (state, action) => {
			state.getTodoStatus = '';
			state.getTodoError = '';
			state.addTodoStatus = 'loading';
			state.addTodoError = '';
			state.deleteTodoStatus = '';
			state.deleteTodoError = '';
		});

		builder.addCase(addTodos.fulfilled, (state, action) => {
			state.todos.push(action.payload);
			// state.todos = [...state.todos, action.payload];
			state.getTodoStatus = '';
			state.getTodoError = '';
			state.addTodoStatus = 'success';
			state.addTodoError = '';
			state.deleteTodoStatus = '';
			state.deleteTodoError = '';
		});

		builder.addCase(addTodos.rejected, (state, action) => {
			state.getTodoStatus = '';
			state.getTodoError = '';
			state.addTodoStatus = 'failure';
			state.addTodoError = action.payload;
			state.deleteTodoStatus = '';
			state.deleteTodoError = '';
		});

		builder.addCase(deleteTodos.pending, (state, action) => {
			state.getTodoStatus = '';
			state.getTodoError = '';
			state.addTodoStatus = '';
			state.addTodoError = '';
			state.deleteTodoStatus = 'loading';
			state.deleteTodoError = '';
		});

		builder.addCase(deleteTodos.fulfilled, (state, action) => {
			const currentTodos = state.todos.filter(
				(todo) => todo._id !== action.payload._id
			);

			state.todos = currentTodos;
			state.getTodoStatus = '';
			state.getTodoError = '';
			state.addTodoStatus = '';
			state.addTodoError = '';
			state.deleteTodoStatus = 'success';
			state.deleteTodoError = '';
		});

		builder.addCase(deleteTodos.rejected, (state, action) => {
			state.getTodoStatus = '';
			state.getTodoError = '';
			state.addTodoStatus = '';
			state.addTodoError = '';
			state.deleteTodoStatus = 'failure';
			state.deleteTodoError = action.payload;
		});
	},
});

export default TodosSlice.reducer;
