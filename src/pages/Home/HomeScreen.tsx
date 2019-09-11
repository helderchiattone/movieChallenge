import React from 'react';

import { View, Text, ScrollView, TouchableNativeFeedback, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

interface State {
  trending: [];
  popular: [];
  comingSoon: [];
  topRated: [];
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class HomeScreen extends React.Component<Props, State> {

  imgUri = 'https://image.tmdb.org/t/p/w200/';
  apiKey = 'api_key=f4d4bc39d5dcff72a3d25dcc78e1d8c0';
  trending = [];
  popular = [];
  comingSoon = [];
  topRated = [];

  constructor(prop: any) {
    super(prop);

    this.state = ({
      trending: [],
      popular: [],
      comingSoon: [],
      topRated: []
    })
  }

  componentDidMount() {
    this.setState({
      trending: [],
      popular: [],
      comingSoon: [],
      topRated: []
    })

    this.loadTrending();
    this.loadPopular();
    this.loadComingSoon();
    this.loadTopRated();
  }

  async loadTrending() {
    fetch('https://api.themoviedb.org/3/trending/movie/week?' + this.apiKey)
      .then(response => response.json())
      .then(json =>
        this.setState({
          trending: json.results
        }))
  }

  async loadPopular() {
    fetch('https://api.themoviedb.org/3/discover/movie?' + this.apiKey +
      '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false')
      .then(response => response.json())
      .then(json =>
        this.setState({
          popular: json.results
        }))
  }

  async loadTopRated() {
    fetch('https://api.themoviedb.org/3/discover/movie?' + this.apiKey +
      '&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000')
      .then(response => response.json())
      .then(json =>
        this.setState({
          topRated: json.results
        }))
  }

  async loadComingSoon() {
    fetch('https://api.themoviedb.org/3/discover/movie?' + this.apiKey +
      '&language=en-US&sort_by=popularity.desc&primary_release_date.gte=2019-09-13&primary_release_date.lte=2020-02-01')
      .then(response => response.json())
      .then(json =>
        this.setState({
          comingSoon: json.results
        }))
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.category}>
          <View style={styles.header}>
            <Text style={styles.label}>Trending</Text><Text style={styles.subLabel}>This Week</Text>
            <TouchableNativeFeedback onPress={() => {
                this.props.navigation.navigate('Trending');
              }}>
              <Text style={styles.textLink}>Show All</Text>
            </TouchableNativeFeedback>
          </View>
          <FlatList
            data={this.state.trending}
            keyExtractor={(post: any) => String(post.id)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Detail', { id: item.id });
              }}>
                <Image style={styles.poster} source={{ uri: this.imgUri + item.poster_path }} />
              </TouchableOpacity>
            )} />
        </View>
        <View style={styles.category}>
          <View style={styles.header}>
            <Text style={styles.label}>Popular</Text><Text style={styles.subLabel}>Movies</Text>
            <TouchableNativeFeedback onPress={() => {
                this.props.navigation.navigate('Popular');
              }}>
              <Text style={styles.textLink}>Show All</Text>
            </TouchableNativeFeedback>
          </View>
          <FlatList
            data={this.state.popular}
            keyExtractor={(post: any) => String(post.id)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Detail', { id: item.id });
              }}>
                <Image style={styles.poster} source={{ uri: this.imgUri + item.poster_path }} />
              </TouchableOpacity>
            )} />
        </View>
        <View style={styles.category}>
          <View style={styles.header}>
            <Text style={styles.label}>Coming</Text><Text style={styles.subLabel}>Soon</Text>
            <TouchableNativeFeedback onPress={() => {
                this.props.navigation.navigate('Coming');
              }}>
              <Text style={styles.textLink}>Show All</Text>
            </TouchableNativeFeedback>
          </View>
          <FlatList
            data={this.state.comingSoon}
            keyExtractor={(post: any) => String(post.id)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Detail', { id: item.id });
              }}>
                <Image style={styles.poster} source={{ uri: this.imgUri + item.poster_path }} />
              </TouchableOpacity>
            )} />
        </View>
        <View style={styles.category}>
          <View style={styles.header}>
            <Text style={styles.label}>Top Rated</Text><Text style={styles.subLabel}>Movies</Text>
            <TouchableNativeFeedback onPress={() => {
                this.props.navigation.navigate('TopRated');
              }}>
              <Text style={styles.textLink}>Show All</Text>
            </TouchableNativeFeedback>
          </View>
          <FlatList
            data={this.state.topRated}
            keyExtractor={(post: any) => String(post.id)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Detail', { id: item.id });
              }}>
                <Image style={styles.poster} source={{ uri: this.imgUri + item.poster_path }} />
              </TouchableOpacity>
            )} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  category: {
    margin: 10
  },
  header: {
    padding: 5,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center'
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 16,
    marginRight: 10
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 5
  },
  subLabel: {
    fontSize: 18
  },
  textLink: {
    fontSize: 15,
    color: '#0B0080',
    paddingBottom: 2,
    position: 'absolute',
    right: 10
  }

});