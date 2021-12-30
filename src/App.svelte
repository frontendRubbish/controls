<script lang="ts">
	import InputController from './InputController.svelte';
	import Section from './Section.svelte';
	import Search from './Search.svelte';
	import ProductDisplay from './ProductDisplay.svelte';
</script>

<main>
	<InputController />
	<Section sectionIdx={0} title={'Suche'}>
		<Search sectionIdx={0} />
	</Section>
	<Section sectionIdx={1} title={'Produkte'}>
		<ProductDisplay sectionIdx={1} />
	</Section>
	<Section sectionIdx={2} title={'Checkout'} />
</main>

<style>
	main {
		width: 100%;
		margin: 0 auto;
		max-width: 1440px;
	}
</style>
