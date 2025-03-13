<script setup>
import CartItem from './CartItem.vue'
import { inject } from 'vue'

const { cart, removeFromCart } = inject('cart')
</script>

<template>
  <div class="flex flex-col flex-1 gap-4 justify-between">
    <CartItem
      v-for="item in cart"
      :key="item.id"
      :title="item.title"
      :id="item.id"
      :image-url="item.imageUrl"
      :price="item.price"
      @on-click-remove="() => removeFromCart(item)"
    />
  </div>
</template>
