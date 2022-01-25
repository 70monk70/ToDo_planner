import React from "react"
import {Link, useParams} from 'react-router-dom'

const Project = ({project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                {project.title}
            </td>
            <td>
                <Link to={`/projects/${project.id}/`}>{project.id}</Link>
            </td>
            <td>
                {project.users}
            </td>
            <td>
                <button type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectDetail = ({projects}) => {
    let {id} = useParams()
    let project = projects[0]
    return (<table>
        <tr>
            <td>ID</td>
            <td>{id}</td>
        </tr>
        <tr>
            <td>Title</td>
            <td>{project.title}</td>
        </tr>
        <tr>
            <td>Link</td>
            <td>{project.url}</td>
        </tr>
        <tr>
            <td>Users</td>
            <td>{project.users}</td>
        </tr>
    </table>)
}

const ProjectsList = ({projects}) => {
    return (
        <table>
            <th>
                ID
            </th>
            <th>
                Title
            </th>
            <th>
                Link
            </th>
            <th>
                Users
            </th>
            <th>
                Delete
            </th>
            {projects.map((project) => <Project project={project}/>)}
        </table>
    )
}

export default ProjectsList
export {ProjectDetail}
