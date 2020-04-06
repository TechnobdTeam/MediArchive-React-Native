
// React native and others libraries imports
import React, { Component } from 'react';
import { Header, Body, Title, Left, Right, Icon } from 'native-base';

import AppConstant from './AppConstant';
import Color from './Colors'

export default class Navbar extends Component {
  render() {
    return(
      <Header
        style={{backgroundColor: Color.color_theme,}}
        backgroundColor={AppConstant.THEME_COLOR}
        androidStatusBarColor={AppConstant.THEME_COLOR}
        noShadow={true}
        >
        {this.props.left ? this.props.left : <Left style={{flex: 1, }} />}
        <Body style={styles.body}>
          <Title style={styles.title}>{this.props.title}</Title>
        </Body>
        {this.props.right ? this.props.right : <Right style={{flex: 4}} />}
      </Header>
    );
  }
}

const styles={
  body: {
    flex:3,
    justifyContent: 'flex-start',
    alignItems: 'center',    
    },
  title: {
    fontWeight: 'normal',
    alignItems: 'center',
    color:'white'
  }
};
