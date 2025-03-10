<script setup>
import { onMounted, ref, watch, reactive } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import Drawer from './components/Drawer.vue'

const items = ref([]) //

// два состояния для запроса на бэк

const filters = reactive({
  sortBy: '',
  searchQuery: '',
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

onMounted(async () => {
  // fetch('https://44279f13e2d739a9.mokky.dev/items')
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data)
  //     items.value = data
  //   })

  try {
    const { data } = await axios.get('https://44279f13e2d739a9.mokky.dev/items')
    items.value = data
  } catch (err) {
    console.log(err)
  }
})

watch(filters, async () => {
  try {
    const { data } = await axios.get(
      'https://44279f13e2d739a9.mokky.dev/items?sortBy=' + filters.sortBy,
    )
    items.value = data
  } catch (err) {
    console.log(err)
  }
})
</script>

<template>
  <!-- <Drawer /> -->
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header />

    <div class="p-10">
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все Кроссовки</h2>

        <div class="flex gap-4">
          <select @change="onChangeSelect" class="py-2 px-3 outline-none border rounded-md">
            <option value="name">По названию</option>
            <option value="price">По цене(дешёвые)</option>
            <option value="-price">По цене(дорогие)</option>
          </select>

          <div class="relative">
            <img class="absolute left-4 top-3" src="/search.svg" alt="Search" />
            <input
              class="border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>
      <div class="mt-10">
        <CardList :items="items" />
      </div>
    </div>
  </div>
</template>
