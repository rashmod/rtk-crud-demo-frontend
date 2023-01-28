import React from 'react';
import { useSelector } from 'react-redux';

const Alert = ({ setShowAlert }) => {
	const todosState = useSelector((state) => state.todosState);
	let alertColor, errorMessage, successMessage;

	if (
		todosState.getTodoStatus === 'success' ||
		todosState.addTodoStatus === 'success' ||
		todosState.deleteTodoStatus === 'success'
	) {
		alertColor = 'success';
	} else if (
		todosState.getTodoStatus === 'failure' ||
		todosState.addTodoStatus === 'failure' ||
		todosState.deleteTodoStatus === 'failure'
	) {
		alertColor = 'danger';
	}

	if (alertColor === 'danger') {
		if (todosState.getTodoError !== '') {
			errorMessage = todosState.getTodoError;
		} else if (todosState.addTodoError !== '') {
			errorMessage = todosState.addTodoError;
		} else if (todosState.deleteTodoError !== '') {
			errorMessage = todosState.deleteTodoError;
		}
	}

	if (alertColor === 'success') {
		if (todosState.getTodoStatus !== '') {
			successMessage = 'Successfully fetched todos';
		} else if (todosState.addTodoStatus !== '') {
			successMessage = 'Successfully added todo';
		} else if (todosState.deleteTodoStatus !== '') {
			successMessage = 'Successfully deleted todo';
		}
	}

	return (
		<div className={`alert ${alertColor}-alert`}>
			<h3>
				{errorMessage
					? errorMessage
					: successMessage
					? successMessage
					: null}
			</h3>
			<p
				className='close'
				onClick={() => {
					setShowAlert(false);
				}}>
				×
			</p>
		</div>
	);
};

export default Alert;
