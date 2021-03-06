﻿<template>
  <div class="cart">
    <div class="title">
      {{cart.title}}
    </div>

    <div class="image">
      <img :src="cart.src" />
      <div class="img-cover" />
    </div>

    <div class="price">
      {{ $t('price') }}: {{cart.price}}$
    </div>

    <counter :value="amount" :max="cart.limit" @change="change" />

    <div class="price-total">
      <span>{{ $t('total') }}:</span>
      <span>{{totalPrice}} $</span>
    </div>

    <div class="reset-wrapper" :class="{isActive: isResetActive}">
      <button class="reset" @click.stop="reset" :disabled="!isResetActive">{{ $t('reset') }}</button>
    </div>
  </div>
</template>

<script>

import { useStore } from 'vuex'
import { reactive, ref, toRefs, computed } from 'vue'
import counter from './counter-composition'

export default {
  name: 'cart',

  components: {
    counter
  },

  props: {
    cart: {
      type: Object,
      default: () => {}
    }
  },

  setup({cart}, context) {
    const state = reactive({
      amount: 0,
    })

    const store = useStore();

    return {
      ...toRefs(state),

      totalPrice: computed(() =>
        cart.price * state.amount
      ),

      isResetActive: computed(() =>
        state.amount > 0
      ),

      change(value) {
        state.amount > value ?
          store.commit('decreaseTotal', cart.price):
          store.commit('increaseTotal', cart.price);

        state.amount = value;
      },

      reset() {
        store.commit('decreaseAmount', {amount: state.amount, price: cart.price})
        state.amount = 0;
      }
    }
  },
}
</script>


<style lang="scss" scoped>

.cart {
  background: #fff;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
  width: 288px;
  margin: 0 auto 1rem;
  padding: 8px;

  .title {
    font-family: georgia;
    font-size: 1.25rem;
    color: #000;
    background: #f0f0f0;
    letter-spacing: 1px;
    text-align: center;
    height: 64px;
    line-height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
  }

  .image {
    position: relative;
    padding: .5rem;

    img {
      width: 100%;
      height: 240px;
      object-fit: scale-down;
    }

    .img-cover {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  .price {
    font-size: 1.25rem;
    color: #fff;
    background: #000;
    text-align: center;
    padding: 0.5rem 0;
  }

  .price-total {
    font-size: 1rem;
    color: #404040;
    background: #fff;
    border: 1px solid #a0a0a0;
    border-radius: .25rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    margin: .5rem 0;
    padding: .5rem .5rem;
  }

  .reset-wrapper {
    background: #e0e0e0;
    padding: 0.5rem;
    text-align: center;

    &.isActive {
      background: #FFCDD2;
    }

    button {
      &.reset {
        font-size: 1rem;
        color: #fff;
        background: #E53935;
        box-shadow: 0 2px 4px rgba(0,0,0,0.4);
        border: none;
        border-radius: 8px;
        outline: none;
        height: 32px;
        line-height: 32px;
        padding: 0 1.5rem;
        cursor: pointer
      }

      &[disabled] {
        color: #e0e0e0;
        background: #808080;
        cursor: default;
      }
    }

  }
}
</style>
