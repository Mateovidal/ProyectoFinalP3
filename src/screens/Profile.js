import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet, FlatList, } from "react-native";
import { auth, db } from "../firebase/config";
import Post from '../components/Post'

class Profile extends Component {
  constructor(props) {
    super(props);
      this.state = { 
       posts:[]
      }  
  }

  componentDidMount(){
    this.showPost()
    console.log(this.state.posts);
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
          <View style={styles.container}>
            
            <Text style={styles.info1}> ¡Welcome {this.props.userdata}! </Text>
            <Text> </Text>
            <Text style={styles.infoProfile}> Your email is: {auth.currentUser.email} </Text>
            <Text style={styles.infoProfile}> Your account was created {auth.currentUser.metadata.creationTime} </Text>
            <Text style={styles.infoProfile}> You last login was {auth.currentUser.metadata.lastSignInTime} </Text>
            <Text> </Text>
            <TouchableOpacity
              style={styles.buttonLogout}
              onPress={() => this.props.logout()}
            >
              <Text style={styles.textButton}> Log Out </Text>
            </TouchableOpacity>
            <Text> </Text>
            
            <Text style={styles.infoProfile}>You have posted {this.state.posts.length} posts already! Keep it up!</Text>
            <Text style={styles.infoProfile}> Your posts so far:</Text>
            {/* flatlist para mostrar posteos */}
            <FlatList 
                    style = {styles.infoProfile}
                    data={this.state.posts}
                    keyExtractor={(post) => post.id}
                    renderItem={({item}) => 
                    
                    <View>
                  
                      <Post
                      deletePost={(id)=> this.deletePost(id)}
                      userdata={this.props.userdata}
                        postData={item}
                      />
                    </View>}
                />
              
              
            
            
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
      info1: {
        fontSize:"large",
        alignSelf:"center",
        fontWeight: 'bold',
    },
      container:{backgroundColor: "#f5f5f5"},
      buttonLogout: {
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
      infoProfile:{
        alignSelf: 'center',
        textDecorationColor: 'blue',
        textAlign: "center",
      },
      
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
