<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";

import { useProductStore } from "@/stores/ProductStore.js";
import { useCartStore } from "@/stores/CartStore.js";
const productStore = useProductStore();
const cartStore = useCartStore();
productStore.fill();

const unsubscribe = cartStore.$onAction(
  ({
     name, // name of the action
     store, // store instance, same as `someStore`
     args, // array of parameters passed to the action
     after, // hook after the action returns or resolves
     onError, // hook if the action throws or rejects
   }) => {
    if (name === 'addItems') {
      after(() => {
        console.log(args[0]);
      });
    }

    onError((error) => {
      console.warn('Hello error: ', error.message);
    })
  }
)

// manually remove the listener
// unsubscribe()
</script>

<template>
  <div class="container">
    <TheHeader />

    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>

    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard
        v-for="product in productStore.products"
        :key="product.name"
        :product="product"
        @addToCart="cartStore.addItems($event, product)"
      />
    </ul>
  </div>
</template>
