<script lang="ts">
	import { PLATNO_CONTEXT } from "../lib/util";

	import { getContext } from "svelte";

	import { SerazovaciPlatno } from "../lib/serazovac";

	let algoritmy: string[] = [];
	let platno: SerazovaciPlatno;
	let vybranyAlgoritmus: string;
	let vybranaRychlost: number;
	let vybranaSirka: number;
	let serazuje = false;

	const priNacteniPlatna = getContext(PLATNO_CONTEXT) as any;

	priNacteniPlatna((novePlatno: SerazovaciPlatno) => {
		platno = novePlatno;

		ziskejVychoziHodnoty();

		platno.poslouchej("zastaveni", () => {
			serazuje = false;
		});

		platno.poslouchej("pokracovani", () => {
			serazuje = true;
		});
	});

	const ziskejVychoziHodnoty = () => {
		algoritmy = platno.algoritmy;
		vybranyAlgoritmus = platno.algoritmus;

		vybranaRychlost = platno.rychlost;
	};

	const zmenaAlgoritmu = () => {
		platno.zmenAlgortimus(vybranyAlgoritmus as any);
	};

	const zmenaRychlosti = () => {
		platno.zmenRychlost(vybranaRychlost);
	};

	const zmenaSirky = () => {
		platno.zmenSirkuBloku(vybranaSirka);
	};
</script>

<div
	class="w-full h-full flex flex-row justify-between items-center p-8 {platno
		? ''
		: 'hidden'}"
>
	<div class="bg-gray-200 flex row gap-2" />
	<div class=" h-10 flex row gap-2">
		<div>
			<label for="">Algoritmus</label>
			<select
				name="algoritmy"
				disabled={serazuje}
				bind:value={vybranyAlgoritmus}
				on:change={zmenaAlgoritmu}
			>
				{#each algoritmy as algoritmus}
					<option value={algoritmus}>{algoritmus}</option>
				{/each}
			</select>
		</div>
		<div>
			<label for="">Rychlost</label>
			<input
				type="range"
				max="50"
				min="1"
				on:change={zmenaRychlosti}
				bind:value={vybranaRychlost}
			/>
		</div>

		<div>
			<label for="">Sirka Bloku</label>
			<input
				type="range"
				max="40"
				min="2"
				disabled={serazuje}
				on:change={zmenaSirky}
				bind:value={vybranaSirka}
			/>
		</div>
	</div>
	<div class="bg-gray-200 h-10" />
</div>
