import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import {db, auth} from "../firebase/config"
import firebase from 'firebase';
import Comment from '../components/Comment';

class NewCommentForm extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            comment:'',
            comments:0,
            comentarios:[]
        }
    }


  submitComment(){
    let post  = db.collection("posteos").doc(this.props.postData.id);

    post.update({
        comentarios: firebase.firestore.FieldValue.arrayUnion({
            user: auth.currentUser.email,
            comment: this.state.comment,
            createdAt: Date.now(),
            //id: this.props.postData.data.comentarios.length + auth.currentUser.email

            }
            )
    })

    .then(() => {
        this.setState({
            comments: this.state.comments + 1,
          
        })
        console.log("Document successfully updated!");
    })

    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
   
    console.log('estoy comentando')
    
    }

    



 render() {
    
 console.log(this.props.postData.data);
 return (
      <View style={styles.formContainer}>
        
        <Text> Comentarios: {this.props.postData.data.comentarios.length} </Text>
        <FlatList
                data={this.props.postData.data.comentarios}
                keyExtractor={(comment) => comment.createdAt}
                renderItem={({item}) => 
                    <Comment
                    number={this.props.postData.data.comentarios.length}
                    commentData={item}
                    />}
        />
        <Text> Nuevo Comentario </Text>
        <TextInput
          onChangeText={(text) => this.setState({ comment: text})}
          placeholder="Add a Comment"
          keyboardType="default"
          value={this.state.comment}
          style={styles.multilineInput}
        />
       
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submitComment()}
        >
          <Text style={styles.textButton}> Comentar </Text>
        </TouchableOpacity>
      </View>
)

}}

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

export default NewCommentForm;
