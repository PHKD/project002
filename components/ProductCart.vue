<template>
  <div>
    <v-card v-for="(item,index) in productList" :key="index" class="mb-2">
      <v-row class="pl-10 align-center">
        <v-col cols="4">
          name: {{ item.name }}
        </v-col>
        <v-col cols="4">
          price: {{ item.price }} ฿
        </v-col>
        <v-col cols="2">
          color: {{ item.color }}
        </v-col>
        <v-col cols="2">
          <v-btn @click="deleteProduct(index)">
            delete
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'ProductCart',
  data () {
    return {
      productList: []
    }
  },
  computed: {
    ...mapState({
      productSelect: state => state.products.prodcutList
    })
  },
  created () {
    this.productList = this.productSelect
  },
  methods: {
    deleteProduct (idx) {
      this.$store.commit('products/removeProduct', { index: idx })
    }
  }
}
</script>
