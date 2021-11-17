import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Camera } from 'expo-camera'

class MyCamera extends Component {

    constructor(props){
        super(props)
        this.state = {
            permission: false,
            photo: ''
        }
        this.camera
    }

    takePicture(){
        this.camera.takePictureAsync()
        .then((foto) => {
            this.setState({
                photo: foto.uri,
            })
        })
        .catch((e) => console.log(e))
    }

    render() {
        return (
            <>
                <Camera 
                    style={{flex:1, width: '100%'}}
                    type={Camera.Constants.Type.front}
                    ref={(cam) => this.camera = cam}
                />
                <TouchableOpacity onPress={() => this.takePicture()} >
                    <Text>Shoot</Text>
                </TouchableOpacity>
            </>
        )
    }
}


export default MyCamera
