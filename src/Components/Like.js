import React, { Component } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { updateDoc, doc } from 'firebase/firestore';
import { fstore } from './Firebase';

export default class Like extends Component {
    constructor(props) {
        super(props)
        this.state = {
            like: false,
            likeCount : this.props.postData.likes.length
        }
    }
    handleLike = () => {
        if (this.state.like === true) {
            let tempArr = this.props.postData.likes.filter((el) => el !== this.props.userData.userId);
            let tempRef = doc(fstore, "posts", this.props.id);
            updateDoc(tempRef, { likes: tempArr }).then((res) => {
                console.log(res);
                this.setState({ like: false });
                this.setState({likeCount : this.state.likeCount-1})
            }).catch((err) => {
                console.log(err);
            })
        } else {
            let tempArr = [...this.props.postData.likes, this.props.userData.userId];
            let tempRef = doc(fstore, "posts", this.props.id);
            updateDoc(tempRef, { likes: tempArr }).then((res) => {
                console.log(res);
                this.setState({ like: true });
                this.setState({likeCount : this.state.likeCount+1})
            }).catch((err) => {
                console.log(err);
            })
            // [1,2,3,5]
        }
    }
    componentDidMount() {
        let check = this.props.postData.likes.includes(this.props.userData.userId) ? true : false;
        this.setState({ like: check });
        
    }
    
    render() {
        // Why writing in render?
        // Render functions runs everytime when component mounts as well as component updates

        return (
            <div className='like-icon' onClick={this.handleLike}>
                <div className='like-icon'>
                    <div className='wrapper-like'>
                        <span>
                            {
                                this.state.like === true ? <AiFillHeart size="30px" color='red' /> : <AiOutlineHeart size="30px" className='like-icon' color='red' />
                            }
                        </span>
                        <p>{this.state.likeCount}</p>
                    </div>
                </div>
            </div>
        )
    }
}