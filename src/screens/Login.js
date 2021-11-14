import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, } from "react-native";

 class Login extends Component {
     
    constructor(props){
        super(props);
        this.state= {

            email: '', 
            password: '' ,
            loggedIn: false,
            
        }
    }

    render() {
        return (
            <View>
            <Text> {this.props.error} </Text>
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ email: text })}
              placeholder="email"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              onChangeText={(text) => this.setState({ password: text })}
              placeholder="password"
              keyboardType="email-address"
              secureTextEntry={true}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.login(this.state.email, this.state.password)}
            >
              <Text style={styles.textButton}>Login</Text>
            </TouchableOpacity>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#28a745",
      paddingHorizontal: 10,
      paddingVertical: 6,
      textAlign: "center",
      borderRadius: 4,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#28a745",
      marginTop: 5,
    },
    textButton: {
      color: "#fff",
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
})


export default Login;