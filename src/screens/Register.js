import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import {auth} from '../firebase/config'

 class Register extends Component {
    constructor(props){
        super(props);

        this.state={
            // name: '',
            email: '',
            password: '',
            username:""
        }
    }


    render() {
        return (
            // el en textInput, con el onchange manejamos los forms
            //le pasamos un text, ese texto se lo cmabiamos al estado del email con el set state, el cual tiene un email, y le pasamos el text
            <View>

                {/* <TextInput
                onChangeText={(text)=>this.setState({name: text})}
                placeholder = "name"
                keyboardType="name"
                />                   */}
                <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({email: text})}
                placeholder = "email"
                keyboardType="email-adress"
                />
                
        
                <TextInput
                style={styles.input}
                
                onChangeText={(text)=>
                    
                          this.setState({password: text})}
                    
                    
                   
                placeholder = "password"
                keyboardType="default"
                secureTextEntry={true}
                />
                
                <TextInput
                style={styles.input}
                onChangeText={(text)=>this.setState({username: text})}
                placeholder = "username"
                keyboardType="email-adress"
                />

                <TouchableOpacity
                style={styles.button}
                onPress={()=> this.props.register(this.state.email, this.state.password, this.state.username)}
                >
                    {this.state.password.length < 6 ?
                        Alert.alert(
                            "Invalid Password",
                            "Password must have 6+ characters",
                            [
                              {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                              },
                              { text: "OK", onPress: () => console.log("OK Pressed") }
                            ]
                          ): null}

                    <Text style={styles.textButton}
                    >Registrar</Text>

                </TouchableOpacity>

            </View>

            // el on press llama al metodo register, y le pasamos el emial y el pass, loscuales los guardamos en el estado de cada uno
        );
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    input:{
        height:20,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderStyle: 'solid',
        marginVertical:10,
        margin: 5,
        borderColor: "black",
        borderWidth: "thin",
        borderRadius: 5,
    },
    error:{
        marginBottom: 10,
        color: "#dc3545",
        fontSize: 12
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginTop: 5,
    },
    textButton:{
        color: '#fff'
    }

})


export default Register;