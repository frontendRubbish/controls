<script lang="ts">
	import InputController from './InputController.svelte';
	import Section from './Section.svelte';
</script>

<main>
	<InputController />
	<Section sectionIdx={0} title={'Suche'}>
		<input type="text" />
	</Section>
	<Section sectionIdx={1} title={'Produkte'}/>
	<Section sectionIdx={2} title={'Checkout'}/>
</main>

<style>
	main {
		width: 100%;
		margin: 0 auto;
		max-width: 1440px;
	}
</style>