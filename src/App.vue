<script setup>
import { ref, reactive } from "vue";
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";

import { useProductStore } from "@/stores/ProductStore.js";
import { useCartStore } from "@/stores/CartStore.js";
const productStore = useProductStore();
const cartStore = useCartStore();
productStore.fill();

const history = reactive([]);
const future = reactive([]);
const doingHistory = ref(false);
history.push(JSON.stringify(cartStore.$state));

const redo = () => {
  const latestState = future.pop();
  if (!latestState) return;
  doingHistory.value = true;
  history.push(latestState);
  cartStore.$state = JSON.parse(latestState);
  doingHistory.value = false;
};

const undo = () => {
  if (history.length === 1) return;
  doingHistory.value = true;
  future.push(history.pop());
  cartStore.$state = JSON.parse(history.at(-1));
  doingHistory.value = false;
};

cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
    future.splice(0, future.length);
  }
});

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
      <AppButton @click="undo">Undo</AppButton>
      <AppButton class="ml-2" @click="redo">Redo</AppButton>
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
