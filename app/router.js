import React, {PureComponent} from 'react'
import {BackHandler, Animated, Easing, Image,Text} from 'react-native'
import {
    createStackNavigator,
    createBottomTabNavigator,
    NavigationActions,
} from 'react-navigation'
import {
    reduxifyNavigator,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers'
import {connect} from 'react-redux'

import Loading from './pages/Loading'
import LoginPage from './pages/login/LoginPage'
import HomePage from './pages/home/HomePage'
import HomeDetailPage from './pages/home/detail/HomeDetailPage'
import MinePage from './pages/mine/MinePage'
import Touchable from "./components/Touchable";
const HomeNavigator = createBottomTabNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: ({navigation}) => (
            {
                tabBarLabel: '主页',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image style={[{width: 32, height: 32}, {tintColor: focused ? tintColor : 'gray'}]}
                           source={require('../app/assets/image/house.png')}/>)
            })
    },
    MinePage: {
        screen: MinePage,
        navigationOptions: ({navigation}) => (
            {
                tabBarLabel: '我的',
                tabBarIcon: ({focused, tintColor}) => (
                    <Image style={[{width: 32, height: 32}, {tintColor: focused ? tintColor : 'gray'}]}
                           source={require('../app/assets/image/person.png')}/>),
            }
        )
    }
});

HomeNavigator.navigationOptions = ({navigation}) => {
    const {routeName} = navigation.state.routes[navigation.state.index];
    return {headerTitle: routeName,}
};

const MainNavigator = createStackNavigator(
    {
        HomeNavigator: {screen: HomeNavigator},
        HomeDetailPage: {
            screen: HomeDetailPage,
            navigationOptions:({navigation})=>({
                headerTitle:navigation.state.params && navigation.state.params.title?navigation.state.params.title:"详情",
                headerRight:(<Touchable onPress={navigation.state.params && navigation.state.params.onPress?navigation.state.params.onPress:()=>{}}>
                    <Text>确认</Text>
                </Touchable>)
            })
        },
    },
    {
        headerMode: 'float',
    }
);

const AppNavigator = createStackNavigator(
    {
        Main: {screen: MainNavigator},
        LoginPage: {screen: LoginPage},
    },
    {
        headerMode: 'none',
        mode: 'modal',
        navigationOptions: {
            gesturesEnabled: false,
        },
        transitionConfig: () => ({
            transitionSpec: {
                duration: 300,
                easing: Easing.out(Easing.poly(4)),
                timing: Animated.timing,
            },
            screenInterpolator: sceneProps => {
                const {layout, position, scene} = sceneProps;
                const {index} = scene;

                const height = layout.initHeight;
                const translateY = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [height, 0, 0],
                });
                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index],
                    outputRange: [0, 1, 1],
                });
                return {opacity, transform: [{translateY}]}
            },
        }),
    }
);

export const routerReducer = createNavigationReducer(AppNavigator);

export const routerMiddleware = createReactNavigationReduxMiddleware(
    'root',
    state => state.router
);

const App = reduxifyNavigator(AppNavigator, 'root');

function getActiveRouteName(navigationState) {
    if (!navigationState) {
        return null
    }
    const route = navigationState.routes[navigationState.index];
    if (route.routes) {
        return getActiveRouteName(route)
    }
    return route.routeName
}

@connect(({app, router}) => ({app, router}))
class Router extends PureComponent {
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backHandle)
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backHandle)
    }

    backHandle = () => {
        const currentScreen = getActiveRouteName(this.props.router)
        if (currentScreen === 'LoginPage') {
            return true
        }
        if (currentScreen !== 'HomePage') {
            this.props.dispatch(NavigationActions.back());
            return true
        }
        return false
    };

    render() {
        const {app, dispatch, router} = this.props;
        if (app.loading) return <Loading/>;
        return <App dispatch={dispatch} state={router}/>
    }
}

export default Router
