<script lang="ts">
  import { tick, onMount } from 'svelte';
  import productData from './data/products.js';

  export let sectionIdx: number;

  onMount(() => {});
</script>

<div class="product-view">
  <div class="product-view__inner">
    {#each productData as product (product.ProductId)}
      <div class="product-view__tile">
        <strong>{product.Name}</strong>
        <div class="product-view__image-container">
          <img class="product-view__image" src={product.PictureUrl} />
        </div>
      </div>
    {/each}
  </div>
</div>

<style type="text/scss">
  @import './sass/vars';

  .product-view {
    overflow: hidden;

    &__inner {
      display: flex;
      height: 300px;
    }

    &__tile {
      flex: 0 0 300px;
      height: 300px;
      padding: 20px;
      width: 300px;
    }

    &__image-container {
      align-items: center;
      background-color: $white;
      display: flex;
      height: 260px;
    }

    &__image {
      width: 100%;
      max-width: 100%;
    }
  }
</style>
