<script lang="ts">
	import InputController from './InputController.svelte';
	import Search from './Search.svelte';
	import Products from './Products.svelte';
	import Checkout from './Checkout.svelte';

</script>

<main>
	<InputController />
	<Search />
	<Products />
	<Checkout />

</main>

<style>
	main {
		width: 100%;
		margin: 0 auto;
		max-width: 1440px;
	}
</style>