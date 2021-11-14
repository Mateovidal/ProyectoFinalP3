import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {db, auth} from "../firebase/config"


class NewPostForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            titulo: '',
            descripcion: '',
        };
    }

    // db.collection('posts').add({

    //     owner: auth.currentUser.email,
    //     descripcion: this.state.descripcion,
    //     createadAt: Date.now()
    // })
    // .then()
    // .catch( e => console.log(e))

    // db.collection('posts').onSnapshot(
    //     docs =>{
    //         let posts = []
    //         docs.forEach( doc => {
    //             console.log(doc);
    //             posts.push({
    //                 id: doc.id,
    //                 data: doc.data()
    //             })
    //         })
    //         this.setState({
    //             posteos: posts,
    //             loading: false
    //         })
    //     }
    // )

    submitPost(){
        db.collection("posteos").add({
            user: auth.currentUser.email, 
            descripcion: this.state.descripcion, 
            titulo: this.state.titulo, 
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

//     render() {
//         return (
//             <View>
//                 <TextInput
//                     placeholder='Título'
//                     keyboardType='default'
//                     onChangeText={ text => this.setState({
//                         title: text
//                     })}
//                     value={this.state.title}
//                     style={styles.input}
//                 />
//                 <TextInput
//                     placeholder='Descripción'
//                     keyboardType='default'
//                     onChangeText={ text => this.setState({
//                         description: text
//                     })}
//                     value={this.state.description}
//                     multiline={true}
//                     style={styles.input}
//                 />
//                 <TouchableOpacity style={styles.button} onPress={() => console.log('post')}>
//                     <Text style={styles.textButton}>
//                         Postear
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     }
// }

render() {
    return (
      <View style={styles.formContainer}>
        <Text> Nuevo Post </Text>
        <TextInput
          onChangeText={(text) => this.setState({ titulo: text})}
          placeholder="Titulo"
          keyboardType="default"
          value={this.state.titulo}
          style={styles.multilineInput}
        />
        <TextInput
          onChangeText={(text) => this.setState({ descripcion: text })}
          placeholder="Descripción"
          keyboardType="default"
          value={this.state.descripcion}
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
