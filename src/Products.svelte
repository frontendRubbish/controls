<script lang="ts">
  import { tick } from 'svelte';
  import { activeSection, inputStatus } from './stores.js';

  import type { InputStatus } from './types/input.status.js';

  async function checkInput(inputStatus: InputStatus): Promise<void> {
    if (inputStatus.down && $activeSection === 1) {
      await tick();
      activeSection.set(2);
    }
  }

  $: checkInput($inputStatus);
</script>

<section class:active="{$activeSection === 1}">
  Produkte
</section>

<style>
  section {
    border: 1px solid black;
    height: 200px;
    margin: 20px 0;
    width: 1024px;
  }

  .active {
    border-color: red;
  }
</style>