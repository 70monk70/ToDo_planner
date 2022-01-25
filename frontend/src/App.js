import './App.css'
import React from 'react'
import {BrowserRouter, Routes, Route, Link, Navigate, useLocation} from 'react-router-dom'
import Menu from './components/Menu.js'
import UsersList from './components/Users.js'
import ProjectsList, {ProjectDetail} from "./components/Projects.js"
import ToDosList from "./components/Todos.js"
import Footer from './components/Footer.js'
import LoginForm from './components/LoginForm.js'
import axios from 'axios'

const NotFound = () => {
    let location = useLocation()
    return (
        <div>Page {location.pathname} not found</div>
    )
}

class App extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': ''
        }
    }

    get_token(login, password) {
        axios
            .post('http://127.0.0.1:8000/api-token-auth/', {'username': login, 'password': password})
            .then(response => {
                const token = response.data.token
                localStorage.setItem('token', token)
                this.setState({
                    'token': token
                }, this.get_data)
            })
            .catch(error => console.log(error))
    }

    logout() {
        localStorage.setItem('token', '')
        this.setState({
            'token': ''
        }, this.get_data)
    }

    componentDidMount() {
        this.setState({
            'token': localStorage.getItem('token')
        }, this.get_data)
    }

    is_auth() {
        return !!this.state.token
    }

    get_headers() {
        if (this.is_auth()) {
            return {
                'Authorization': 'Token ' + this.state.token
            }
        }
        return {}
    }

    get_data() {
        let headers = this.get_headers()
        axios
            .get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data.results
                this.setState({
                    'users': users
                })
            })
            .catch(error => {
                    this.setState({
                        'users': []
                    })
                    console.log(error)
                }
            )

        axios
            .get('http://127.0.0.1:8000/api/project/', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState({
                    'projects': projects
                })
            })
            .catch(error => {
                    this.setState({
                        'projects': []
                    })
                    console.log(error)
                }
            )

        axios
            .get('http://127.0.0.1:8000/api/ToDo/', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState({
                    'todos': todos
                })
            })
            .catch(error => {
                    this.setState({
                        'todos': []
                    })
                    console.log(error)
                }
            )
    }

    delete_project(id) {
        console.log(id)
    }

    delete_todo(id) {
        console.log(id)
    }

    render() {
        return (
            <div>
                <Menu/>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li><Link to='/'> Users </Link></li>
                            <li><Link to='/projects'> Projects </Link></li>
                            <li><Link to='/todos'> ToDos </Link></li>
                            <li>
                                {this.is_auth() ? <button onClick={() => this.logout()}> Logout </button> :
                                    <Link to='/login'> Login </Link>}
                            </li>
                        </ul>
                    </nav>
                    <Routes>
                        <Route exact path='/' element={<UsersList users={this.state.users}/>}/>
                        <Route exact path='/projects' element={<ProjectsList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' element={<ToDosList todos={this.state.todos}/>}/>
                        <Route exact path='/projects/:id/' element={<ProjectDetail projects={this.state.projects}/>}/>
                        <Route exact path='/projects/:id/' element={<ProjectDetail projects={this.state.projects} delete_project={(id) => this.delete_project(id)}/>}/>
                        <Route exact path='/todo/:id/' element={<ProjectDetail todo={this.state.projects} delete_todo={(id) => this.delete_todo(id)}/>}/>
                        <Route exact path='/login'
                               element={<LoginForm get_token={(login, password) => this.get_token(login, password)}/>}/>
                        <Route path='/users' element={<Navigate to='/'/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </BrowserRouter>
                <Footer/>
            </div>
        )
    }
}

export default App
