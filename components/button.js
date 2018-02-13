import React from 'react'; 
import { StyleSheet, Text, VrButton, } 
from 'react-vr';

export default class Button extends React.Component {
  constructor() { 
      super(); 
      this.styles = StyleSheet.create({
        button: { 
          paddingTop: 0.05,
          paddingBottom: 0.05,
          width: 1,
          marginLeft: 0.05,
          marginRight: 0.05,
          backgroundColor: '#7F0000',
          borderRadius: .15,
        }, 
        text: { 
          fontSize: 0.15,
          textAlign: 'center',
          fontWeight: '500',
        }, 
      });
    }
  render() {
    return (
        <VrButton style={this.styles.button} 
            onEnter={() => this.props.callback()}> 
            <Text style={this.styles.text}> {this.props.text} </Text> 
        </VrButton>
    );
  }
}