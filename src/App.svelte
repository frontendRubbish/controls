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
		text-align: center;
		padding: 1em;
		margin: 0 auto;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>