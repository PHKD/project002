<template>
  <div>
    <v-row>
      <v-col cols="12">
        Search:<v-text-field v-model="product.search" @input="searchProductInList" />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="product.color"
          label="Select color"
          outlined
          :items="colorList"
          item-text="label"
          item-value="value"
          @change="searchProductInList"
        />
      </v-col>
      <v-col cols="6">
        <v-select
          v-model="product.price"
          label="Select price range"
          outlined
          :items="priceList"
          item-text="label"
          item-value="value"
          @change="searchProductInList"
        />
      </v-col>
      <v-col cols="12">
        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="productList"
          item-key="id"
          show-select
          class="elevation-1"
          @input="selectProductItem()"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductList',
  data () {
    return {
      product: {
        search: '',
        color: '',
        price: ''
      },
      colorList: [
        { id: 0, label: 'ไม่ระบุ', value: '' },
        { id: 1, label: 'red', value: 'red' },
        { id: 2, label: 'black', value: 'black' }
      ],
      priceList: [
        { id: 0, label: 'ไม่ระบุ', value: '' },
        { id: 1, label: '0 - 100', value: '&price_gte=0&price_lte=100' },
        { id: 2, label: '100 - 200', value: '&price_gte=100&price_lte=200' }
      ],
      productList: [],
      selected: [],
      headers: [
        {
          text: 'name',
          value: 'name'
        },
        { text: 'price', value: 'price' },
        { text: 'color', value: 'color' }
      ],
      pagination: {
        page: 1,
        limit: 10
      },
      timeout: null
    }
  },
  created () {
    this.fetchProductList()
  },
  methods: {
    selectProductItem () {
      this.$emit('selectProductItem', this.selected)
    },
    async fetchProductList () {
      try {
        const respone = await axios.get('http://localhost:3000/products')
        if (respone.statusText === 'OK') {
          this.productList = respone.data
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    async searchProductInList () {
      try {
        const res = await axios.get(`http://localhost:3000/products?name_like=${this.product.search}&color_like=${this.product.color}&${this.product.price}`)
        if (res.statusText === 'OK') {
          this.productList = res.data
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
</script>
