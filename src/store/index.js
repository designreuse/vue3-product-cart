import { createStore } from 'vuex'
import data from './data.json';

const url = 'https://my-json-server.typicode.com/alexander-lyakhov/vue3-product-cart/products'

export default createStore({
  state: {
    products: null,
    totalProducts: 0,
    totalPrice: 0
  },

  getters: {
    products(state) {
      return state.products;
    }
  },

  mutations: {
    setProducts(state, data) {
      console.log('setProducts', data)
      state.products = data;
    },

    decreaseTotal(state, price) {
      state.totalProducts--;
      state.totalPrice -= +price;
    },

    increaseTotal(state, price) {
      state.totalProducts++;
      state.totalPrice += +price;
    },

    decreaseAmount(state, {amount, price}) {
      state.totalProducts -= amount;
      state.totalPrice -= amount * price;
    },

    increaseAmount(state, {amount, price}) {
      state.totalProducts += amount;
      state.totalPrice += amount * price;
    },
  },

  actions: {
    async fetchProducts({commit}) {
      const data = await fetch(url);
      commit('setProducts', await data.json());
    }
  }
})
