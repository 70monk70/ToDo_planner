import React from "react"

const ToDo = ({todo, delete_todo}) => {
    return (
        <tr>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.creator}
            </td>
            <td>
                {todo.text}
            </td>
            <td>
                {String(todo.isActive)}
            </td>
            <td>
                <button onClick={() => delete_todo(todo.id)} type='button'>Done</button>
            </td>
        </tr>
    )
}

const ToDosList = ({todos, delete_todo}) => {
    return (
        <table>
            <th>
                Project
            </th>
            <th>
                Creator
            </th>
            <th>
                Text
            </th>
            <th>
                Status
            </th>
            <th>
                Done
            </th>
            {todos.map((todo) => <ToDo todo={todo} delete_todo={delete_todo}/>)}
        </table>
    )
}

export default ToDosList
