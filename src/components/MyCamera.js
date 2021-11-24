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
        // necesitamos guardar una referencia a la camara
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
        // hacemos referencia al compoennte camera, y por eso podemos ejecyutar los emtodos que ofrece el componente
        // el cuyal es takePictureAsync, cuando seejecuta el metodo devuelve una promesa
        // cuando se ejcuta el then, recibe un exito, es decir la photo
        // eaa foto la guardo en el estado, por lo que creo el estado
        this.camera.takePictureAsync()
        .then((photo) => {
            console.log(photo)
            this.setState({
                // photo va a guadrar photo, guardo un objeto, por lo que yo quiero guadrar una ruta
                // pormlo que voy a guadrar es el uri, parecido a una url
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
                // esto me da la pantalla de la camara
                  style={{ flex: 1, width: "100%" }}
                  type={Camera.Constants.Type.front}
                  // le defino al rpop ref y le digo que va a hacer una arrow function qu recibe cam como parametro
                  // enlazamos la camra con la referencia de arriba, cuando me queira referir a ese elemento, lo puedo referir como this.camera
                  // ref es una prop
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