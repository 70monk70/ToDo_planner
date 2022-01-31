import React from 'react'


class TodoForm extends React.Component {
    constructor(prop) {
        super(prop)
        this.state = {
            'text': '',
            'creator': '',
            'project': '',
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
        console.log(this.state)
    }

    handleCreatorChange(event) {
        this.setState(
            {
                ['creator']: parseInt(event.target.selectedOptions.item(0).value)
            }
        )
        console.log(this.state)
    }

    handleProjectChange(event) {
        this.setState(
            {
                ['project']: parseInt(event.target.selectedOptions.item(0).value)
            }
        )
        console.log(this.state)
    }

    handleSubmit(event) {
        this.props.create_todo(this.state.text, this.state.creator, this.state.project)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="text" placeholder="text" value={this.state.title}
                       onChange={(event) => this.handleChange(event)}/>
                <select name='creator' onChange={(event) => this.handleCreatorChange(event)}>
                    {this.props.users.map((user) => <option value={user.id}> {user.firstName} {user.lastName}</option>)}
                </select>
                <select name='project' onChange={(event) => this.handleProjectChange(event)}>
                    {this.props.projects.map((project) => <option value={project.id}> {project.title} </option>)}
                </select>
                <input type="submit" value="Create Todo"/>
            </form>
        )
    }
}

export default TodoForm