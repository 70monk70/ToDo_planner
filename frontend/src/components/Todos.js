import React from "react"

const ToDo = ({todo}) => {
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
                <button type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ToDosList = ({todos}) => {
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
                Delete
            </th>
            {todos.map((todo) => <ToDo todo={todo}/>)}
        </table>
    )
}

export default ToDosList
