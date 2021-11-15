import React, {Component} from 'react'; 
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';

class Post extends Component{
constructor(props){
    super(props)
    this.state = {
        likes: 0,
        liked: false
    }
}


componentDidMount() {
    this.receiveLikes();
};

receiveLikes(){
    let likes = this.props.postData.data.likes
    //cuantos likes?
    if (likes) {
    this.setState({    
        likes: likes.length
    })  
    }
    //este usuario likeo?
    if (likes.includes(auth.currentUser.email)
    ) {
        this.setState({
        liked: true
    })
    }

}

likePost(){
    let post  = db.collection("posteos").doc(this.props.postData.id);

    post.update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })

    .then(() => {
        this.setState({
            likes: this.state.likes + 1,
            liked: true
    })
        console.log("Document successfully updated!");
    })

    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
        
        console.log('estoy likeando')

}

dislikePost(){
    let post  = db.collection("posteos").doc(this.props.postData.id);

    post.update({
        likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    })

    .then(() => {
        this.setState({
            likes: this.state.likes - 1,
            liked: false
        })
        console.log("Document successfully updated!");
    })

    .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
   
    console.log('estoy deslikeando')
    
}


render(){
    console.log(this.props.postData);
    return(
<View style={styles.container}>
  <Text>{this.props.postData.data.user}</Text>
  <Text>{this.props.postData.data.description}</Text>
  <Text>{this.state.likes}</Text>
  
  {
     !this.state.liked ?
        <TouchableOpacity style={styles.button} onPress={() => this.likePost()}>
            <Text>
                Like
            </Text>
        </TouchableOpacity>

:

<       TouchableOpacity style={styles.button} onPress={() => this.dislikePost()}>
            <Text>
                Dislike
            </Text>
        </TouchableOpacity>


  }
</View>


    )

}}
const styles = StyleSheet.create({
    container: {
        marginVertical: 15,
        shadowColor: "#ccc",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#28a745",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#28a745",
    },
    textButton: {
        color: "#fff",
    },
    modalContainer: {
        width:'100%',  
        flex: 3,
        alignSelf: 'center',
        backgroundColor: "white",
        borderColor: '#000000',
        borderRadius: 6,
        padding: 10,
        backgroundColor: '#000000'
    },
    closeModal:{
        alignSelf: 'flex-end',
        padding: 10,
        backgroundColor: '#dc3545',
        marginTop:2,
        borderRadius: 4,
    },
    modalText:{
        fontWeight: 'bold',
        color: '#ffffff'
    },
});

export default Post
//linea 47 verifica si un post ta likeado o no
// signo ! manda lo opuesto de lo que era originalmente