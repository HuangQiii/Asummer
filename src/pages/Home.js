import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ViewPagerAndroid,
} from 'react-native';
import Future from './Future'

var REQUEST_URL = 'http://www.sojson.com/open/api/weather/json.shtml?city=';
const { height, width } = Dimensions.get('window');
export default class Home extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params ? navigation.state.params.op.location : '去定位'}`,
    });

    constructor(props) {
        super(props);
        this.state = {
            op: {
                location: '获取失败',
                weather: '获取失败',
                temperature: '获取失败',
                fx: '',
                fl: '',
            },
        };
    }

    componentDidMount() {
        console.log('loading...')
        storage.load({
            key: 'location',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            this.fetchData(ret);
        }).catch(err => {
            //定位
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    break;
                case 'ExpiredError':
                    break;
            }
        })
    }

    fetchData(ret) {
        var url = REQUEST_URL + ret
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                console.log(url)
                this.setState({
                    op: {
                        location: ret,
                        weather: responseData.data.forecast[0].type,
                        temperature: responseData.data.wendu + '℃',
                        fx: responseData.data.forecast[0].fx,
                        fl: responseData.data.forecast[0].fl,
                    }
                });
            });
    }

    render() {
        var imgSrc = this.state.op.weather == '晴' ? require('../images/sunny.jpg') : this.state.op.weather.indexOf('雨') !== -1 ? require('../images/rain.jpg') : require('../images/yin.jpg');
        return (
            <View style={styles.container}>
                <View style={styles.pic}>
                    <Image
                        style={{ width: width, height: 0.75 * width }}
                        source={imgSrc}
                    />
                </View>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <Text style={styles.weather}>
                        {this.state.op.weather}
                    </Text>
                    <Text style={styles.instructions}>
                        {this.state.op.temperature}
                    </Text>
                    <Text style={styles.wind}>
                        {this.state.op.fx}  {this.state.op.fl}
                    </Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    pic: {
        width: width,
        height: width * 0.75,
    },
    weather: {
        fontSize: 30,
        textAlign: 'center',
    },
    instructions: {
        textAlign: 'center',
        fontSize: 18,
        color: '#333333',
        marginTop: 10,
    },
    wind: {
        textAlign: 'center',
        color: '#333333',
        marginTop: 80,
        fontSize: 10,
    }
});

