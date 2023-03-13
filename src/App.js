import React, { Component } from 'react'
import Login from './Components/Login'
import './App.css'
import SignUp from './Components/SignUp'
import Main from './Components/Main'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppFire, database } from "./Components/Firebase"
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signOut } from 'firebase/auth'
import PrivateRoute from './Components/PrivateRoute'
import Header from './Components/Header'
import Profile from './Components/Profile'
import { addDoc, query, getDocs, where } from 'firebase/firestore'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./Components/Firebase"

export default class App extends Component {

    handleSignUp = (email, password, file, name) => {
        createUserWithEmailAndPassword(getAuth(AppFire), email, password)
            .then((res) => {
                let uid = res.user.uid;
                const uploadRef = ref(storage, `/users/${uid}/ProfileImage`);
                const uploadTask = uploadBytesResumable(uploadRef, file);
                const f1 = (snapshot) => {
                    // While uploading
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Upload is " + progress + "% done");
                };
                const f2 = (error) => {
                    // When error occur
                    console.log(error);
                };
                const f3 = () => {
                    // Complete upload
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            console.log(downloadURL);
                            let obj = {
                                email: email,
                                userId: uid,
                                fullName: name,
                                profileUrl: downloadURL,
                                createAt: new Date(),
                            };
                            addDoc(database.users, obj)
                                .then((refernce) => {
                                    console.log("User updated successfully");
                                    console.log(refernce);
                                    localStorage.setItem("users", JSON.stringify(obj));
                                    window.location.href = "/";
                                })
                                .catch((err) => {
                                    console.log(err);
                                    console.log("error");
                                });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
                uploadTask.on("state_changed", f1, f2, f3);
            })
    }

    handleLogin = (email, password) => {
        signInWithEmailAndPassword(getAuth(AppFire), email, password)
            .then((res) => {
                const uid = res.user.uid;
                let q = query(database.users, where("userId", "==", uid));
                getDocs(q)
                    .then((data) => {
                        const user = data.docs[0].data();
                        console.log(user)
                        localStorage.setItem("users", JSON.stringify(user));
                        window.location.href = "/";
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }).catch(() => {
                alert("Invalid Username/Password")
            })
    }

    handleSignOut = () => {
        signOut(getAuth()).then((res) => {
            window.location.href = "/login";
            localStorage.removeItem('users');
        }).catch((err) => {
            console.log(err)
        })
    }

    googleLogin = () => {
        const auth = getAuth(AppFire);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user)
                if (user.metadata.creationTime === user.metadata.lastSignInTime) {
                    let obj = {
                        email: user.email,
                        userId: user.uid,
                        fullName: user.displayName,
                        profileUrl: user.photoURL,
                        createAt: new Date()
                    }
                    addDoc(database.users, obj)
                        .then((refernce) => {
                            console.log("User updated successfully");
                            console.log(refernce);
                            localStorage.setItem("users", JSON.stringify(obj));
                            window.location.href = "/";
                        })
                } else {
                    const uid = user.uid;
                    let q = query(database.users, where("userId", "==", uid));
                    getDocs(q)
                        .then((data) => {
                            const user = data.docs[0].data();
                            localStorage.setItem("users", JSON.stringify(user));
                            window.location.href = "/";
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }).catch((error) => {
                console.log(error)
            });
    }

    

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/Login" element={<Login googleLogin={this.googleLogin} login={this.handleLogin} />} />
                    <Route path="/signup" element={<SignUp signUp={this.handleSignUp} />} />
                    <Route path='/' element={<PrivateRoute><Header signOut={this.handleSignOut} /><Main /></PrivateRoute>}></Route>
                    <Route path='/profile' element={<PrivateRoute><Header signOut={this.handleSignOut} /><Profile /></PrivateRoute>}></Route>
                </Routes>
            </BrowserRouter>
        )
    }
}
