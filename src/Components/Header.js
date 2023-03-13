import { Button } from '@mui/material';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Logo from "../Images/insta-logo.png";
import profile from '../Images/Profile.jpg';
import "../Styles/Header.css"
export default class Header extends Component {
    constructor() {
        super();
        const tempUser = JSON.parse(localStorage.getItem("users"));
        this.state = {
            user : tempUser
        }
    }

    render() {
        return (
            <div className='header'>
                <Link to="/">
                    <img src={Logo} alt="" className='insta-logo' />
                </Link>
                <nav>
                    <Link to="/profile">
                        <img src={this.state.user.profileUrl ? this.state.user.profileUrl : profile} alt="" className='profile-image' />
                    </Link>
                    <Button color="error" variant='outlined' onClick={() => this.props.signOut()}>Log Out</Button>
                </nav>
            </div>
        )
    }
}
