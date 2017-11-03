import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ViewPagerAndroid,
    TouchableHighlight,
    FlatList,
} from 'react-native';
var easyGet = require('easy-get');

var REQUEST_URL = 'http://www.sojson.com/open/api/weather/json.shtml?city=';
const { height, width } = Dimensions.get('window');
export default class Future extends Component {

    constructor(props) {
        super(props);
        this.state = {
            op: [],
        };
    }

    componentDidMount() {
        var op = [];
        op = easyGet.easyGet(this.props.navigation, "state.params.dataFromUrl.data.forecast")
        if (!op) {
            op = []
        }
        this.setState({
            op: op,
        }, () => {
            console.log(this.state.op);
        })
    }

    _renderItem = (subject) => {
        return (
            <View style={styles.container}>
                <View style={styles.data}>
                    <Text style={{ fontSize: 30, padding: 0, }}>{subject.item.date.slice(0, -4)}</Text>
                    <Text style={{ fontSize: 10, padding: 0, }}>{subject.item.date.slice(-3)}</Text>
                </View>
                <View style={styles.weather}>
                    <View style={{ width: width * 0.2, alignSelf: 'flex-start', }}>
                        <Text style={{ fontSize: 20, padding: 15, }}>{subject.item.type}</Text>
                    </View>
                    <View style={{ width: width * 0.35 }}>
                        <Text style={{ fontSize: 16, padding: 10, }}>{subject.item.low.slice(3, -3)}-{subject.item.high.slice(3)}</Text>
                    </View>
                    <View style={{ width: width * 0.2, alignSelf: 'flex-end', }}>
                        <Text style={{ fontSize: 10, padding: 5, }}>{subject.item.fx}-{subject.item.fl}</Text>
                    </View>
                </View>

            </View>

        );
    }

    _separator = () => {
        return <View style={{ height: 1, backgroundColor: '#f2f2f2' }} />;
    }

    _keyExtractor = (item, index) => index;

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ItemSeparatorComponent={this._separator}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    data={this.state.op}>
                </FlatList>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        //alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        height: height / 6,
    },
    data: {
        width: width * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weather: {
        flex: 1,
        backgroundColor: '#dddddd',
        flexDirection: 'row',
        alignItems: 'center',
    },
});

