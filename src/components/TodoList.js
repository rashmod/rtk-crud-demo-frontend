import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodos, getTodos } from '../features/TodosSlice';

const TodoList = () => {
	const dispatch = useDispatch();
	const todos = useSelector((state) => state.todosState.todos);

	useEffect(() => {
		dispatch(getTodos());
	}, [dispatch]);

	const deleteHandler = (id) => {
		dispatch(deleteTodos(id));
	};

	return (
		<>
			<h4>
				You have {todos.length} {todos.length > 1 ? 'tasks' : 'task'}
			</h4>
			<ul className='list-group'>
				{todos.map((todo) => (
					<li key={todo._id}>
						{todo.task}
						<div>
							{/* <span className='badge'>Complete</span> */}
							<span
								className='badge'
								onClick={() => deleteHandler(todo._id)}>
								Delete
							</span>
						</div>
					</li>
				))}
			</ul>
		</>
	);
};

export default TodoList;
