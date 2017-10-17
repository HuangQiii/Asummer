import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ViewPagerAndroid,
} from 'react-native';
import Home from './Home';
import Future from './Future';

export default class ViewPager extends Component {

    static navigationOptions = {
        title: '上海青浦',
    };

    constructor(props) {
        super(props);
        this.state = {
            op:
            {
                location: '定位失败',
                weather: '获取天气失败',
                temperature: '获取温度失败',
            }
        };
    }

    componentDidMount() {
        if (this.props.navigation.state.params) {
            console.log(this.props.navigation.state.params.op);
            this.getParamsFromLocation(this.props.navigation.state.params.op);
        }
    }

    getParamsFromLocation(obj) {
        console.log(obj)
        this.setState({
            op: obj,
        }, () => {
            console.log(this.state.op);
        });
    }


    render() {
        return (
            <ViewPagerAndroid
                style={{ flex: 1 }}
                initialPage={0}>
                <Home op={this.state.op} />
                <Future op={this.state.op} />
            </ViewPagerAndroid>
        );
    }
}

