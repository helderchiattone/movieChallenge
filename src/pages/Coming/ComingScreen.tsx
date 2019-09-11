import React from 'react';

import { View, Text, ScrollView, TouchableNativeFeedback, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';

interface State {
  coming: [];
}

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

export default class ComingScreen extends React.Component<Props, State> {

  imgUri = 'https://image.tmdb.org/t/p/w300/';
  apiKey = 'api_key=f4d4bc39d5dcff72a3d25dcc78e1d8c0';
  coming = [];
  page = 0;

  constructor(prop: any) {
    super(prop);

    this.state = ({
      coming: []
    })
  }

  componentDidMount() {
    this.setState({
      coming: []
    })

    this.loadComing();
  }

  async loadComing() {
    this.page = this.page > 10 ? 10 : this.page + 1;
    fetch('https://api.themoviedb.org/3/discover/movie?' + this.apiKey +
    '&language=en-US&sort_by=popularity.desc&primary_release_date.gte=2019-09-13&primary_release_date.lte=2020-02-01&page=' + this.page)
      .then(response => response.json())
      .then((json: any) =>{
            this.setState({coming: this.state.coming.concat(json.results)});             
        }
    )
        
  }

  render() {
    return (
        <View style={styles.category}>
          <View style={styles.header}>
            <Text style={styles.label}>All Coming</Text><Text style={styles.subLabel}>Soon</Text>
          </View>
          <FlatList
            data={this.state.coming}
            keyExtractor={(post: any) => String(post.id)}
            numColumns={2}
            onEndReached={() => {this.loadComing()}}
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