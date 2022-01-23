<script lang="ts">
  import { fade } from 'svelte/transition';
  import { tick, onMount } from 'svelte';
  import productData from './data/products.js';
  import { delayShort, searchTerm, inputStatus, activeSection } from './stores.js';

  export let sectionIdx: number;

  let inputBlocked = false;
  let activeIndex = 0;
  let positionIndex = 0;
  let blocker: NodeJS.Timeout;

  async function checkInput(inputStatus: InputStatus): Promise<void> {
    if ($activeSection === sectionIdx && !inputBlocked) {
      if (inputStatus.left && activeIndex > 0) {
        blockInput();
        await tick();
        activeIndex--; 
      } else if (inputStatus.right && activeIndex < (shownProducts.length - 1) ) {
        blockInput();
        await tick();
        activeIndex++; 
      }
    }
  }
  
  function blockInput(): void {
    inputBlocked = true;
    blocker = setTimeout(() => (inputBlocked = false), $delayShort);
  }

  function computePosition(activeIndex): string {
    if (activeIndex < positionIndex) {
      positionIndex --;
    } else if (activeIndex > positionIndex + 5) {
      positionIndex ++;
    }
    return ( -314.666666667 * positionIndex ) + 'px';
  }

  function equals(a, b): boolean {    
    a.length === b.length &&
    a.every((v, i) => v === b[i]);
  }

  function filterProducts(searchTerm): Products {
    const newProducts = searchTerm.length > 2
      ? productData.filter(
          (product) => product.Name.toUpperCase().indexOf(searchTerm) >= 0
        )
      : productData;
    
    activeIndex = 0;
    return newProducts;
  }

  $: shownProducts = filterProducts($searchTerm);

  $: checkInput($inputStatus);

  $: sliderPosition = computePosition(activeIndex);

</script>

<div class="product-view">
  <div class="product-view__inner" style="transform: translateX({sliderPosition});">
    {#each shownProducts as product, idx (product.ProductId)}
      <div class="product-view__tile" class:product-view__tile--active={activeIndex === idx} transition:fade>
        <strong class="product-view__title">{product.Name}</strong>
        <div class="product-view__image-container">
          <img class="product-view__image" src={product.PictureUrl} alt={product.Name} />
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
      transition: transform 0.25s;
    }

    &__title {
      display: block;
      margin-bottom: 16px;
    }

    &__tile {
      flex: 0 0 314.6666666666667px;
      border: 1px solid transparent;
      padding: 20px;
      width: 314.6666666666667px;

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
