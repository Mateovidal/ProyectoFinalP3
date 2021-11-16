import React, { Component } from 'react'
import { Text, View } from 'react-native'

class Comment extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.commentNumber}</Text>
                <Text> {this.props.commentData.data} </Text>
            </View>
        )
    }
}

export default Comment
