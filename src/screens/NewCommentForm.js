import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import {db, auth} from "../firebase/config"
import firebase from 'firebase';

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
    let post  = db.collection("posteos").doc(this.props.commentData.id);

    post.update({
        comentarios: firebase.firestore.FieldValue.arrayUnion(this.state.comment)
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
    
//  console.log(this.props.commentData.data);
 return (
      <View style={styles.formContainer}>
        
        <Text> Comentarios: {this.state.comments} </Text>
        <FlatList
                data={this.state.comentarios}
                keyExtractor={(comment) => comment.id}
                renderItem={({item}) => 
                    <Comment
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
