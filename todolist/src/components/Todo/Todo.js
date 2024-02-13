import styles from './todo.module.scss'

export default function Todo (props) {
    const {title, buttonText, todosList, bottonAction} = props
    return(
        <div>
        <h3>{title}</h3>
            {todosList.map((todo) => 
                <div key={todo._id} className={styles.todo}>{todo.title}
                    <button className={styles.button} onClick={() => bottonAction(todo._id)}>{buttonText}</button>
                </div>)
            }
        </div>
    )
}