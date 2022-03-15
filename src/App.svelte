<script lang="ts">
	import { setContext } from "svelte";

	import ControlPanel from "./components/ControlPanel.svelte";
	import HlavniPlatno from "./components/HlavniPlatno.svelte";
	import OptionsPanel from "./components/OptionsPanel.svelte";
	import { SerazovaciPlatno } from "./lib/serazovac";
	import { PLATNO_CONTEXT } from "./lib/util";

	let platno: SerazovaciPlatno;

	const nacteniPlatna = (e) => {
		posluchaci.forEach((posluchac) => {
			posluchac(e.detail);
		});
	};
	type Posluchac = (platno: SerazovaciPlatno) => any;
	const posluchaci: Posluchac[] = [];

	setContext(PLATNO_CONTEXT, (novyPosluchac: Posluchac) => {
		posluchaci.push(novyPosluchac);
	});
</script>

<main class="w-screen h-screen flex flex-col">
	<div class="w-full h-[4.5em] border-b-2 border-gray-200">
		<ControlPanel />
	</div>
	<div class="w-full flex-grow">
		<HlavniPlatno on:nacteni={nacteniPlatna} bind:platno />
	</div>
	<div class="w-full h-[4.5em] border-t-2 border-gray-200">
		<OptionsPanel />
	</div>
</main>
