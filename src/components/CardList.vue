<script setup>
import Card from './Card.vue'

const onClickAdd = () => {
  alert(111)
}
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      title="Мужские Кроссовки Nike Blazer Mid Suede"
      image-url="/sneakers/sneakers-1.jpg"
      :price="5000"
      :is-favorite="false"
      :is-added="false"
      :onClickAdd="onClickAdd"
    />
  </div>
</template>
