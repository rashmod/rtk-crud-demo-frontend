import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AddTodo from './components/AddTodo';
import Alert from './components/Alert';
import Loader from './components/Loader';
import TodoList from './components/TodoList';

function App() {
	const todosState = useSelector((state) => state.todosState);
	const [showAlert, setShowAlert] = useState(false);

	const setLoader =
		todosState.getTodoStatus === 'loading' ||
		todosState.addTodoStatus === 'loading' ||
		todosState.deleteTodoStatus === 'loading';

	useEffect(() => {
		if (
			todosState.getTodoStatus === ('success' || 'failure') ||
			todosState.addTodoStatus === ('success' || 'failure') ||
			todosState.deleteTodoStatus === ('success' || 'failure')
		) {
			setShowAlert(true);
		}
	}, [todosState]);

	return (
		<div className='App'>
			<AddTodo />
			{setLoader && <Loader />}
			{showAlert && <Alert setShowAlert={setShowAlert} />}
			<TodoList />
		</div>
	);
}

export default App;
