import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'

export default class Product extends Component {

  static navigationOptions = ({ navigation }) => {
    return {      
      title: navigation.state.params.product.title
    }
  }

  ActivityIndicatorLoadingView () {    
    return (
      <ActivityIndicator
         color="#009688"
         size="large"
         style={styles.ActivityIndicatorStyle}
      />
    );
  }

  render() {
    const { navigation } = this.props

    let url = navigation.state.params.product.url
    const prefix = 'http://';
    if (url.substr(0, prefix.length) !== prefix){
        url = prefix + url;
    }

    return (
      <WebView
        style={styles.WebViewStyle}
        source={{ uri: url }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        renderLoading={this.ActivityIndicatorLoadingView}
        startInLoadingState={true}
      />
    )
  }
}

const styles = StyleSheet.create({
  WebViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
})