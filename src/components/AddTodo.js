import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodos } from '../features/TodosSlice';

const AddTodo = () => {
	const dispatch = useDispatch();
	const [todo, setTodo] = useState({ task: '', status: 'COMPLETE' });

	const submitHandler = (e) => {
		e.preventDefault();

		dispatch(addTodos(todo));
		setTodo({ task: '', status: 'COMPLETE' });
	};

	return (
		<div>
			<form className='searchbox-wrap' onSubmit={submitHandler}>
				<input
					type='text'
					placeholder='Add a Todo...'
					onChange={(e) => setTodo({ ...todo, task: e.target.value })}
					value={todo.task}
				/>
				<button>
					<span>Add Todo</span>
				</button>
			</form>
		</div>
	);
};

export default AddTodo;
