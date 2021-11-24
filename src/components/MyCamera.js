import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image } from 'react-native'
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
        //console.log("guardar foto en firebase");
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
                  source={{ uri: this.state.photo }}
                />
                <View>
                  <TouchableOpacity onPress={() => this.savePhoto()}>
                    <Text>Aceptar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() =>this.dontSavePhoto()}>
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
                <TouchableOpacity onPress={() => this.takePicture()}>
                  <Text>Shoot</Text>
                </TouchableOpacity>
              </>
            )}
          </>
        );
      }
    }
    
    export default MyCamera;