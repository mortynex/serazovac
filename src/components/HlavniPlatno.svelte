<script lang="ts">
	import { zamichejList, ziskejVelikost } from "../lib/util";
	import { createRainbow } from "rainbow-color";
	import { rgbHex } from "color-map";
	import { createEventDispatcher, onMount } from "svelte";
	import type { Blok } from "../lib/types";
	import { BubbleSort } from "../lib/serazovace/BubbleSort";
	import { QuickSort } from "../lib/serazovace/QuickSort";
	import { RadixSort } from "../lib/serazovace/RadixSort";
	import { SerazovaciPlatno } from "../lib/serazovac";

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	export let platno: SerazovaciPlatno;

	const dispecer = createEventDispatcher();

	onMount(() => {
		platno = new SerazovaciPlatno(canvas);

		dispecer("nacteni");
	});

	const zmenaSirky = () => {
		platno.kalibruj();
		platno.resetuj();
	};
</script>

<svelte:window on:resize={zmenaSirky} />
<div class="w-full h-full overflow-hidden">
	<canvas bind:this={canvas} />
</div>
