<script lang="ts">
	import { SerazovaciPlatno } from "../lib/serazovac";

	import { getContext } from "svelte";

	import PozastavIkona from "../assets/pozastav_ikona.svg";
	import ZacniIkona from "../assets/zacni_ikona.svg";
	import { PLATNO_CONTEXT } from "../lib/util";

	let serazuje = false;

	let platno: SerazovaciPlatno;

	const priNacteniPlatna = getContext(PLATNO_CONTEXT) as any;

	priNacteniPlatna((novePlatno: SerazovaciPlatno) => {
		platno = novePlatno;

		platno.addEventListener("zastaveni", () => {
			serazuje = false;
		});

		platno.addEventListener("pokracovani", () => {
			serazuje = true;
		});
	});

	const zacniPrehravat = () => {
		platno.zastav();
	};

	const pozastavPrehravani = () => {
		platno.pokracuj();
	};
</script>

<div class="w-full h-full flex flex-row justify-between items-center p-8">
	<div class="bg-gray-200 flex row gap-2" />
	<div class=" h-10 flex row gap-2">
		{#if serazuje}
			<img src={PozastavIkona} alt="" class="cursor-pointer" on:click={zacniPrehravat} />
		{:else}
			<img src={ZacniIkona} alt="" class="cursor-pointer" on:click={pozastavPrehravani} />
		{/if}
	</div>
	<div class="bg-gray-200 h-10" />
</div>
