import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
} from 'react-native';

var REQUEST_URL = '';
export default class Location extends Component {

    static navigationOptions = {
        title: '地理信息',
    };

    constructor(props) {
        super(props);
        this.state = {
            location: '上海青浦',
            weather: '阴',
            temperature: '22',
        };
    }

    componentDidMount() {
        //this.fetchData();
        this.test();
    }

    test() {
        this.setState({ location: 'china' })
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
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.navigation.dispatch({
                            key: 'ViewPager',
                            type: 'EnterToHome',
                            routeName: 'ViewPager',
                            params: {
                                op: {
                                    location: '广州',
                                    weather: '晴',
                                    temperature: '25',
                                }
                            },
                        })
                    }}
                >
                    <Text>back</Text>
                </TouchableWithoutFeedback>
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

