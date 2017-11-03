import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ViewPagerAndroid,
    TouchableWithoutFeedback,
} from 'react-native';
import Future from './Future'
var Geolocation = require('Geolocation');
var easyGet = require('easy-get');

var REQUEST_URL_LOCATION = 'http://restapi.amap.com/v3/geocode/regeo?';
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
                high: '',
                low: '',
            },
            dataFromUrl: '',
        };
    }

    componentDidMount() {
        storage.load({
            key: 'location',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            this.fetchData(ret);
        }).catch(err => {
            //定位
            this._getLocation();
            switch (err.name) {
                case 'NotFoundError':
                    break;
                case 'ExpiredError':
                    break;
            }
        })
    }

    _getLocation() {
        var that = this;
        Geolocation.getCurrentPosition(function (data) {
            that.fetchLocationData('ae3f1758ab976259eb1485a08235bbc6', data.coords.longitude, data.coords.latitude);
        }, function () {
            alert('获取位置失败')
        })
    }

    fetchLocationData(key, longitude, latitude) {
        var url = REQUEST_URL_LOCATION + 'output=json&location=' + longitude + ',' + latitude + '&key=' + key;
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                this.fetchData(responseData.regeocode.addressComponent.province);
            });
    }

    fetchData(ret) {
        var url = REQUEST_URL + ret
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                this.setState({
                    op: {
                        location: ret,
                        weather: responseData.data.forecast[0].type,
                        temperature: responseData.data.wendu + '℃',
                        fx: responseData.data.forecast[0].fx,
                        fl: responseData.data.forecast[0].fl,
                        high: responseData.data.forecast[0].high.slice(3, -3) + '℃',
                        low: responseData.data.forecast[0].low.slice(3, -3),
                    },
                    dataFromUrl: responseData,
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
                        {this.state.op.low}~{this.state.op.high}
                    </Text>
                    <Text style={styles.wind}>
                        {this.state.op.fx}  {this.state.op.fl}
                    </Text>
                </View>
                <View style={styles.head}>
                    <Text
                        style={{ fontSize: 22, color: '#FFFFFF', marginLeft: 15 }}
                    >
                        {this.state.op.location}
                    </Text>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigation.navigate('Location')
                        }}
                    >
                        <View>
                            <Text
                                style={{ fontSize: 12, color: '#FFFFFF', marginRight: 15 }}
                            >
                                定位
                        </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View style={{ position: 'absolute', bottom: 10, alignSelf: 'flex-end' }}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.props.navigation.navigate('Future', { dataFromUrl: this.state.dataFromUrl })
                        }}
                    >
                        <View>
                            <Text
                                style={{ fontSize: 10, color: '#FFFFFF', backgroundColor: 'gray', marginRight: 15, padding: 10, borderRadius: 40 }}
                            >
                                预测
                        </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    head: {
        width: width,
        height: 50,
        flexDirection: 'row',
        //justifyContent: 'flex-start',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.02)',
        position: 'absolute',
        top: 0

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

