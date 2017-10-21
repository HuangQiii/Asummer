import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    FlatList,
    TextInput,
} from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
var Geolocation = require('Geolocation');

var REQUEST_URL = 'http://restapi.amap.com/v3/geocode/regeo?';
var DATA = [
    '上海市', '宁波', '广州', '乌鲁木齐'
];
var DATAPRETEND = ['上海市', '宁波', '广州', '乌鲁木齐', '宁海', '海宁', '海南'];
var DATATEMP = [];
export default class Location extends Component {

    static navigationOptions = {
        title: '地理信息',
    };

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            data: [],
        };
    }

    componentDidMount() {
        // storage.remove({
        //     key: 'history',
        // });

        // start
        storage.load({
            key: 'history',
            autoSync: true,
            syncInBackground: true,
        }).then(ret => {
            this.setState({
                dataSource: ret,
                data: ret,
            });
        }).catch(err => {
            //显示热门
            this.setState({
                dataSource: DATA,
                data: DATA,
            });
            switch (err.name) {
                case 'NotFoundError':
                    break;
                case 'ExpiredError':
                    break;
            }
        })
        // end

        this.setState({
            data: DATA,
            dataSource: DATA,
        });
    }

    _keyExtractor = (item, index) => index;

    _renderItem = (subject) => {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        storage.save({
                            key: 'location',
                            data: subject.item,
                        });

                        storage.load({
                            key: 'history',
                            autoSync: true,
                            syncInBackground: true,
                        }).then(ret => {
                            DATATEMP = ret;
                        }).catch(err => {
                            switch (err.name) {
                                case 'NotFoundError':
                                    break;
                                case 'ExpiredError':
                                    break;
                            }
                        })

                        if (DATATEMP.indexOf(subject.item) == -1) {
                            DATATEMP.push(subject.item);
                        }

                        storage.save({
                            key: 'history',
                            data: DATATEMP,
                        });

                        var resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Home' })
                            ]
                        });

                        this.props.navigation.dispatch(resetAction);
                    }}
                >
                    <View>
                        <Text style={{ fontSize: 18, padding: 10, }}>{subject.item}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

        );
    }

    searchAndShow(text) {
        let oldAry = [...DATAPRETEND];
        let newAry = [];
        oldAry.map(function (obj, index, array) {
            if (obj.indexOf(text) != -1) {
                newAry.push(obj);
            }
        });
        this.setState({
            data: newAry,
            dataSource: newAry,
        });
    }

    _getLocation() {
        var that = this;
        Geolocation.getCurrentPosition(function (data) {
            that.fetchData('ae3f1758ab976259eb1485a08235bbc6', data.coords.longitude, data.coords.latitude);
        }, function () {
            alert('获取位置失败')
        })
    }

    fetchData(key, longitude, latitude) {
        var url = REQUEST_URL + 'output=json&location=' + longitude + ',' + latitude + '&key=' + key;
        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                this.searchAndShow(responseData.regeocode.addressComponent.province);
            });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    style={{ paddingLeft: 20, height: 40, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white', margin: 10, }}
                    onChangeText={(text) => {
                        this.searchAndShow(text);
                    }}
                    value={this.state.text}
                    underlineColorAndroid={'transparent'}
                    placeholder={'请输入关键字'}
                />
                <View style={{ flex: 1 }}>
                    <View style={[{ backgroundColor: '#eeeeee' }]}>
                        <TouchableWithoutFeedback
                            onPress={() => this._getLocation()}
                        >
                            <View>
                                <Text style={{ fontSize: 18, padding: 10, }}>定位</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <FlatList
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                        data={this.state.dataSource}>
                    </FlatList>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#FFFFFF',
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

