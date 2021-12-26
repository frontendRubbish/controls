<script lang="ts">
  import { tick, onMount } from 'svelte';
  import { activeSection, sectionNavigationActive, inputStatus } from './stores.js';

  import type { InputStatus } from './types/input.status.js';

  export let sectionIdx: number;

  const keyLines = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  let keyboardBlocked = false;
  let keyboardBlocker: NodeJS.Timeout;
  let keyboardActive = false;


  let searchInput: HTMLInputElement;

  async function checkInput(inputStatus: InputStatus):Promise<void> {
    if ($activeSection !== sectionIdx && searchInput) {
      await tick();
      searchInput.blur();
      keyboardActive = false;
    } else if (inputStatus.buttonA && !keyboardActive) {
      await tick();
      keyboardActive = true;
      sectionNavigationActive.set(false);
    } else if (inputStatus.buttonB && keyboardActive) {
      await tick();
      keyboardActive = false;
      sectionNavigationActive.set(true);
    }
  }

  function blockNavigation(activeSection: number): void {
    if (activeSection === sectionIdx && searchInput) {
      searchInput.focus();
    }
  }

  $: checkInput($inputStatus);
  $: blockNavigation($activeSection);

  onMount(() => {
    if ($activeSection === sectionIdx) {
      searchInput.focus();
    }
  });

</script>

<input type="text" bind:this={searchInput} />

{#if keyboardActive}
  <div class="keyboard">
    {#each keyLines as line}
      <div class="keyboard__row">
        {#each line as keyButton}
          <button class="keyboard__btn">
            {keyButton}
          </button>
        {/each}
      </div>
    {/each}
  </div>
{/if}

<style type="text/scss">
  @import './sass/vars';
  
  .keyboard {
    border: 1px solid white;
    position: absolute;
    right: 10px;
    top: 10px;

    &__row {
      display: flex;
      justify-content: center;
    }

    &__btn {
      align-items: center;
      display: flex;
      height: 40px;
      justify-content: center;
      width: 40px;
    }
  }

</style>