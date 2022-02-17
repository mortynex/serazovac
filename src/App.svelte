<script lang="ts">
	import ControlPanel from "./components/ControlPanel.svelte";
	import HlavniPlatno from "./components/HlavniPlatno.svelte";
	import OptionsPanel from "./components/OptionsPanel.svelte";
</script>

<main class="w-screen h-screen flex flex-col">
	<div class="w-full h-[4.5em] border-b-2 border-gray-200"><ControlPanel /></div>
	<div class="w-full flex-grow"><HlavniPlatno /></div>
	<div class="w-full h-[4.5em] border-t-2 border-gray-200"><OptionsPanel /></div>
</main>
