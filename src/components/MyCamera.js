import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Camera } from 'expo-camera'
import { storage } from "../firebase/config";

class MyCamera extends Component {
    constructor(props){
        super(props)
        this.state = {

            permission: false,
            photo: "",
            hayFoto: false
        }
        this.camera
    };

    
    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> {
            this.setState({
                permission: true
            })
        })
        .catch((err)=> console.log(err))

        Camera.getAvailableCameraTypesAsync()
        .then((res) => console.log(res));

    }

    takePicture(){
        this.camera.takePictureAsync()
        .then((photo) => {
            console.log(photo)
            this.setState({
               
                photo: photo.uri,
                hayFoto: true,
            })
        })
        .catch((e) => console.log(e))
    }

    savePhoto() {
      
        fetch(this.state.photo)
       
          .then((res) => res.blob())
          .then((image) => {
            const ref = storage.ref(`photos/${Date.now()}.jpg`);

            ref.put(image).then(() => {
              ref
              .getDownloadURL()
              .then((url) => {
                this.props.onImageUpload(url);
                this.setState({
                  photo: "",
                 
                });
              });
            });
          })
          .catch((err) => console.log(err));
      }

      dontSavePhoto(){
        this.setState({
          hayFoto: false
        })

      }

    render() {
        return (
          <>
            {this.state.photo != null && this.state.hayFoto && this.props.hayFotoProp != false? (
              <>
                <Image
                  style={{ flex: 1, width: "100%" }}
                  // el uri es el source, es ek uri q nosotros teniamos en la foto
                  source={{ uri: this.state.photo }}
                />
                <View>
                  <TouchableOpacity style={styles.buttonCamera1} onPress={() => this.savePhoto()}>
                    <Text>Aceptar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.buttonCamera2} onPress={() =>this.dontSavePhoto()}>
                    <Text>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Camera
               
                  style={{ flex: 1, width: "100%" }}
                  type={Camera.Constants.Type.front}
                  ref={(cam) => (this.camera = cam)}
                />
                <TouchableOpacity style={styles.buttonCamera} onPress={() => this.takePicture()}>
                  <Text>Shoot</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        );
      }
    }
    const styles = StyleSheet.create({
      buttonCamera:{
        marginTop: 2,
        marginBottom: 2,
        color:"white",
        
        backgroundColor: "#1f5eff",
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
buttonCamera1:{
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
buttonCamera2:{
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
  
}
    });
    
    export default MyCamera;