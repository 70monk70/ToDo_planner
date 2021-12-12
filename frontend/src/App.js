import './App.css'
import React from 'react'
import Menu from './components/Menu.js'
import UsersList from './components/Users.js'
import Footer from './components/Footer.js'
import axios from 'axios'

class App extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'users': []
        }
    }
    componentDidMount() {
        axios
            .get('http://127.0.0.1:8000/api/users/')
            .then(response => {
                const users = response.data
                this.setState({
                    'users': users
                })
            })
            .catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <Menu/>
                <UsersList users={this.state.users}/>
                <Footer/>
            </div>
        )
    }
}

export default App
