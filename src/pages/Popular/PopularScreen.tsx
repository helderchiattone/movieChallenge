import React from 'react';

import { View, Text, ScrollView, TouchableNativeFeedback, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

interface State {
  popular: [];
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class PopularScreen extends React.Component<Props, State> {

  imgUri = 'https://image.tmdb.org/t/p/w300/';
  apiKey = 'api_key=f4d4bc39d5dcff72a3d25dcc78e1d8c0';
  popular = [];
  page = 0;

  constructor(prop: any) {
    super(prop);

    this.state = ({
      popular: []
    })
  }

  componentDidMount() {
    this.setState({
      popular: []
    })

    this.loadPopular();
  }

  async loadPopular() {
    this.page = this.page > 10 ? 10 : this.page + 1;
    fetch('https://api.themoviedb.org/3/discover/movie?' + this.apiKey +
    '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + this.page)
      .then(response => response.json())
      .then((json: any) =>{
            this.setState({popular: this.state.popular.concat(json.results)});             
        }
    )
        
  }

  render() {
    return (
        <View style={styles.category}>
          <View style={styles.header}>
            <Text style={styles.label}>All Popular</Text><Text style={styles.subLabel}>Movies</Text>
          </View>
          <FlatList
            data={this.state.popular}
            keyExtractor={(post: any) => String(post.id)}
            numColumns={2}
            onEndReached={() => {this.loadPopular()}}
            onEndReachedThreshold={0.5}            
            showsVerticalScrollIndicator={true}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Detail', { id: item.id });
              }}>
                <Image style={styles.poster} source={{ uri: this.imgUri + item.poster_path }} />
              </TouchableOpacity>
            )} />
        </View>
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
    width: 180,
    height: 270,
    borderRadius: 16,
    margin: 9
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