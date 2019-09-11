import React from 'react';
import { Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import logo from './assets/bluecoding.png';

import DetailScreen from './pages/Detail/DetailScreen';
import HomeScreen from './pages/Home/HomeScreen';
import TrendingScreen from './pages/Trending/TrendingScreen';
import PopularScreen from './pages/Popular/PopularScreen';
import TopRatedScreen from './pages/TopRated/TopRatedScreen';
import ComingScreen from './pages/Coming/ComingScreen';

const Routes = createAppContainer(
    createStackNavigator({
        Home: {screen: HomeScreen}, 
        Detail: {screen: DetailScreen}, 
        Trending: {screen: TrendingScreen},
        Popular: {screen: PopularScreen},
        TopRated: {screen: TopRatedScreen},
        Coming: {screen: ComingScreen}
    }, {
        initialRouteName: 'Home',
        headerLayoutPreset: 'center',
        defaultNavigationOptions: {
            headerTitle: <Image source={logo} />,
            headerStyle: {
                backgroundColor: '#f5f5f5'
            }
        }
    })
);

export default Routes;