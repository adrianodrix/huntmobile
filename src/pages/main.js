import React, { Component } from 'react'
import api from '../services/api'

import { View, Text, Alert, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { displayName as appName } from '../../app.json'

export default class Main extends Component {
  static navigationOptions = {
    title: appName
  }

  state = {
    products: [],
    page: 1,
    productInfo: {}
  }

  componentDidMount () {
    this.loadProducts()
  }
  
  loadProducts = async (page = 1) => {
    try {
      const response = await api.get(`/products?page=${page}`)
      const { data, ...productInfo } = response.data
      this.setState({
        products: [...this.state.products, ...data],
        productInfo,
        page
      })
    } catch (err) {
      Alert(err.message)
    }
  }

  renderItem = ({ item }) => (
    <View style={ styles.productContainer }>
      <Text style={ styles.productTitle }>{ item.title } </Text>
      <Text style={ styles.productDescription }>{ item.description} </Text>
      <TouchableOpacity
        style={ styles.productButton }
        onPress={() => {
          this.props.navigation.navigate('Product', { product: item })
        }}
      >
        <Text style={ styles.productButtonText }>Acessar</Text>
      </TouchableOpacity>
    </View>
  )

  loadMore = () => {
    const { page, productInfo } = this.state

    if (!productInfo.hasNextPage) {
      return
    }

    this.loadProducts(page + 1)
  }

  render () {
    return (
      <View style={ styles.container }>
        <FlatList
          contentContainerStyle = { styles.list }
          data={this.state.products}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },

  list: {
    padding: 20
  },

  productContainer: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },

  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },

  productDescription: {
    fontSize: 16,
    color: '#999',
    marginTop: 5,
    lineHeight: 24
  },

  productButton: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#DA552F',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },

  productButtonText: {
    fontSize: 16,
    color: '#DA552F',
    fontWeight: 'bold'
  }

})
