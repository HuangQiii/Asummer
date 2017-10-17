import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Future from './Future'

var REQUEST_URL = '';
export default class Home extends Component {

    static navigationOptions = {
        title: '上海青浦',
    };

    constructor(props) {
        super(props);
        this.state = {
            op: {},
        };
    }

    componentDidMount() {
        //this.fetchData();
        this.setState({
            op: this.props.op,
        });
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextState.op != this.state.op;
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
                    {this.state.op.weather}
                </Text>
                <Text style={styles.instructions}>
                    {this.state.op.temperature}
                </Text>
                <Text style={styles.instructions}>
                    {this.state.op.location}
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

