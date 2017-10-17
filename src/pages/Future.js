import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

var REQUEST_URL = '';
export default class Future extends Component {

    constructor(props) {
        super(props);
        this.state = this.props.op
    }

    componentDidMount() {
        //this.fetchData();
    }

    fetchData() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    location: '',
                    weather: '',
                    temperature: '',
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.weather}>
                    {this.state.location}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    weather: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

