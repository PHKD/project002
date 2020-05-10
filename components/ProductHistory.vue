<template>
  <div>
    <v-row>
      <v-col v-for="item in productList" :key="item.id" cols="4">
        <v-card class="pa-4">
          <div class="pl-2">
            orderId: {{ item.id }}
          </div>
          <v-card-text>
            <div v-for="i in item.product" :key="i.id">
              <p>name: {{ i.name }}</p>
              <p>price: {{ i.price }} ฿</p>
              <p>color: {{ i.color }}</p>
              <v-divider />
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'ProductHistory',
  data () {
    return {
      productList: []
    }
  },
  created () {
    this.fetchProductList()
  },
  methods: {
    async fetchProductList () {
      try {
        const respone = await axios.get('http://localhost:3000/history')
        if (respone.statusText === 'OK') {
          this.productList = respone.data
        }
      } catch (error) {
        throw new Error(error)
      }
    }
  }
}
</script>
