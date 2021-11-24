import React, {useState, useEffect} from 'react';
import TodoList from './TodoList';
import { Context } from './context';

export default function Work() {

    const [name, setName] = useState([])
    const [todos, setTodos] = useState([])
    const [todoTitle, setTodoTitle] = useState('')

    useEffect(() => {
      setName(prompt('Your name', 'tanya'));
      console.log(localStorage.getItem(name));
      const raw = localStorage.getItem(name) || "[]";
      console.log(raw);
      setTodos(JSON.parse(raw))
    }, [])

    useEffect(() => {
        localStorage.setItem(name, JSON.stringify(todos))
    }, [todos])

     useEffect(() => {
       const newValue = localStorage.getItem(name) || '[]';
       setTodos(JSON.parse(newValue))
    }, [name])
    

    const addTodo = event => {
        if (event.key === 'Enter') {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    title: todoTitle,
                    completed: false
                }
            ])
            setTodoTitle('')
        }
    }

    const addName = event => {
      event.preventDefault();
      setName(prompt('Your name', 'lola'));
    }

    const removeTodo = id => {
      setTodos(todos.filter(todo => {return todo.id !== id }))
    }

    const toggleTodo = id => {
      setTodos(todos.map(todo => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }))
    }

    return (
      <Context.Provider value={{
        toggleTodo, removeTodo
      }}>
        <div className="container">
          <h4>Hello, {name}</h4>
          <button onClick={addName}>Log out</button>
          <h1>Todo app</h1>

          <div className="input-field">
            <input 
                type="text" 
                value={todoTitle}
                onChange={event => setTodoTitle(event.target.value)}
                onKeyPress={addTodo}
            />
            <label>Todo name</label>
          </div>

          <TodoList todos={todos} />
        </div>
      </Context.Provider>
    );
}