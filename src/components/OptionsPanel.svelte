<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import PozastavIkona from "../assets/pozastav_ikona.svg";
	import ZacniIkona from "../assets/zacni_ikona.svg";

	let pozastaveno = true;

	const dispečer = createEventDispatcher();

	const zacniPrehravat = () => {
		pozastaveno = false;

		dispečer("hraj");
	};

	const pozastavPrehravani = () => {
		pozastaveno = true;

		dispečer("nehraj");
	};
</script>

<div class="w-full h-full flex flex-row justify-between items-center p-8">
	<div class="bg-gray-200 flex row gap-2" />
	<div class=" h-10 flex row gap-2">
		{#if pozastaveno}
			<img src={ZacniIkona} alt="" class="cursor-pointer" on:click={zacniPrehravat} />
		{:else}
			<img
				src={PozastavIkona}
				alt=""
				class="cursor-pointer"
				on:click={pozastavPrehravani}
			/>
		{/if}
	</div>
	<div class="bg-gray-200 h-10" />
</div>
