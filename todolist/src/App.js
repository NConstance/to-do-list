import { useState, useEffect } from "react"; 
import TodoList from "./components/TodoList/TodoList";

export default function App() {
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([])
    const [newTodo, setNewTodo] = useState({
        title: "",
        completed: false
    })


    // create Todos
    const createTodo = async () => {
        const body = {...newTodo}
        try{
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const createdTodo = await response.json()
            const todosCopy = [createdTodo, ...todos]
            setTodos(todosCopy)
            setNewTodo({
                title: '',
                completed: false
            })
        } catch(err){
            console.log("Error:", err)
        }
    }
    // delete Todos
    const deleteTodo = async (id) => {
        try{
            const index = completedTodos.findIndex((todo) => todo._id === id)
            const completedTodosCopy = {...completedTodos}

            const response = await fetch(`/api/todos/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })

            await response.json()
            completedTodosCopy.splice(index, 1)
            setCompletedTodos(completedTodosCopy)
        } catch(err){
            console.log("Error:", err)
        }
    }
    // move to completed
    const moveToCompleted = async (id) => {
        try{
            const index = todos.findIndex((todo) => todo._id === id)
            const todosCopy = {...todos}
            const subject = todosCopy[index]
            subject.completed = true
            const response = await fetch(`/api/todos/${id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            });
            const updatedTodo = await response.json();
            const completedTodosCopy = [updatedTodo,...completedTodos]
            setCompletedTodos(completedTodosCopy)
            todosCopy.splice(index, 1)
            setTodos(todosCopy)

        } catch(err){
            console.log("Error:", err)
        }
    }
    // get the todos
    const getTodos = async () => {
        try{
            const responseTodos = await fetch('/api/todos')
            const foundTodos = await responseTodos.json()
            setTodos(foundTodos.reverse())
            const responseCompleted = await fetch('/api/todos/completed')
            const foundCompletedTodos = await responseCompleted.json()
            setCompletedTodos(foundCompletedTodos.reverse())
        } catch(err){
            console.log("Error:", err)
        }
    }

    useEffect(() => {
        getTodos()
    },[])

    return (
        <div>
            <TodoList
            newTodo={newTodo}
            setNewTodo={setNewTodo}
            createTodo={createTodo}
            todos={todos}
            moveToCompleted={moveToCompleted}
            completedTodos={completedTodos}
            deleteTodo={deleteTodo}
            />
        </div>
    )
}