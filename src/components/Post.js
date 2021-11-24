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
    // this.filtrarLikes()
};


receiveLikes(){
    let likes = this.props.postData.data.likes;
    if (likes) {
        this.setState({
            likes: likes.length
        })
    }
    if (likes.includes(auth.currentUser.email)) {
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
        // console.log(this.state.likes);
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
           
           {this.props.postData.data.user == auth.currentUser.email
            ? 
           <Text style={styles.usernameMe}>{this.props.postData.data.username}</Text>
        :
        <Text style={styles.usernameNotMe}>{this.props.postData.data.username}</Text>
        }
            
            <Image style={styles.foto}
            source={this.props.postData.data.photo}></Image>
            <Text>{this.props.postData.data.title}</Text>
            <Text>{this.props.postData.data.description}</Text>
            <Text>{this.state.likes}</Text>
            
        
        { this.props.postData.data.user == auth.currentUser.email ?   <TouchableOpacity style={styles.borrarButton} onPress={() => this.deletePost()}>
                          <Text style={styles.textButton}> Borrar Post</Text>
                      </TouchableOpacity>

                      :

                      <></>}
      
        {
            !this.state.liked ?
        <TouchableOpacity style={styles.buttonLike} onPress={() => this.likePost()}
                                                // onPress={() => this.filtrarLikes()}
                                                >
            <Text style={styles.textButton}>Like</Text>
        </TouchableOpacity>
        
        :

        <TouchableOpacity style={styles.buttonDislike} onPress={() => this.dislikePost()}>
            <Text style={styles.textButton}>Dislike</Text>
        </TouchableOpacity>
        }

        <TouchableOpacity style={styles.buttonComment} onPress={() => this.openModal()}>
            <Text style={styles.textButton}>Comments</Text>
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
    usernameMe:{
        
        color:"#15d47e",
        textAlign: "center",
        

    },
    usernameNotMe:{
        color:"#d6a913",
        textAlign: "center",
       

    },
    modal:{height:300,
    width:400}
    ,
    
    foto:{width: 300,
        height: 300,
        alignSelf: 'center',
        borderRadius: 5
    },
    container: {
        borderColor: "black",
        borderWidth: 2,
        backgroundColor:"#fffbeb",
        width: 330,
        height:500,
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
    buttonLike: {
        marginTop: 2,
        marginBottom: 2,
        color:"white",
        
        backgroundColor: "#0ed907",
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
    buttonDislike: {
        marginTop: 2,
        marginBottom: 2,
        color: "#ccc",
        backgroundColor: "#d41743",
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: "center",
        borderRadius:20,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        width: 100,
        alignSelf: "center"
        
    },
    buttonComment: {
        marginTop: 2,
        marginBottom: 2,
        backgroundColor: "#24b2ff",
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
    borrarButton:{
        marginTop: 2,
        marginBottom: 2,
        alignSelf: 'center',
        backgroundColor: "red",
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
    textButton: {
        color: "white",
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
        width: 100,
        alignSelf: "center"
    },
    modalText:{
        fontWeight: 'bold',
        color: '#ffffff'
    },
});

export default Post
//linea 47 verifica si un post ta likeado o no
// signo ! manda lo opuesto de lo que era originalmente
