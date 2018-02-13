import React from 'react';
import { NativeModules, AppRegistry, asset, Location, Pano, Text, View, VrButton, Image, StyleSheet, CylindricalPanel, Model} from 'react-vr';
import Button from './components/button.js';
import axios from 'axios';
import TimerMixin from 'react-timer-mixin';

const Linking = NativeModules.LinkingManager

class react_vr extends React.Component {

  constructor() { 
    super();

    this.state = { 
      items: [],
      currentItem: 1
    };

    this.styles = StyleSheet.create({
      menu: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        width: 1,
        alignItems: 'stretch',
        transform: [
          {translate: [-6.65, 5.5, -5]}
        ], 
      },
      text: { 
        fontSize: 0.15,
        textAlign: 'center',
        fontWeight: '500',
      }, 
      description: {
        fontSize: 0.30,
        textAlign: 'center',
        fontWeight: '500',
        backgroundColor: '#000',
        color: '#FFF',
        borderRadius: .50,
        paddingTop: 0.30,
        paddingBottom: 0.30,
        textAlignVertical: 'center',
        transform: [
          {translate: [-5 , 2.8, -10]}, 
        ],
      },
      button: { 
        paddingTop: 0.05,
        paddingBottom: 0.05,
        width: 1,
        marginLeft: 0.05,
        marginRight: 0.05,
        backgroundColor: '#7F0000',
        borderRadius: .15,
      },
      image: {
        borderRadius: .50,
        width: 10,
        height: 6,
        overflow: 'hidden',
        transform: [
          {translate: [-5, 3, -10]}, 
          {scale: 1}, 
          {rotateY: 0}, 
          {rotateX: 0},
          {rotateZ: 0} 
        ], 
      }
    })
  }

  previousImage() {
    if (this.state.currentItem > 1) {
      TimerMixin.setTimeout(() => { this.setState((prevState) => ({ currentItem: prevState.currentItem - 1 })) }, 500)
    }
  }

  nextImage() {
    if (this.state.currentItem < this.state.items.length) {
      TimerMixin.setTimeout(
        () => { 
          this.setState((prevState) => ({ currentItem: prevState.currentItem + 1 })) 
        },
        500
      )
    }
  }

  getContent() {
    var url = Linking.getInitialURL()
    .then((url) => {
      if (url) {
        console.log('Initial url is: ' + url);
        var vrSpaceId = url.split('?vrspace=')[1];
        console.log('VR Space Id: ' + vrSpaceId);
        if (vrSpaceId == 1) {
          axios.get(`https://jsonplaceholder.typicode.com/photos`)
            .then(res => {
              const items = res.data.slice(0, 2);
              this.setState({ items });
            })
        }
        else if (vrSpaceId == 2) {
          axios.get(`https://jsonplaceholder.typicode.com/photos`)
            .then(res => {
              const items = res.data.slice(0, 5);
              this.setState({ items });
            })
        }
      }
    })
    .catch(err => {
      console.error('An error occurred', err)
    })
  }

  componentDidMount() {
    this.getContent()
  }

  render() {
    return (
      <View>
         <View style={this.styles.menu}>
            <VrButton style={this.styles.button} onEnter={() => this.previousImage()}> 
                <Text style={this.styles.text}>
                  Vorige
                </Text> 
            </VrButton>
            <VrButton style={this.styles.button} onEnter={() => this.nextImage()}> 
                <Text style={this.styles.text}>
                  Volgende
                </Text> 
            </VrButton>
            <VrButton style={this.styles.button} onEnter={() =>  Linking.openURL("/photo-hall")}> 
                <Text style={this.styles.text}>
                  Stop 
                </Text> 
            </VrButton>
        </View>
        
          {
            this.state.items
            .map(
              item => (item.id == this.state.currentItem) 
                ? 
                <View key={this.state.currentItem}>
                  <Image style={this.styles.image} source={{uri: this.state.items[this.state.currentItem-1].url}}/>
                  <Text style={this.styles.description}>{this.state.items[this.state.currentItem-1].title}</Text>
                </View>
                :
                <View>
                </View>
              )
          }
        
        <Pano source={asset('chess-world.jpg')} />
      </View>
    );
  }
};

AppRegistry.registerComponent('react_vr', () => react_vr);