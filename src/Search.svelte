<script lang="ts">
  import { tick, onMount } from 'svelte';
  import { activeSection, delayShort, inputStatus } from './stores.js';

  import type { InputStatus } from './types/input.status.js';

  export let sectionIdx: number;

  let inputBlocked = false;
  let blocker: NodeJS.Timeout;

  let searchInput: HTMLInputElement;

  async function checkInput(inputStatus: InputStatus):Promise<void> {
    if ($activeSection !== sectionIdx && !inputBlocked && searchInput) {
      await tick();
      searchInput.blur();
    }
  }

  function blockNavigation(activeSection: number): void {
    if (activeSection === sectionIdx && searchInput) {
      searchInput.focus();
      inputBlocked = true;
      blocker = setTimeout( () => inputBlocked = false, $delayShort);
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

<style type="text/scss">
  @import './sass/vars';
  

</style>