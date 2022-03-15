<script lang="ts">
	import { getContext } from "svelte";

	import PozastavIkona from "../assets/pozastav_ikona.svg";
	import ZacniIkona from "../assets/zacni_ikona.svg";
	import ResetujIkona from "../assets/resetuj_ikona.svg";

	import { SerazovaciPlatno } from "../lib/serazovac";
	import { PLATNO_CONTEXT } from "../lib/util";

	let serazuje = false;

	let platno: SerazovaciPlatno;

	const priNacteniPlatna = getContext(PLATNO_CONTEXT) as any;

	priNacteniPlatna((novePlatno: SerazovaciPlatno) => {
		platno = novePlatno;

		platno.poslouchej("zastaveni", () => {
			serazuje = false;
		});

		platno.poslouchej("pokracovani", () => {
			serazuje = true;
		});
	});

	const zacniPrehravat = () => {
		platno.zastav();
	};

	const pozastavPrehravani = () => {
		platno.pokracuj();
	};

	const resetujPlatno = () => {
		platno.resetuj();
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
	<div class="h-10 flex row gap-2">
		<img
			src={ResetujIkona}
			alt=""
			on:click={resetujPlatno}
			style={serazuje ? "filter: contrast(0.1)" : ""}
			class={serazuje ? "cursor-default" : "cursor-pointer"}
		/>
	</div>
</div>
