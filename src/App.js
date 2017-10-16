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

import Index from './Index';

export default Asummer = StackNavigator(
    {
        Index: {
            screen: Index,
            navigationOptions: ({ navigation }) => ({
                header: <View></View>,
            }),
        },
    },
    {
        navigationOptions: ({ navigation }) => ({
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