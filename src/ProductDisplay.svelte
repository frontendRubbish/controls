<script lang="ts">
  import { tick } from 'svelte';
  import { fade } from 'svelte/transition';
  import productData from './data/products.js';
  import { delayShort, searchTerm, inputStatus, activeSection } from './stores.js';
  import type { InputStatus } from './types/input.status.js';
  import type { Products } from './types/product.js';

  export let sectionIdx: number;

  let inputBlocked = false;
  let activeIndex = 0;
  let positionIndex = 0;
  let showDetail = false;
  let ctaButton: HTMLButtonElement;
  let blocker: NodeJS.Timeout;

  async function checkInput(inputStatus: InputStatus): Promise<void> {
    if ($activeSection === sectionIdx && !inputBlocked) {
      if (inputStatus.left && activeIndex > 0) {
        await blockInput();
        activeIndex--;
      } else if (inputStatus.right && activeIndex < shownProducts.length - 1) {
        await blockInput();
        activeIndex++;
      } else if (inputStatus.buttonA) {
        await blockInput();
        showDetail = !showDetail;
      } else if (inputStatus.buttonB) {
        await blockInput();
        showDetail = false;
      }
    }
  }

  async function blockInput(): Promise<void> {
    inputBlocked = true;
    blocker = setTimeout(() => (inputBlocked = false), $delayShort);
    await tick();
  }

  function computePosition(activeIndex): string {
    if (activeIndex < positionIndex - 1) {
      positionIndex = activeIndex;
    } else if (activeIndex === positionIndex - 1) {
      positionIndex--;
    } else if (activeIndex > positionIndex + 5) {
      positionIndex++;
    }
    return -314.666666667 * positionIndex + 'px';
  }

  function filterProducts(searchTerm): Products {
    const newProducts =
      searchTerm.length > 2
        ? productData.filter((product) => product.Name.toUpperCase().indexOf(searchTerm) >= 0)
        : productData;

    activeIndex = 0;
    return newProducts;
  }

  function checkLayerDisplay(activeSection): void {
    if (activeSection !== sectionIdx) {
      showDetail = false;
    }
  }

  async function checkButtonFocus(displayLayer, activeIndex): Promise<void> {
    console.log(ctaButton, displayLayer);
    if (displayLayer) {
      await tick();
      ctaButton.focus();
    } 
  }

  $: shownProducts = filterProducts($searchTerm);

  $: displayLayer = $activeSection === sectionIdx && showDetail;

  $: checkLayerDisplay($activeSection);

  $: checkInput($inputStatus);

  $: checkButtonFocus(displayLayer, activeIndex);

  $: activeProduct = shownProducts[activeIndex];

  $: sliderPosition = computePosition(activeIndex);
</script>

<div class="product-view">
  <div class="product-view__inner" style="transform: translateX({sliderPosition});">
    {#each shownProducts as product, idx (product.ProductId)}
      <div
        class="product-view__tile"
        class:product-view__tile--active={activeIndex === idx && $activeSection === sectionIdx}
        transition:fade
      >
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
  {#if displayLayer}
      <div class="layer"></div>
      <div class="product-detail">
        <h1>{activeProduct.Name}</h1>
        <div class="flex">
          <div class="product-view__image-container">
            <img class="product-view__image" src={activeProduct.PictureUrl} alt={activeProduct.Name} />
          </div>
          <div class="product-detail__data">
            {activeProduct.SupplierName} <br />
            {activeProduct.MainCategory} <br />
            <p>
              <strong>Gewicht</strong><br />
              {activeProduct.Weight} {activeProduct.WeightUnit}
            </p>
            <p>
              <strong>Maße</strong><br />
              {activeProduct.DimensionHeight}x{activeProduct.DimensionWidth}x{activeProduct.DimensionDepth} {activeProduct.Unit}
            </p>
          </div>
        </div>
        <p>
          {activeProduct.ShortDescription}
        </p>
        <div class="product-detail__cta">
          <div>
            <span class="product-view__price">
              {activeProduct.Price}
            </span>
            <span>
              {activeProduct.CurrencyCode}
            </span>
          </div>
          <button bind:this={ctaButton} class="product-detail__button">
            BUY!
          </button>
        </div>
      </div>
    {/if}
</div>

<style lang="scss">
  @import './sass/vars';

  .flex {
    display: flex;
  }

  .layer {
    background-color: $dark;
    bottom: 0;
    left: 0;
    opacity: 0.8;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 4;
  }

  .product-detail {
    border: 1px solid $white;
    box-shadow: rgba(70, 70, 150, 0.15) 0px 2px 20px 0px, rgba(25, 25, 25, 0.05) 0px 1px 5px 0px;
    padding: 16px;
    position: absolute;
    top: 20%;
    width: 600px;
    left: 50%;
    margin-left: -300px;
    bottom: 20%;
    background-color: $dark;
    z-index: 5;

    &__data {
      padding-left: 16px;
    }

    &__cta {
      display: flex;
      height: 40px;
      align-items: center;
    }

    &__button {
      height: 40px;
      margin-left: 16px;
      width: 200px;
    }
  }

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
      width: 260px;
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
