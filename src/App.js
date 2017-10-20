import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    Text,
    View,
    TouchableHighlight,
    AsyncStorage,
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';
import Storage from 'react-native-storage';

import Home from './pages/Home';
import Location from './pages/Location';
import ViewPager from './pages/ViewPager';
import Future from './pages/Future';

export default Asummer = StackNavigator(
    {

        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                header:
                <View></View>
                ,
            }),
        },
        Location: {
            screen: Location,
        },
        Future: {
            screen: Future,
            navigationOptions: ({ navigation }) => ({
                header:
                <View></View>
                ,
            }),
        },
        ViewPager: {
            screen: ViewPager,
            navigationOptions: ({ navigation }) => ({
                headerRight:
                <View style={{ flexDirection: 'row' }}>
                    <TouchableHighlight
                        onPress={() => navigation.navigate('Location')}
                    >
                        <Text
                            style={{ fontSize: 12, color: '#FFFFFF', margin: 20, }}
                        >
                            定位
                </Text>
                    </TouchableHighlight>
                </View>
                ,
            }),
        },


    },
    {
        navigationOptions: ({ navigation }) => ({
            headerTintColor: '#FFFFFF',
            herderTitleStyle: ({
                fontSize: 14,
            }),
            headerStyle: ({
                backgroundColor: 'gray',
            }),
        }),
        mode: 'modal',
        headerMode: 'float',
    }
);



const prevGetStateForAction = Asummer.router.getStateForAction;
Asummer.router.getStateForAction = (action, state) => {
    if (state && action.type === 'ReplaceCurrentScreen') {
        const routes = state.routes.slice(0, state.routes.length - 1);
        routes.push(action);
        return {
            ...state,
            routes,
            index: routes.length - 1,
        };
    }
    if (state && action.type === 'EnterToHome') {
        var routes = [];
        routes.push(action);
        console.log(routes);
        return {
            ...state,
            routes,
            index: routes.length - 1,
        };
        // NavigationActions.reset({
        //     index: 0,
        //     actions: [
        //         NavigationActions.navigate({ routeName: 'Home' })
        //     ]
        // })
    }
    if (state && action.type === 'BcakToCurrentScreen') {
        function findDateInArr(arr, propertyName, value) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][propertyName] == value) {
                    return i;
                }
            }
            return -1;
        }
        var i = findDateInArr(state.routes, 'routeName', action.routeName);
        if (i != -1) {
            var routes = state.routes.slice(0, i + 1);
        }
        return {
            ...state,
            routes,
            index: routes.length - 1,
        }
    }
    return prevGetStateForAction(action, state);
};
var storage = new Storage({
    // 最大容量，默认值1000条数据循环存储
    size: 1000,

    // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
    // 如果不指定则数据只会保存在内存中，重启后即丢失
    storageBackend: AsyncStorage,

    // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
    defaultExpires: null,

    // 读写时在内存中缓存数据。默认启用。
    enableCache: true,

    // 如果storage中没有相应数据，或数据已过期，
    // 则会调用相应的sync方法，无缝返回最新数据。
    // sync方法的具体说明会在后文提到
    // 你可以在构造函数这里就写好sync的方法
    // 或是在任何时候，直接对storage.sync进行赋值修改
    // 或是写到另一个文件里，这里require引入
    //sync: require('你可以另外写一个文件专门处理sync')
})
global.storage = storage;

AppRegistry.registerComponent('Asummer', () => Asummer);