import React, { Component } from 'react';
import "../Styles/Main.css"
import VideoUpload from './VideoUpload';
import Posts from './Posts';

export default class Main extends Component {
    render() {
        return (
            <div>
                <VideoUpload/>
                <Posts/>
            </div>
        )
    }
}
