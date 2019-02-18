import React, {Component} from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import { connect } from 'react-redux'

@connect(({ app }) => ({ ...app }))
class MinePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>MinePage</Text>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 32,
        height: 32,
    },
});
export default MinePage;