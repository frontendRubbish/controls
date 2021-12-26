<script lang="ts">
  import { tick, onMount } from 'svelte';
  import { activeSection, sectionNavigationActive, inputStatus, delayShort } from './stores.js';

  import type { InputStatus } from './types/input.status.js';

  export let sectionIdx: number;

  const keyLines = [
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  let keyboardBlocked = false;
  let keyboardX = 0;
  let keyboardY = 0;
  let keyboardBlocker: NodeJS.Timeout;
  let keyboardActive = false;

  let searchInput: HTMLInputElement;
  let searchTerm = '';

  async function checkInput(inputStatus: InputStatus):Promise<void> {
    if ($activeSection !== sectionIdx && searchInput) {
      searchInput.blur();
      activateKeyboard(false);
    } else if (inputStatus.buttonA && !keyboardActive) {
      blockKeyboard();
      activateKeyboard(true);
    } else if (inputStatus.buttonA && keyboardActive && !keyboardBlocked) {
      blockKeyboard();
      await tick();
      searchTerm += keyLines[keyboardY][keyboardX];
    } else if (inputStatus.buttonB && keyboardActive) {
      activateKeyboard(false);
    } else if (inputStatus.up && keyboardActive && !keyboardBlocked) {
      blockKeyboard();
      await tick();
      keyboardY --;
      if (keyboardY < 0) {
        keyboardY = keyLines.length - 1;
      }
      adjustColIndex();
    } else if (inputStatus.down && keyboardActive && !keyboardBlocked) {
      blockKeyboard();
      await tick();
      keyboardY ++;
      if (keyboardY === keyLines.length) {
        keyboardY = 0;
      }
      adjustColIndex();
    } else if (inputStatus.left && keyboardActive && !keyboardBlocked) {
      blockKeyboard();
      await tick();
      keyboardX --;
      if (keyboardX < 0) {
        keyboardX = keyLines[keyboardY].length - 1;
      }
    } 
    else if (inputStatus.right && keyboardActive && !keyboardBlocked) {
      blockKeyboard();
      await tick();
      keyboardX ++;
      if (keyboardX === keyLines[keyboardY].length) {
        keyboardX = 0;
      }
    } 
  }

  async function activateKeyboard(active: boolean):Promise<void> {
    await tick();
      keyboardActive = active;
      sectionNavigationActive.set(!active);
  }

  function adjustColIndex(): void {
    if (keyboardX >= keyLines[keyboardY].length) {
        keyboardX = keyLines[keyboardY].length - 1;
      }
  }

  function blockKeyboard(): void {
    keyboardBlocked = true;
    keyboardBlocker = setTimeout( () => keyboardBlocked = false, $delayShort);
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

<input type="text" bind:this={searchInput} bind:value={searchTerm} />

{#if keyboardActive}
  <div class="keyboard">
    {#each keyLines as line, rowIndex}
      <div class="keyboard__row">
        {#each line as keyButton, colIndex}
          <button class="keyboard__btn" class:keyboard__btn--active="{rowIndex === keyboardY && colIndex === keyboardX}">
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
      background-color: rgba(0,0,0, 0.8);
      color: $white;
      display: flex;
      height: 40px;
      justify-content: center;
      transition: background-color, 0.4s;
      width: 40px;

      &--active {
        background-color: $white;
        color: black;
      }
    }
  }

</style>