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
           

            }
            )
    })

    .then(() => {
        this.setState({
            comments: this.state.comments + 1,
            comment: ""
          
        })
        console.log("Document successfully updated!");
    })

    .catch((error) => {
        
        console.error("Error updating document: ", error);
    });
   
    console.log('estoy comentando')
    
    }

    



 render() {
    
 console.log(this.props.postData.data);
 return (
      <View style={styles.formContainer}>
        
        <Text> Comments: {this.props.postData.data.comentarios.length} </Text>
       
        {this.props.postData.data.comentarios.length == 0 ?
        <>
        <Text>¡There are no comments on this post yet!</Text>
        <Text> Be the first one to comment!</Text>
        </>
        :
        <FlatList
        data={this.props.postData.data.comentarios}
        keyExtractor={(comment) => comment.createdAt.toString()}
        renderItem={({item}) => 
            <Comment
            number={this.props.postData.data.comentarios.length}
            commentData={item}
            />}
/>
    
    }
    <Text> </Text>
        <Text> New Comment: </Text>
        <TextInput
          onChangeText={(text) => this.setState({ comment: text})}
          placeholder="Add a Comment"
          keyboardType="default"
          value={this.state.comment}
          style={styles.multilineInput}
        />
<Text> </Text>
        {this.state.comment == '' 
        ? <></> 
        :
        <TouchableOpacity
        style={styles.buttonSendComment}
        onPress={() => this.submitComment()}
      >
        <Text > Comment </Text>
        </TouchableOpacity>
        }
       

      </View>
)

}}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
    },
    buttonSendComment: {
        marginTop: 2,
        marginBottom: 2,
        color:"white",
        
        backgroundColor: "#02fa97",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        width: 100,
        alignSelf: "center"
        
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
