import React, { Component } from 'react'
import { Text, View } from 'react-native'

class Comment extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        console.log(this.props.commentData.data);
        return (
            <View>
                {/* <Text>{this.props.commentNumber}</Text> */}
                <Text> hola</Text>
            </View>
        )
    }
}

export default Comment
