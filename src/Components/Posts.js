import React, { Component, createRef } from 'react'
import ReactDOM from 'react-dom';
import { database } from './Firebase'
import { getDocs } from 'firebase/firestore'
import '../Styles/Posts.css';
import Like from './Like';
import { BiComment } from 'react-icons/bi';
import { Card } from '@mui/material';
import Comment from './Comment';

export default class Posts extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            user: {},
            isShowComment: false,
        }
        this.myRef = createRef();
    }
    componentDidMount() {
        getDocs(database.posts).then((res) => {
            this.setState({ posts: res.docs })
        }).catch((err) => {
            console.log(err);
        })

        const tempUser = JSON.parse(localStorage.getItem("users"));
        this.setState({ user: tempUser });
    }
    // setting a scroll feature after video finished
    handleScroll = (e) => {
        let next = ReactDOM.findDOMNode(e.target).parentNode.parentNode.nextSibling;
        if (next) {
            next.scrollIntoView();
            console.log(next.childNodes[0].childNodes)
            next.childNodes[0].childNodes[0].autoplay = true;
            e.target.muted = true;
        }
    }

    handleCmntClick = (item) =>{
        this.setState({ isShowComment: item.id })
        this.myRef.current.style.overflow = 'hidden'
    }

    handleCloseCmnt = () =>{
        this.setState({isShowComment:false});
        this.myRef.current.style.overflow = 'scroll'
    }

    render() {
        return (
            <div className='reels-container' ref={this.myRef}>
                {
                    this.state.posts.map((item) => {
                        const data = item.data();
                        return (
                            <div key={item.id} style={{ display: 'flex' }}>
                                <div className="single-post-container">
                                    <video src={data.uUrl} controls id={data.pId} className="single-post" onEnded={this.handleScroll}>
                                    </video>
                                    <Like userData={this.state.user} postData={data} id={item.id} />
                                    <BiComment size="30px" className='comment-icon' color='red' onClick={()=>this.handleCmntClick(item)} />
                                    <h3>{data.uName}</h3>
                                </div>
                                {
                                    this.state.isShowComment === item.id  && <Card className="commentModal" >
                                        <Comment postData={data} id={item.id} userData={this.state.user} display={this.handleCloseCmnt}/>
                                    </Card>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

