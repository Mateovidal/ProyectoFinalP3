import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'

 class Register extends Component {
    constructor(props){
        super(props);

        this.state= {
            
            email: '',
            password: '',
            username:'',
           
        }
    }

 

    render() {
        return (
           
            <View>
                {this.props.error !== '' 
                ?
                <Text>Este mail ya está registrado</Text>
                :
                <></>
                }
                <TextInput
                style={styles.input}
                onChangeText={(textUsername)=>this.setState({username: textUsername})}
                placeholder = "username"
                keyboardType="default"
                />

                <TextInput
                style={styles.input}
                onChangeText={(textEmail)=>this.setState({email: textEmail})}
                placeholder = "email"
                keyboardType="email-adress"
                />
                
        
                <TextInput
                style={styles.input}
                onChangeText={(textPassword)=> this.setState({password: textPassword})}
                placeholder = "password"
                keyboardType="default"
                secureTextEntry={true}
                />
                

            { this.state.email.includes('@', '.com') &&  this.state.username.length >= 1 && this.state.password.length >= 6
            ? 
            <TouchableOpacity
                style={styles.button}
                onPress={()=> this.props.register(this.state.email, this.state.password, this.state.username)}
            >
            <Text style={styles.textButton}>Registrarme</Text>
            </TouchableOpacity>
            : <></> }

            </View>

            
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