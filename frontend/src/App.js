import './App.css'
import React from 'react'
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom'
import Menu from './components/Menu.js'
import UsersList from './components/Users.js'
import ProjectsList, {ProjectDetail} from "./components/Projects.js"
import ToDosList from "./components/Todos.js"
import Footer from './components/Footer.js'
import axios from 'axios'

const NotFound = () => {
    return (
        <div>Page not found</div>
    )
}

class App extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
        }
    }

    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data.results
                this.setState({
                    'users': users
                })
            })
            .catch(error => console.log(error))

        axios
            .get('http://127.0.0.1:8000/api/project/')
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })
            })
            .catch(error => console.log(error))

        axios
            .get('http://127.0.0.1:8000/api/ToDo/')
            .then(response => {
                const todos = response.data.results
                this.setState({
                    'todos': todos
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <Menu/>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/'>Users</Link></li>
                            <li><Link to='/projects'>Projects</Link></li>
                            <li><Link to='todos'> ToDos</Link></li>

                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UsersList users={this.state.users}/>} />
                        <Route exact path='/projects' element={<ProjectsList projects={this.state.projects}/>} />
                        <Route exact path='/todos' element={<ToDosList todos={this.state.todos}/>} />
                        <Route exact path={'/projects/:id/'} element={<ProjectDetail projects={this.state.projects}/>} />
                        <Route path='/users' element={<Navigate to='/'/>} />
                        <Route path="*" element={<NotFound/>} />
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App
