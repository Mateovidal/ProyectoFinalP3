import React, { Component } from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from "@react-navigation/native";
import {auth} from '../firebase/config'

import Home from '../screens/Home';
import Login from '../screens/Login';
import Register from '../screens/Register';

// es para la configuracion
const Drawer = createDrawerNavigator();

class Menu extends Component {

    constructor(){
        super();
        this.setState= {
            loggedIn: false,
            userData: {},
        };
    }


// no tenemos forma de pasarle la info del usuario al componente de perfil, si lo twngo en menu le peudo vargar la user data en un estado, 


        // recibimos email y pass
register(email, password){

    // recibe el email y el pass va a fb y lo agrega
    auth
    .createUserWithEmailAndPassword(email, password)
    .then((userData)=> console.log(userData))
    .catch ((err)=> console.log(err))
}


    render(){
        return (

        // contenedor de toda la navegacion

        // le pasamos por prop a un componente el metodo con arrow function

            
            <Drawer.Navigator>
                <Drawer.Screen name="Home" component={()=> <Home/>} />
                <Drawer.Screen name="Login" component={()=> <Login/>}/>
                <Drawer.Screen name="Register" component={()=> <Register register={(email, password)=> this.register(email, password)}/>}/>
            </Drawer.Navigator>
           
        );

    }
}

export default Menu;