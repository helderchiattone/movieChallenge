import React from 'react';

import { View, Text, ScrollView, TouchableNativeFeedback, FlatList, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import Moment from 'moment';


interface State {
  movie: any;
  cast: any;
  recommended: any;
}

interface NavigationParams {
  id: number;
}

type Navigation = NavigationScreenProp<NavigationState, NavigationParams>;

interface Props {
  navigation: Navigation;
}


export default class DetailScreen extends React.Component<Props, State> {

  imgUri = 'https://image.tmdb.org/t/p/';
  apiKey = 'api_key=f4d4bc39d5dcff72a3d25dcc78e1d8c0';
  stringGenres = 'teste';
  movieId = 1;

  constructor(prop: any) {
    super(prop);

    this.state = ({
      movie: {},
      cast: [],
      recommended: []
    })

    this.movieId = this.props.navigation.getParam("id", 1);
  }

  componentDidMount() {
    this.setState({
      movie: {}
    })

    this.loadMovie();
    this.loadCast();
    this.loadRecommended();
  }
  async loadMovie() {
    fetch('https://api.themoviedb.org/3/movie/' +
      this.movieId + '?language=en-US&' + this.apiKey)
      .then(response => response.json())
      .then(json => {
        this.setState({
          movie: json
        });
      }
      )
  }

  async loadCast() {
    fetch('https://api.themoviedb.org/3/movie/' +
      this.movieId + '/credits?' + this.apiKey)
      .then(response => response.json())
      .then(json => {
        this.setState({
          cast: json.cast
        });
      }
      )
  }

  async loadRecommended() {
    fetch('https://api.themoviedb.org/3/movie/' +
      this.movieId + '/similar?' + this.apiKey + '&language=en-US&page=1')
      .then(response => response.json())
      .then(json => {
        this.setState({
          recommended: json.results
        });
      }
      )
  }

  render() {
    Moment.locale('en');
    return (
      <ScrollView>

        <View style={styles.container}>
          <View style={styles.backgroundContainer}>
            <Image style={styles.backdrop} resizeMode='cover' source={{ uri: this.imgUri + 'w400/' + this.state.movie.backdrop_path }} />
          </View>
          <View>
            <View style={styles.header}>
              <Text style={styles.title}>{this.state.movie.title}</Text>
              <Text style={styles.subtitle}>{this.state.movie.tagline}</Text>
            </View>
          </View>

          <Image style={styles.poster} source={{ uri: this.imgUri + 'w200/' + this.state.movie.poster_path }} />
        </View>


        <View style={styles.endContainer}>
          <View>
            <Text style={styles.subtitle}>{this.state.movie.vote_average} ({this.state.movie.vote_count} Reviews)</Text>
            <Text style={styles.subtitle}>{this.state.movie.runtime} mins</Text>
            <Text style={styles.subtitle}>{Moment(this.state.movie.release_date).format('MMM D, YYYY')} Released</Text>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.descTitle}>Overview</Text>
          <Text style={styles.description}>{this.state.movie.overview}</Text>
          <Text style={styles.descTitle}>Cast</Text>

          <FlatList
            data={this.state.cast}
            keyExtractor={(post: any) => String(post.id)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <View>
                <Image style={styles.avatar} source={{ uri: this.imgUri + 'w200/' + item.profile_path }} />
                <Text style={styles.castName}>{item.name}</Text>
              </View>
            )} />

          <Text style={styles.descTitle}>Recommendation</Text>

          
        </View>

        <FlatList
            data={this.state.recommended}
            numColumns={3}
            keyExtractor={(post: any) => String(post.id)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                this.props.navigation.push('Detail', {id: item.id});
              }}>
                <Image style={styles.recommended} source={{ uri: this.imgUri + 'w200/' + item.poster_path }} />
              </TouchableOpacity>
            )} />


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    alignItems: 'center'
  },
  endContainer: {
    flex: 1,
    position: 'absolute',
    alignItems: 'flex-end',
    paddingLeft: 15,
    right: 40,
    top: 135
  },
  bottomContainer: {
    padding: 30,
    paddingTop: 10
  },
  descTitle: {
    fontWeight: 'bold',
    paddingBottom: 5,
    fontSize: 22
  },
  description: {
    fontSize: 19,
    marginBottom: 10
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    margin: 10
  },
  castName: {
    width: 74,
    overflow: "hidden",
    alignItems: 'center',
    textAlign: "center",
    marginBottom: 10
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  header: {
    padding: 5,
    marginTop: 25,
    marginBottom: 15,
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center'
  },
  backdrop: {
    width: '100%',
    height: 225
  },
  recommended: {
    width: 100,
    height: 150,
    borderRadius: 16,
    margin: 10,
    marginLeft: 20,
    alignSelf: 'flex-start'
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginBottom: 20
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  subtitle: {
    color: 'white',
    fontSize: 17,
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
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