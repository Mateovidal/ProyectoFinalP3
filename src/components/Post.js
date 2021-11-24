import React, {Component} from 'react'; 
import { Text, View, TextInput, TouchableOpacity, StyleSheet,Modal, ActivityIndicator, FlatList, Image } from "react-native";
import { db, auth } from "../firebase/config";
import firebase from 'firebase';
import NewCommentForm from '../screens/NewCommentForm';

class Post extends Component{
constructor(props){
    super(props)
    this.state = {
        likes: this.props.postData.data.likes,
        liked: false,
        showModal: false,
        comentarios: 0,
    }
}

componentDidMount() {
    this.receiveLikes();
    // this.receiveComments();
    console.log(this.props.postData)
    this.filtrarLikes()
};


receiveLikes(){
    // let likes = this.props.postData.data.likes
    //cuantos likes?
    if (this.state.likes) {
    this.setState({    
        likes: this.state.likes.length
    })  
    }
    

}

likePost(){
    let post  = db.collection("posteos").doc(this.props.postData.id);

    post.update({
        likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    })

    .then(() => {
        // console.log(this.state.likes);
        this.setState({
            likes: this.state.likes,
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
            likes: this.state.likes,
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
    // filtrarLikes(){

    //     db.collection('posteos').doc(this.props.postData.id).where('likes','==', auth.currentUser.email)
    //     .onSnapshot((docs) => {
    //         this.setState({
    //             liked: true
    //         })
    //     })
    //     console.log(this.state.liked);
    // }

openModal() {
    this.setState({
        showModal: true
    })
}

closeModal() {
    this.setState({
        showModal: false
    })
}

deletePost(){
//    console.log(this.props.postData);
   db.collection("posteos").doc(this.props.postData.id).delete();
}
render(){
    console.log(this.state.likes);
    return(
        <View style={styles.container}>
           
            <Text>{this.props.postData.data.username}</Text>
            <Image style={styles.foto}
            source={this.props.postData.data.photo}></Image>
            <Text>{this.props.postData.data.title}</Text>
            <Text>{this.props.postData.data.description}</Text>
            <Text>{this.state.likes}</Text>
            
        
        { this.props.postData.data.user == auth.currentUser.email ?   <TouchableOpacity style={styles.borrarButton} onPress={() => this.deletePost()}>
                          <Text > Borrar Post</Text>
                      </TouchableOpacity>

                      :

                      <></>}
      
        {
            !this.state.liked ?
        <TouchableOpacity style={styles.button} onPress={() => this.likePost()}
                                                // onPress={() => this.filtrarLikes()}
                                                >
            <Text>Like</Text>
        </TouchableOpacity>
        
        :

        <TouchableOpacity style={styles.button} onPress={() => this.dislikePost()}>
            <Text>Dislike</Text>
        </TouchableOpacity>
        }

        <TouchableOpacity style={styles.button2} onPress={() => this.openModal()}>
            <Text>Add Comment</Text>
        </TouchableOpacity>

        {
        !this.state.showModal ?
        null 
        :
        <Modal
        style={styles.modal}
        animationType="slide"
        transparent={false}
        visible={this.state.showModal}>
            <TouchableOpacity style={styles.button2} onPress={() => this.closeModal()}>
                <Text>X</Text>
            </TouchableOpacity>

            <NewCommentForm 
            
            postData={this.props.postData}/>
        </Modal> 
        }
        </View>
    )

}}
const styles = StyleSheet.create({
    modal:{height:300,
    width:400}
    ,
    borrarButton:{
        alignSelf: 'center',
        backgroundColor: "red",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        width:400,
      },
    foto:{width: 300,
        height: 300,
        alignSelf: 'center',
        borderRadius: 5
    },
    container: {
        width: 400,
        height:800,
        alignSelf: 'center',
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
    button2: {
        backgroundColor: "#0000ff",
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
