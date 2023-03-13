import { Button, Card, CardContent, TextField } from '@mui/material'
import React, { Component } from 'react'
import "../Styles/SignUp.css"
import logo from '../Images/insta-logo.png'
import { Link } from 'react-router-dom'


export default class SignUp extends Component {
    constructor(){
        super();
        this.state = {
            email : "",
            password : "",
            fullName : "",
            file : null
        }
    }

    handleSignUp = () =>{
        this.props.signUp(this.state.email, this.state.password,this.state.file,this.state.fullName)
    }

    handleChange = (file) =>{
        this.setState({file : file})
    }

    render() {
        return (
            <Card className='signup-form'>
                <img src={logo} className="insta-logo" alt='logo' />
                <TextField variant='outlined' type='email' placeholder='Email' className='input' fullWidth onChange={(e)=>this.setState({email : e.target.value})}/>
                <TextField variant='outlined' placeholder='Full Name' className='input' fullWidth onChange={(e)=>this.setState({fullName : e.target.value})}/>
                <TextField variant='outlined' type='password' placeholder='Password' className='input' fullWidth onChange={(e)=>this.setState({password : e.target.value})}/>
                <label>Choose Profile Picture</label>
                <input type="file" placeholder="Select your image" onChange={(e) => this.handleChange(e.target.files[0])} accept="image/*" className="pro-pic-select"/>
                <Button variant="contained" color="primary" className='login-btn' fullWidth onClick={this.handleSignUp}>
                    Sign Up
                </Button>
                <CardContent>Already have an account ? <Link to="/" className='to-login'>Login</Link></CardContent>
            </Card>
        )
    }
}
