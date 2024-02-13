import Todo from "../Todo/Todo";
import styles from './todolist.module.scss'


export default function TodoList (props) {
    const {newTodo, createTodo, setNewTodo, todos, moveToCompleted, completedTodos, deleteTodo} = props;
    return(
        <div className={styles.todolist}>
        <h1>Todo List</h1>
         Add Todo:<input className={styles.input} type="text" value={newTodo.title} 
            onChange={(e) => {setNewTodo({...newTodo, title: e.target.value})}}
            onKeyDown={(e) => {e.key === 'Enter' && createTodo()}}
        />
        <Todo
        title={"Todos"}
        buttonText={"Completed"}
        todosList={todos}
        bottonAction={moveToCompleted}
        />
        <Todo
        title={"Completed Todos"}
        buttonText={"delete"}
        todosList={completedTodos}
        bottonAction={deleteTodo}
        />
        </div>
    )
}