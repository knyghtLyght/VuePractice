'use strict';
/* Something broke with display */
Vue.component('product', {
  prop: {
    premium: {
      type: Boolean,
      require: true
    }
  },
  template: `
    <div class="product-image">
      <img v-bind:src="image">
    </div>
    <div class="product-info">
      <h1>{{title}}</h1>
      <a :href="url">{{descirption}}</a>
      <p v-if="inventory > 10">In Stock <span v-show="onSale">On Sale</span></p>
      <p v-else-if="inventory < 10 && inventory > 0">Almost out</p>
      <p v-else :class="{outOfStock: !inStock}">Out of Stock</p>
      <p>User is premium {{premium}}</p>

      <ul>
        <li v-for="detail in details">{{ detail }}</li>
      </ul>
      <p v-show="onSale">{{saleString}}</p>
      <div v-for="(variant, index) in variants" 
          :key="variant.variantId"
          class="color-box"
          :style="{ backgroundColor: variant.variantColor}"
          @mouseover="updateProduct(index)">
          <!-- @ is the shorthand for v-on -->
      </div>
      <ul>
        <li v-for="size in sizes">{{ size }}</li>
      </ul>
      <button v-on:click="addToCart"
          :disabled="!inStock"
          :class="{disabledButton: !inStock}">Add to cart</button>
      <button @click=removeFromCart>Remove from cart</button>
      <div class="cart">
        <p>Cart {{cart}}</p>
      </div>
    </div>
  `,
  data() {
    return {
      brand: 'Vue mastery',
      product: 'Socks',
      descirption: 'Light Green',
      selectedVarient: 0,
      url: 'www.google.com',
      onSale: false,
      inventory: 11,
      details: ["80% cotton", "20% polyester", "gender-nutral"],
      sizes: ["XS", "S", "M", "L", "XL"],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: './img/1msEa-Kg.jpeg',
          variantQuantity: 10
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: './img/EhWEr5hg.jpeg',
          variantQuantity: 0
        }
      ],
      cart: 0
    };
  },
  methods: {
    addToCart () {
      this.cart += 1;
    },
    updateProduct (index) {
      this.selectedVarient = index;
      console.log(index);
    },
    removeFromCart () {
      this.cart -= 1;
    }
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVarient].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVarient].variantQuantity;
    },
    saleString() {
      return this.brand + ' ' + this.product;
    }
  }
});

var app = new Vue({
  el: '#app'
});