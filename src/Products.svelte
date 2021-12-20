<script lang="ts">
import { tick } from 'svelte';

  import { activeSection, delayShort, inputStatus } from './stores.js';

  import type { InputStatus } from './types/input.status.js';

  let inputBlocked = false;
  let blocker: NodeJS.Timeout;

  async function checkInput(inputStatus: InputStatus):Promise<void> {
    if (inputStatus.down && $activeSection === 1 && !inputBlocked) {
      await tick();
      activeSection.set(2);
    }
  }

  function blockNavigation(activeSection: number): void {
    if (activeSection === 1) {
      inputBlocked = true;
      blocker = setTimeout( () => inputBlocked = false, $delayShort);
    }
  }

  $: checkInput($inputStatus);
  $: blockNavigation($activeSection);

</script>

<section class="section" class:active="{$activeSection === 1}">
  <div class="section__content">
    <h2 class="section__headline">Produkte</h2>
  </div>
</section>

<style>
  .section {
    border: 1px solid black;
    height: 200px;
    margin: 20px 0;
  }

  .section__content {
    background: radial-gradient(circle, rgba(2,2,2,0.1) 0%, rgba(2,2,2,0.2) 100%);
    height: 100%;
  }

  .section__headline {
    margin: 0 0 32px;
  }

  .active {
    border-color: red;
  }
</style>