<template>
  <div id="app">
    <div class="nav-bar"></div>

    <div class="cart">Cart({{ cart }})</div>

    <div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img :src="image" :class="{ 'out-of-stock-img': !inStock }">
        </div>
        <div class="product-info">
          <h2>{{ msg }}</h2>
          <h1>{{ product }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <ul>
            <li v-for="detail in details">{{ detail }}</li>
          </ul>

          <div
              v-for="variant in variants"
              :key="variant.id"
              @mouseover="updateImage(variant.image)"
              class="color-circle"
              v-bind:style="{ backgroundColor: variant.color}"
              :class="{ 'out-of-stock-img': !inStock }"
          ></div>
          <button
              class="button"
              :class="{ disabledButton: !inStock }"
              @click="addToCart"
              :disabled="!inStock">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Intro-Intro',
  props: {
    msg: String
  },
  data() {
    return {
      cart:0,
      product: 'Socks',
      brand: 'Vue Mastery',
      image: './assets/images/socks_green.jpg',
      inStock: true,
      details: ['50% cotton', '30% wool', '20% polyester'],
      variants: [
        { id: 2234, color: 'green', image: './assets/images/socks_green.jpg' },
        { id: 2235, color: 'blue', image: './assets/images/socks_blue.jpg' },
      ]
    }
  },
  methods: {
    addToCart() {
      this.cart += 1
    },
    updateImage(variantImage) {
      this.image = variantImage
    }
  }
}
</script>
