<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import PozastavIkona from "../assets/pozastav_ikona.svg";
	import ZacniIkona from "../assets/zacni_ikona.svg";

	let pozastaveno = true;

	export let algoritmy: string[];

	export let vybranyAlgoritmus: string;

	const dispecer = createEventDispatcher();

	const zmenaAlgoritmu = () => {
		dispecer("zmenaAlgoritmu", vybranyAlgoritmus);
	};
</script>

<div class="w-full h-full flex flex-row justify-between items-center p-8">
	<div class="bg-gray-200 flex row gap-2" />
	<div class=" h-10 flex row gap-2">
		<label for="">Algoritmus</label>
		<select name="alogoritmy" bind:value={vybranyAlgoritmus} on:change={zmenaAlgoritmu}>
			{#each algoritmy as algoritmus}
				<option value={algoritmus}>{algoritmus}</option>
			{/each}
		</select>
	</div>
	<div class="bg-gray-200 h-10" />
</div>
