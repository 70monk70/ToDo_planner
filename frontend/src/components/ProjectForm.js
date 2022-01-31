import React from 'react'

class ProjectForm extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'title': '',
            'users': [],
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleUsersChange(event) {
        if (!event.target.selectedOptions) {
            return
        }

        let users = []
        for (let i=0; i < event.target.selectedOptions.length; i++) {
            users.push(parseInt(event.target.selectedOptions.item(i).value))
        }

        this.setState(
            {
                ['users']: users
            }
        )
    }

    handleSubmit(event) {
        this.props.create_project(this.state.title, this.state.users)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="title" placeholder="title" value={this.state.title}
                       onChange={(event) => this.handleChange(event)}/>
                <select multiple name='users' onChange={(event) => this.handleUsersChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}> {user.firstName} {user.lastName}</option>)}
                </select>
                <input type="submit" value="Create Project"/>
            </form>
        )
    }
}

export default ProjectForm