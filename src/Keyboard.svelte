<script lang="ts">
  import { tick, onMount } from 'svelte';
  import { inputStatus, delayShort, searchTerm } from './stores.js';

  import type { InputStatus } from './types/input.status.js';

  export let keyboardActive: boolean;

  /*const keyLines = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['Q', 'W', 'E', 'R', 'T', 'Z', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Y', 'X', 'C', 'V', 'B', 'N', 'M'],
  ];*/

  const keyLines = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y', 'Z', '-', ' ', 'ᐊ'],
  ];

  let inputBlocked = false;
  let keyboardX = 0;
  let keyboardY = 0;
  let blocker: NodeJS.Timeout;

  async function checkInput(inputStatus: InputStatus): Promise<void> {
    await tick();

    if (inputStatus.buttonA && keyboardActive && !inputBlocked) {
      const selectedChar = keyLines[keyboardY][keyboardX];
      blockInput();
      if (selectedChar === 'ᐊ') {
        if ($searchTerm.length > 0) {
          searchTerm.set($searchTerm.substr(0, $searchTerm.length - 1));
        }
      } else {
        searchTerm.set($searchTerm + selectedChar);
      }
    } else if (inputStatus.up && keyboardActive && !inputBlocked) {
      blockInput();
      keyboardY--;
      if (keyboardY < 0) {
        keyboardY = keyLines.length - 1;
      }
      adjustColIndex();
    } else if (inputStatus.down && keyboardActive && !inputBlocked) {
      blockInput();
      keyboardY++;
      if (keyboardY === keyLines.length) {
        keyboardY = 0;
      }
      adjustColIndex();
    } else if (inputStatus.left && keyboardActive && !inputBlocked) {
      blockInput();
      keyboardX--;
      if (keyboardX < 0) {
        keyboardX = keyLines[keyboardY].length - 1;
      }
    } else if (inputStatus.right && keyboardActive && !inputBlocked) {
      blockInput();
      keyboardX++;
      if (keyboardX === keyLines[keyboardY].length) {
        keyboardX = 0;
      }
    }
  }

  function adjustColIndex(): void {
    if (keyboardX >= keyLines[keyboardY].length) {
      keyboardX = keyLines[keyboardY].length - 1;
    }
  }

  async function blockInput(): Promise<void> {
    inputBlocked = true;
    blocker = setTimeout(() => (inputBlocked = false), $delayShort);
    await tick();
  }

  $: checkInput($inputStatus);

  onMount(() => {
    blockInput();
  });
</script>

<div class="keyboard">
  {#each keyLines as line, rowIndex}
    <div class="keyboard__row">
      {#each line as keyButton, colIndex}
        <button class="keyboard__btn" class:keyboard__btn--active={rowIndex === keyboardY && colIndex === keyboardX}>
          {keyButton}
        </button>
      {/each}
    </div>
  {/each}
</div>

<style lang="scss">
  @import './sass/vars';

  .keyboard {
    border: 1px solid white;
    position: absolute;
    right: 10px;
    top: 10px;

    &__row {
      display: flex;
    }

    &__btn {
      align-items: center;
      background-color: rgba(0, 0, 0, 0.8);
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
