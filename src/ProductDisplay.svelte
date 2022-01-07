<script lang="ts">
  import { fade } from 'svelte/transition';
  import { tick, onMount } from 'svelte';
  import productData from './data/products.js';
  import { searchTerm } from './stores.js';

  export let sectionIdx: number;

  let activeIndex = 0;

  $: shownProducts =
    $searchTerm.length > 2
      ? productData.filter(
          (product) => product.Name.toUpperCase().indexOf($searchTerm) >= 0
        )
      : productData;
</script>

<div class="product-view">
  <div class="product-view__inner">
    {#each shownProducts as product, idx (product.ProductId)}
      <div class="product-view__tile" class:product-view__tile--active={activeIndex === idx} transition:fade>
        <strong class="product-view__title">{product.Name}</strong>
        <div class="product-view__image-container">
          <img class="product-view__image" src={product.PictureUrl} />
        </div>
        <p class="product-view__description">
          {product.ShortDescription}
        </p>
        <div>
          <span class="product-view__price">
            {product.Price} 
          </span>
          <span>
            {product.CurrencyCode}
          </span>
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
    }

    &__title {
      display: block;
      margin-bottom: 16px;
    }

    &__tile {
      flex: 0 0 300px;
      border: 1px solid transparent;
      padding: 20px;
      width: 300px;

      &--active {
        border-color: $white;
      }
    }

    &__image-container {
      align-items: center;
      background-color: $white;
      display: flex;
      height: 260px;
    }

    &__image {
      height: 100%;
      width: 100%;
      max-width: 100%;
    }

    &__price {
      font-size: 24px;
    }
  }
</style>
