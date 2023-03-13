// import React, { Component } from 'react'
// import { database } from './Firebase'
// import { getDocs } from 'firebase/firestore'
// import '../Styles/ShowReels.css'
// import { BiComment } from 'react-icons/bi';
// import Like from './Like';


// export default class ShowReels extends Component {
//     constructor() {
//         super()
//         this.myref = React.createRef();
//         this.state = {
//             posts: []
//         }
//     }

//     componentDidMount() {
//         const sabArr = getDocs(database.posts);
//         sabArr.then((res) => {
//             console.log(res.docs);
//             this.setState({ posts: res.docs })
//             let a = this.myref.current;
//             console.log(a)

//         }).catch((err) => {
//             console.log(err);
//         })
//     }

//     render() {
//         return (
//             <div className='reels-container' ref={this.myref}>
//                 {
//                     this.state.posts.map((item) => {
//                         const data = item.data();
//                         return (
//                             <div key={item.id} className="single-post-container">
//                                 <video src={data.uUrl} controls id={data.pId} className="single-post">
//                                 </video>
//                                 <Like userData={this.state.user} postData={data} id={item.id} />
//                                 <BiComment size="30px" className='comment-icon' color='red' onClick={() => this.setState({ isShowComment: item.id })} />
//                                 <h3>{data.uName}</h3>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         )
//     }
// }

