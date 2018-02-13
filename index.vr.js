import React from 'react';
import { NativeModules, AppRegistry, asset, Pano, Text, View, VrButton, Image, StyleSheet, CylindricalPanel, Model} from 'react-vr';
import Button from './components/button.js';
// import GazeButton from 'react-vr-gaze-button'

class react_vr extends React.Component {

  constructor() { 
    super();

    this.state = { 
      rotation: 0,
      zoom: -10
    };

    this.styles = StyleSheet.create({
      menu: {
        flex: 1,
        flexDirection: 'row',
        width: 1,
        alignItems: 'stretch',
        transform: [{translate: [-1.65, 2, -5]}], 
      }
    })
  }

  render() {
    const Linking = NativeModules.LinkingManager
    return (
      <View>
         <View style={this.styles.menu}>
            <Button 
              text='ZOOM IN' 
              callback={() => this.setState((prevState) => ({ zoom: prevState.zoom+5 }))} />
            <Button 
              text='ZOOM UIT' 
              callback={() => this.setState((prevState) => ({ zoom: prevState.zoom-5 }))} />
            <Button 
              text='STOP'
              callback={() => Linking.openURL("/photo-hall")} />
        </View>
        <View>
          <Image 
            style={{
              width: 10,
              height: 6,
              transform: [
                {translate: [-5, 3, this.state.zoom]}, 
                {scale: 1}, 
                {rotateY: this.state.rotation}, 
                {rotateX: 0},
                {rotateZ: 0} 
              ], 
            }} 
            source={asset('Lakenhallen01.jpg')} 
            lit={true} />
          </View>
        {/*<Pano source={asset('chess-world.jpg')} />*/}
      </View>
    );
  }
};

AppRegistry.registerComponent('react_vr', () => react_vr);