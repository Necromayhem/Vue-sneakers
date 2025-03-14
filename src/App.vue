<script setup>
import { ref, watch, provide, computed } from 'vue'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

/* Корзина (START) */
const cart = ref([])
const isCreatingOrder = ref(false)

const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const tax = computed(() => totalPrice.value * 0.05)

const caryIsEmpty = computed(() => cart.value.length === 0)

const CartButtonDisabled = computed(() => isCreatingOrder.value || caryIsEmpty.value)

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://44279f13e2d739a9.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value,
    })

    cart.value = []

    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true },
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart,
  totalPrice,
  tax,
})

/*Корзина (END) */
</script>

<template>
  <Drawer v-if="drawerOpen" @create-order="createOrder" :button-disabled="CartButtonDisabled" />

  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
