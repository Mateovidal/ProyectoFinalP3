import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {db, auth} from "../firebase/config"


class NewPostForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
        };
    }


    submitPost(){
        db.collection("posteos").add({
            user: auth.currentUser.email, 
            description: this.state.description, 
            title: this.state.title, 
            createdAt: Date.now(), 
            likes: [], 
            comentarios: [],
        })
        .then(() => {
            this.setState({
                titulo:  "",
                descripcion: "", 
            })
        })
        .catch((err) => {
           console.log(err)
        })
    }



render() {
    return (
      <View style={styles.formContainer}>
        <Text> Nuevo Post </Text>
        <TextInput
          onChangeText={(text) => this.setState({ title: text})}
          placeholder="Titulo"
          keyboardType="default"
          value={this.state.title}
          style={styles.multilineInput}
        />
        <TextInput
          onChangeText={(text) => this.setState({ description: text })}
          placeholder="Descripción"
          keyboardType="default"
          value={this.state.description}
          multiline
          style={styles.multilineInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submitPost()}
        >
          <Text style={styles.textButton}> Postear </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    multilineInput:{
        height:100,
        paddingVertical:15,
        paddingHorizontal: 10,
        borderWidth:1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical:10,
    },
    button:{
        backgroundColor:'#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745'
    },
    textButton:{
        color: '#fff'
    }
});

export default NewPostForm;
