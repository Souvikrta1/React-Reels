import { Avatar } from '@mui/material'
import React, { Component } from 'react'
import { updateDoc, doc, getDocs } from 'firebase/firestore'
import { database, fstore } from './Firebase'

export default class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            displayComment: []
        }
    }
    handleClick = async () => {
        let tempArr = [...this.state.displayComment, {
            uName: this.props.userData.fullName,
            uProfile: this.props.userData.profileUrl,
            text: this.state.comment,
            uId: this.props.userData.userId,
        }];
        
        //updating comments in firebase
        let tempRef = doc(fstore, "posts", this.props.id);
        await updateDoc(tempRef, { comments: tempArr }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err);
        })
        //getting comments from the firebase
        getDocs(database.posts).then((res) => {
            let data = res.docs;
            let setData = {};
            data.forEach((ele) => {
                if (ele.id === this.props.id) {
                    setData = ele.data()['comments']
                }
            })
            return setData;
        }).then((data) => {
            console.log(data)
            this.setState({comment: "" , displayComment: data })
        })
    }

    //to show our comment at mount
    componentDidMount() {
        getDocs(database.posts).then((res) => {
            let data = res.docs;
            let setData = {};
            data.forEach((ele) => {
                if (ele.id === this.props.id) {
                    setData = ele.data()['comments']
                }
            })
            return setData;
        }).then((data) => {
            this.setState({ displayComment: data })
        })
    }

    render() {
        return (
            <div className='comment-box'>
                <button className='close-btn' onClick={() => this.props.display()}>X</button>
                <div>
                    <input placeholder='comment here' type="text" value={this.state.comment} onChange={(e) => { this.setState({ comment: e.target.value }) }} />
                    <button onClick={this.handleClick} className="cmnt-done">Comment</button>
                </div>
                <div className='comment-wrapper'>
                    {this.state.displayComment.map((ele, index) => {
                        return (
                            <div style={{ display: 'flex', alignItems: 'center' }} key={index}>
                                <Avatar src={ele.uProfile} style={{ marginLeft: "5px", marginBottom: "5px", marginRight: "5px" }} />
                                <p><span style={{ fontWeight: 'bold' }}>{ele.uName}</span>&nbsp;&nbsp;{ele.text}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
