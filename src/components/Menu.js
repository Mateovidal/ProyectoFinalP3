import React, { Component } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import {auth} from '../firebase/config'

import {Alert} from "react-native"
import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Search from '../screens/Search';
import Profile from '../screens/Profile'
import NewPostForm from "../screens/NewPostForm";

// es para la configuracion
const Drawer = createDrawerNavigator();

class Menu extends Component {

    constructor(props){
        super(props);
        this.state= {
            loggedIn: false,
            userData: {},
            error: '',
            username:'',
            emailSearch: '',
            usuarios: [],
            usuariosBuscados: [],
            resultadosSearch:false
        };
    }

    componentDidMount(){
        auth.onAuthStateChanged((user) => {
            if (user !== null) {
                this.setState({
                    loggedIn: true,
                    userData: user
                })
            } else{
                this.setState({
                    loggedIn: false, 
                })
            }
        })
    }


// no tenemos forma de pasarle la info del usuario al componente de perfil, si lo twngo en menu le peudo vargar la user data en un estado, 


    // recibimos email y pass

    register(email, password, username) {
       
    
    
       auth
            .createUserWithEmailAndPassword(email, password)
            .then(res => {
                res.user.updateProfile({
                    displayName:  username })
            })
            .then((userData) => {
                this.setState({
                    loggedIn: true, 
                    userData: userData.user, 
                })
            })
            
            .catch((err) => {
                this.setState({
                    error: err.message
                })
            })

        
        
        
       
        
    }

    login(email, password) {
        auth
        .signInWithEmailAndPassword(email, password)
        .then((userData) => {
            this.setState({
                loggedIn: true, 
                userData: userData.user,
            })
        })
        .catch((err) => {
            this.setState({
                error: err.message
            })
        })
    }

    logout(){
        auth.signOut()
        .then(()=> {
            this.setState({
                loggedIn: false,
                userData: '',
            })
        })
        .catch((err) => {
            this.setState({
                error: err.message
            })
        })
    }



    render(){
        console.log(this.state.userData);
        return(
            <NavigationContainer independent={true}> 
                {/*se puede componentizar el NavigationContainer en app*/}
                <Drawer.Navigator>
                    {(this.state.loggedIn === false) ? (
                        <>
                        <Drawer.Screen name="Register" component={() => <Register 
                                                                                error={this.state.error} 
                                                                                register={(email, pass, username ) => this.register(email,pass, username)} />} 
                            /> 
                            <Drawer.Screen name="Login" component={() => <Login  
                                                                            error={this.state.error}   
                                                                            login={(email, pass) => this.login(email,pass)}/>}
                            /> 
                            
                        </>
                    ):(
                        <>
                            <Drawer.Screen name="Home" component={()=> <Home />}/>
                            <Drawer.Screen name="New Post" component={()=> <NewPostForm/>}/>
                            <Drawer.Screen name="Mi Perfil" component={() => <Profile logout={() => this.logout()} userdata={this.state.userData.displayName}/>} />
                            <Drawer.Screen name="Search" component={() => <Search />} 
                            /> 
                        </>
                            
                    )
                    }
                </Drawer.Navigator>
            </NavigationContainer>
        )
    }


}

export default Menu;