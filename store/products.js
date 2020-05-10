export const state = () => ({
  prodcutList: []
})

export const mutations = {
  addProduct (state, product) {
    state.prodcutList.push(product)
  },
  removeProduct (state, { index }) {
    state.prodcutList.splice(index, 1)
  },
  clearProductArr (state) {
    state.prodcutList = []
  }
}
