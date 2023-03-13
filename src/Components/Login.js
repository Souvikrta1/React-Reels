import React, { Component } from 'react'
import img1 from '../Images/img1.png'
import img2 from '../Images/img2.png'
import img3 from '../Images/img3.png'
import img4 from '../Images/img4.png'
import logo from '../Images/insta-logo.png'
import instagram from '../Images/instagram.png'
import gLogo from "../Images/gLogo.jpg"
import { CarouselProvider, Slider, Slide, Image } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import '../Styles/Login.css'
import { Button, Card, CardContent, TextField } from '@mui/material'
import { Link } from 'react-router-dom'



export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",

        }
    }

    handleLogin = () => {
        this.props.login(this.state.email, this.state.password);
    }

    googleLogin = () => {
        this.props.googleLogin()
    }



    render() {
        return (
            <div className='login-page'>
                <div className='designMobile-view'>
                    <img src={instagram} alt="overlay" className='overlay' />
                    <div className="img-slide">
                        <CarouselProvider
                            totalSlides={4}
                            visibleSlides={1}
                            naturalSlideHeight={533}
                            naturalSlideWidth={250}
                            isPlaying={true}
                            interval={3000}
                            dragEnabled={false}
                            infinite={true}
                            touchEnabled={false}
                        >
                            <Slider>
                                <Slide index={0}>
                                    <Image src={img1}></Image>
                                </Slide>
                                <Slide index={1}>
                                    <Image src={img2}></Image>
                                </Slide>
                                <Slide index={2}>
                                    <Image src={img3}></Image>
                                </Slide>
                                <Slide index={3}>
                                    <Image src={img4}></Image>
                                </Slide>
                            </Slider>
                        </CarouselProvider>
                    </div>
                </div>
                <div className='login-section'>
                    <Card className='login-card'>
                        <img src={logo} className="insta-logo" alt='logo' />
                        <TextField variant='outlined' placeholder='Email' className='input' onChange={(e) => this.setState({ email: e.target.value })} />
                        <TextField variant='outlined' placeholder='Password' className='input' onChange={(e) => this.setState({ password: e.target.value })} />
                        <Button variant="contained" color="primary" className='login-btn' onClick={this.handleLogin}>
                            Login
                        </Button>
                        <Button color="primary" onClick={this.googleLogin} className="google-btn"><img src={gLogo} className='google-logo' alt='G'/>Login With Google</Button>
                        <Button color="primary">Forgot Password</Button>
                    </Card>
                    <Card className='dont-have-account'>
                    <CardContent>Don't have an account ? <Link to="/signup" className='to-sign-up'>Sign Up</Link></CardContent>
                    </Card>
                </div>
            </div>
        )
    }
}
