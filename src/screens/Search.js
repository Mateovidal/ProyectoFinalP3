import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import {auth} from '../firebase/config'

 class Search extends Component {
    constructor(props){
        super(props);

        this.state={
            // name: '',
            searchEmail: '',
            
        }
    }

    searchMethod(emailSearch){

        this.setState(
                 {emailSearch: emailSearch.target.value},
                 ()=>this.props.filtrarUsuarios(this.state.searchEmail)
             ) 
     
             
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
   style={styles.button}
   onPress={()=> this.search(this.state.searchEmail)}
   >
        <Text style={styles.textButton}
                    >Search</Text>
                     </TouchableOpacity>
  

                    

                 
                          

      

                

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
    button:{
        backgroundColor:'#00ff00',
        paddingHorizontal: 10,
        paddingVertical: 6,
        textAlign: 'center',
        borderRadius:4, 
        borderWidth:1,
        borderStyle: 'solid',
        borderColor: '#28a745',
        marginTop: 5,
    },
    textButton:{
        color: '#fff'
    }

})


export default Search;