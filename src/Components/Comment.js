import { Avatar } from '@mui/material'
import React, { Component } from 'react'
import { updateDoc, doc } from 'firebase/firestore'
import { fstore } from './Firebase'

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: ''
        }
    }
    handleClick = () => {
        if(this.state.comment === "") {
            window.location.href=""
            return
        };
        let tempArr = [...this.props.postData.comments, {
            uName: this.props.userData.fullName,
            uProfile: this.props.userData.profileUrl,
            text: this.state.comment,
            uId: this.props.userData.userId,
        }];
        let tempRef = doc(fstore, "posts", this.props.id);
        updateDoc(tempRef, { comments: tempArr }).then((res) => {
            console.log(res);
            window.location.href=""
        }).catch((err) => {
            console.log(err);
        })
    }
    render() {
        return (
            <div className='comment-box'>
                <button className='close-btn' onClick={()=>this.props.display()}>X</button>
                {
                    this.props.postData.comments.map((ele,index) => {
                        return (
                            <div style={{ display: 'flex' , alignItems: 'center' }} key={index}>
                                <Avatar src={ele.uProfile} style={{marginLeft : "5px",marginBottom:"5px" , marginRight:"5px"}}/>
                                <p><span style={{ fontWeight: 'bold' }}>{ele.uName}</span>&nbsp;&nbsp;{ele.text}</p>
                            </div>
                        )
                    })
                }
                <div>
                    <input placeholder='comment here' type="text" onChange={(e) => {this.setState({ comment: e.target.value })}} />
                    <button onClick={this.handleClick} className="cmnt-done">Comment</button>
                </div>
            </div>
        )
    }
}