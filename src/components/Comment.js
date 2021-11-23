import React, { Component } from 'react'
import { Text, View } from 'react-native'


class Comment extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }
    render() {
        console.log(this.props.commentData);
        return (
            <View>
                {/* <Text>coment # {this.props.number} </Text> */}
                <Text> {this.props.commentData.user} : {this.props.commentData.comment} </Text>
            </View>
        )
    }
}

export default Comment
