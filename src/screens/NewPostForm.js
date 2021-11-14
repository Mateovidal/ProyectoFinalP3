import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'

import {db, auth} from "../firebase/config"


class NewPostForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',

        }
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


    render() {
        return (
            <View>
                <TextInput
                    placeholder='Título'
                    keyboardType='default'
                    onChangeText={ text => this.setState({
                        title: text
                    })}
                    value={this.state.title}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Descripción'
                    keyboardType='default'
                    onChangeText={ text => this.setState({
                        description: text
                    })}
                    value={this.state.description}
                    multiline={true}
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button} onPress={() => console.log('post')}>
                    <Text style={styles.textButton}>
                        Postear
                    </Text>
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

export default NewPostForm;