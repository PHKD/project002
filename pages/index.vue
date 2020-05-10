<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <div>
      <v-btn @click="goToProductList">
        <v-icon>mdi-format-list-bulleted-square</v-icon>
      </v-btn>
      <v-btn @click="goToShoppingCart">
        <v-icon>mdi-cart-outline</v-icon>
      </v-btn>
      <v-btn @click="goToProductHistory">
        <v-icon>mdi-nutrition</v-icon>
      </v-btn>
    </div>
    <h1>{{ currentTitle }}</h1>
    <div style="width:100%;" class="pt-5">
      <components
        :is="currentComponent"
        @selectProductItem="onSelectProduct"
      />
    </div>
    <div>
      <v-btn
        v-if="!hideNextButton"
        :disabled="isDisable"
        @click="nextStep()"
      >
        {{ currentText }}
      </v-btn>
    </div>
  </v-layout>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
// import uniqid from 'uniqid'
import ProductList from '~/components/ProductList.vue'
import ProductCart from '~/components/ProductCart.vue'
import ProductHistory from '~/components/ProductHistory.vue'
export default {
  data () {
    return {
      componentArray: [
        { id: 1, component: ProductList, submitText: 'ADD TO CART', title: 'Select Product' },
        { id: 2, component: ProductCart, submitText: 'Check Out', title: 'Shopping Cart' },
        { id: 3, component: ProductHistory, submitText: 'Ok', title: 'Order History' }
      ],
      currentComponentId: 1,
      product: {
        seleted: []
      }
    }
  },
  computed: {
    ...mapState({
      productSelected: state => state.products.prodcutList
    }),
    currentComponent () {
      return this.componentArray.find(e => e.id === this.currentComponentId).component
    },
    currentText () {
      return this.componentArray.find(e => e.id === this.currentComponentId).submitText
    },
    currentTitle () {
      return this.componentArray.find(e => e.id === this.currentComponentId).title
    },
    hideNextButton () {
      return this.currentComponentId === 3
    },
    isDisable () {
      return (this.product.seleted.length <= 0 && this.currentComponentId === 1) || (this.productSelected.length <= 0 && this.currentComponentId === 2)
    }
  },
  methods: {
    async nextStep () {
      if (this.currentComponentId === 1) {
        this.product.seleted.forEach((element) => {
          this.$store.commit('products/addProduct', element)
        })
      } else if (this.currentComponentId === 2) {
        await this.updateProductHistory()
      }
      this.currentComponentId++
    },
    onSelectProduct (arr) {
      this.product.seleted = arr
    },
    async updateProductHistory () {
      try {
        const param = {
          product: this.productSelected
        }
        const resUpdate = await axios.post('http://localhost:3000/history', param)
        if (resUpdate) {
          this.$store.commit('products/clearProductArr')
        }
      } catch (error) {
        throw new Error(error)
      }
    },
    goToProductList () {
      this.currentComponentId = 1
    },
    goToShoppingCart () {
      this.currentComponentId = 2
    },
    goToProductHistory () {
      this.currentComponentId = 3
    }
  }
}
</script>
