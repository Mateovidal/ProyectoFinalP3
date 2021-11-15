// import React, { Component } from 'react'
// import { Text, View, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
// import {db, auth} from "../firebase/config"


// class NewCommentForm extends Component {

//     constructor(props){
//         super(props)
//         this.state = {
//             comment:'',
//             comments:0
//         };
//     }


// //   submitComment(){
// //         db.collection("posteos").add({
// //             user: auth.currentUser.email,
// //             createdAt: Date.now(), 
// //             comentarios: [],
// //             comentario: ""
// //         })
// //         .then(() => {
// //             this.setState({
// //                comment:'', 
// //                comments: this.state.comments +1
// //             })
// //         })
// //         .catch((err) => {
// //            console.log(err)
// //         })
// //     }



//  render() {
// //     console.log(this.props.commentArray);
 
//  return (
// //       <View style={styles.formContainer}>
// //         <Text>Comentarios:</Text>
        
// //         <Text> Nuevo Comentario </Text>
// //         <TextInput
// //           onChangeText={(text) => this.setState({ comment: text})}
// //           placeholder="Add a Comment"
// //           keyboardType="default"
// //           value={this.state.comment}
// //           style={styles.multilineInput}
// //         />
       
// //         <TouchableOpacity
// //           style={styles.button}
// //           onPress={() => this.submitComment()}
// //         >
// //           <Text style={styles.textButton}> Comentar </Text>
// //         </TouchableOpacity>
// //       </View>
// )

// }

// // const styles = StyleSheet.create({
// //     formContainer:{
// //         paddingHorizontal:10,
// //         marginTop: 20,
// //     },
// //     multilineInput:{
// //         height:100,
// //         paddingVertical:15,
// //         paddingHorizontal: 10,
// //         borderWidth:1,
// //         borderColor: '#ccc',
// //         borderStyle: 'solid',
// //         borderRadius: 6,
// //         marginVertical:10,
// //     },
// //     button:{
// //         backgroundColor:'#28a745',
// //         paddingHorizontal: 10,
// //         paddingVertical: 6,
// //         textAlign: 'center',
// //         borderRadius:4, 
// //         borderWidth:1,
// //         borderStyle: 'solid',
// //         borderColor: '#28a745'
// //     },
// //     textButton:{
// //         color: '#fff'
// //     }
// // });

// export default NewCommentForm;
