<script lang="ts">
	import ControlPanel from "./components/ControlPanel.svelte";
	import HlavniPlatno from "./components/HlavniPlatno.svelte";
	import OptionsPanel from "./components/OptionsPanel.svelte";
	import { SerazovaciPlatno } from "./lib/serazovac";

	let platno: SerazovaciPlatno;
	let algoritmy: string[] = [];
	let vybranyAlgoritmus;

	const pozastavPlatno = () => {
		platno.zastav();
	};

	const pokracujPlatno = () => {
		console.log("halo");
		platno.pokracuj();
	};

	const nacteniPlatna = () => {
		algoritmy = platno.algoritmy;

		vybranyAlgoritmus = platno.vybranyAlgoritmus;
		console.log({ vybranyAlgoritmus });
	};

	const zmenaAlgoritmu = (e) => {
		console.log(e.detail);
		platno.zmenAlgortimus(e.detail as any);
	};
</script>

<main class="w-screen h-screen flex flex-col">
	<div class="w-full h-[4.5em] border-b-2 border-gray-200">
		<ControlPanel
			bind:vybranyAlgoritmus
			on:zmenaAlgoritmu={zmenaAlgoritmu}
			bind:algoritmy
		/>
	</div>
	<div class="w-full flex-grow">
		<HlavniPlatno on:nacteni={nacteniPlatna} bind:platno horizontalniSkok={3} />
	</div>
	<div class="w-full h-[4.5em] border-t-2 border-gray-200">
		<OptionsPanel on:hraj={pokracujPlatno} on:nehraj={pozastavPlatno} />
	</div>
</main>
