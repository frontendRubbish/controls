<script lang="ts">
  import Keyboard from './Keyboard.svelte';
  import { tick, onMount } from 'svelte';
  import { activeSection, sectionNavigationActive, inputStatus, delayShort, searchTerm } from './stores.js';

  import type { InputStatus } from './types/input.status.js';

  export let sectionIdx: number;

  let inputBlocked = false;
  let blocker: NodeJS.Timeout;
  let keyboardActive = false;

  let searchInput: HTMLInputElement;

  async function checkInput(inputStatus: InputStatus): Promise<void> {
    if ($activeSection !== sectionIdx && searchInput) {
      searchInput.blur();
      activateKeyboard(false);
    } else if (inputStatus.buttonA && !keyboardActive) {
      blockInput();
      activateKeyboard(true);
    } else if (inputStatus.buttonB && keyboardActive) {
      activateKeyboard(false);
    }
  }

  async function activateKeyboard(active: boolean): Promise<void> {
    await tick();
    keyboardActive = active;
    sectionNavigationActive.set(!active);
  }

  function blockInput(): void {
    inputBlocked = true;
    blocker = setTimeout(() => (inputBlocked = false), $delayShort);
  }

  function setActive(activeSection: number): void {
    if (activeSection === sectionIdx && searchInput) {
      searchInput.focus();
    }
  }

  $: checkInput($inputStatus);
  $: setActive($activeSection);

  onMount(() => {
    setActive($activeSection);
  });
</script>

<input type="text" bind:this={searchInput} bind:value={$searchTerm} class="search-input" />

{#if keyboardActive}
  <Keyboard {keyboardActive} />
{/if}

<style lang="scss">
  @import './sass/vars';

  .search-input {
    height: 40px;
    width: 50%;
  }
</style>
