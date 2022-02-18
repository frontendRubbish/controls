<script lang="ts">
  import { tick } from 'svelte';
  import { activeSection, delayShort, inputStatus, sectionNavigationActive } from './stores.js';

  import type { InputStatus } from './types/input.status.js';

  export let title: string;
  export let sectionIdx: number;

  let inputBlocked = false;
  let blocker: NodeJS.Timeout;

  async function checkInput(inputStatus: InputStatus): Promise<void> {
    if ($activeSection === sectionIdx && !inputBlocked && $sectionNavigationActive) {
      if (inputStatus.down) {
        await tick();
        activeSection.set(sectionIdx < 2 ? sectionIdx + 1 : 0);
      }
      if (inputStatus.up) {
        await tick();
        activeSection.set(sectionIdx > 0 ? sectionIdx - 1 : 2);
      }
    }
  }

  function blockInput(activeSection: number): void {
    if (activeSection === sectionIdx) {
      inputBlocked = true;
      blocker = setTimeout(() => (inputBlocked = false), $delayShort);
    }
  }

  $: checkInput($inputStatus);
  $: blockInput($activeSection);
</script>

<section class="section" class:section--active={$activeSection === sectionIdx}>
  <div class="section__content">
    <h2 class="section__headline" class:section__headline--active={$activeSection === sectionIdx}>{title}</h2>
    <slot />
  </div>
</section>

<style lang="scss">
  @import './sass/vars';

  .section {
    box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    margin-bottom: 8px;
    transition: margin 0.1s, box-shadow 0.1s;
  }

  .section__content {
    background: radial-gradient(circle, rgba(2, 2, 2, 0.1) 0%, rgba(2, 2, 2, 0.2) 100%);
    height: 100%;
    padding: 0 16px 16px;
  }

  .section__headline {
    margin: 0 -16px 32px;
    padding: 16px;
    transition: background-color 0.4s, color 0.4s;

    &--active {
      background-color: $font-light;
      color: $dark;
    }
  }

  .section--active {
    box-shadow: rgba(70, 70, 150, 0.15) 0px 2px 20px 0px, rgba(25, 25, 25, 0.05) 0px 1px 5px 0px;
    color: $font-light;
    margin: 0 -16px 8px -16px;
  }
</style>
