import  { Component } from 'react'

export default class PrivateRoute extends Component {
    constructor(){
        super();
        const user = JSON.parse(localStorage.getItem("users"));
        this.state = {
            user: user ? user : []
        }
    }
    
    // if the user not logged in redirect him to login page
    render() {
        if(Object.keys(this.state.user).length === 0){
            return window.location.href = "/login"
        }
        return this.props.children;
    }
}
