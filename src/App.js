import React, {
    Component,
} from 'react';

import {
    AppRegistry,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

import { StackNavigator, NavigationActions } from 'react-navigation';

import Home from './pages/Home';
import Location from './pages/Location';
import ViewPager from './pages/ViewPager';

export default Asummer = StackNavigator(
    {
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
        Home: {
            screen: Home,
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
        Location: {
            screen: Location,
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
        const routes = [];
        routes.push(action);
        console.log(routes);
        return {
            ...state,
            routes,
            index: routes.length - 1,
        };
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

AppRegistry.registerComponent('Asummer', () => Asummer);