import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native'
import {db, auth} from '../firebase/config'
import firebase from 'firebase';
import Post from '../components/Post'


 class Search extends Component {
    constructor(props){
        super(props);

        this.state={
            // name: '',
            searchEmail: '',
            posts: []
            
        }
    }

    filtrarUsers(){

        db.collection('posteos').where('user','==', this.state.searchEmail)
        .orderBy('createdAt', 'desc')
        .onSnapshot((docs) => {
            let posteos = []
            docs.forEach((doc) => {
                posteos.push({
                    id: doc.id,
                    data: doc.data()
                })
            })
            this.setState({
                posts: posteos
            })
        })
        
    }


    render() {
        return (
            // el en textInput, con el onchange manejamos los forms
            //le pasamos un text, ese texto se lo cmabiamos al estado del email con el set state, el cual tiene un email, y le pasamos el text
            <View>

                <TextInput
                style={styles.input}
                onChangeText={(textSearchEmail)=>this.setState({searchEmail: textSearchEmail})}
                placeholder = "Search by email"
                keyboardType="email-adress"
                />
                
    
        <TouchableOpacity
            style={styles.buttonSearch}
            onPress={()=> this.filtrarUsers(this.state.searchEmail)}
        >
            <Text style={styles.textButton}> Search</Text>
        </TouchableOpacity>

        {this.state.posts.length != 0 ? 
        <FlatList 
        data={this.state.posts}
        keyExtractor={(post) => post.id}
        renderItem={({item}) => 
            <Post
                postData={item}
            />}
        />
        :
        <Text>No hay resultados</Text>} 


            </View>

            // el on press llama al metodo register, y le pasamos el emial y el pass, loscuales los guardamos en el estado de cada uno
        );
    }
}

const styles = StyleSheet.create({
    formContainer:{
        paddingHorizontal:10,
        marginTop: 20,
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
    error:{
        marginBottom: 10,
        color: "#dc3545",
        fontSize: 12
    },
    buttonSearch:{
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
    textButton:{
        color: '#fff'
    }

})


export default Search;