import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList, } from "react-native";
import { auth, db } from "../firebase/config";
import Post from '../components/Post'

class Profile extends Component {
  constructor(props) {
    super(props);
      this.state = { 
        posts: []
      }  
  }

  componentDidMount(){
    this.showPost()
  }

    showPost() {
      db.collection('posteos').where('user','==', auth.currentUser.email)
      .orderBy('createdAt', 'desc')
      // .limit(2)
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
      console.log(this.state.posts);
        return (
          <View>
            <Text> Email usuario: {auth.currentUser.email} </Text>
            <Text> Fecha de creación: {auth.currentUser.metadata.creationTime} </Text>
            <Text> Última sesión: {auth.currentUser.metadata.lastSignInTime} </Text>
            
            <Text>Mis Posteos</Text>
        
            {/* flatlist para mostrar posteos */}
            <FlatList 
                    data={this.state.posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({item}) => 
                    <Post
                        postData={item}
                    />}
                />
              
        
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.logout()}
            >
              <Text style={styles.textButton}> Cerrar sesión </Text>
            </TouchableOpacity>
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
        button: {
          backgroundColor: "red",
          paddingHorizontal: 10,
          paddingVertical: 6,
          textAlign: "center",
          borderRadius: 4,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "red",
        },
        textButton: {
          color: "#fff",
        },
      });
    
export default Profile;
