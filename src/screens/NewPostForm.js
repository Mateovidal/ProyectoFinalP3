import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import MyCamera from '../components/MyCamera';
import {db, auth} from "../firebase/config"


class NewPostForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            url: "",
            showCamera: true,
            username: '',
            hayFotoProp: true,
          
            
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
            photo: this.state.url,
            username: auth.currentUser.displayName
        })
        .then(() => {
            this.setState({
                titulo:  "",
                descripcion: "", 
                showCamera: true,
                title:"",
                description:"",
               
            })
        })
        .catch((err) => {
           console.log(err)
        })
    }

    onImageUpload(url) {
      this.setState({
        url: url,
        showCamera: false,
      });
    }



    render() {

      console.log(this.props)
      // si el estado esta en true, q muetsre el componente
      return this.state.showCamera ? (
        <MyCamera hayFotoProp={this.state.hayFotoProp} onImageUpload={(url) => this.onImageUpload(url)} />
      ) : (
      <View style={styles.formContainer}>
        
        <TextInput
          onChangeText={(text) => this.setState({ title: text})}
          placeholder="Caption"
          keyboardType="default"
          value={this.state.title}
          style={styles.multilineInput}
        />
        <TextInput
          onChangeText={(text) => this.setState({ description: text })}
          placeholder="Extra info"
          keyboardType="default"
          value={this.state.description}
          multiline
          style={styles.multilineInput}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submitPost()}
         
        >
          <Text style={styles.textButton}> Post </Text>
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
