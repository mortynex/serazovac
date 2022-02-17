<script lang="ts">
	import { zamichejList, ziskejVelikost } from "../lib/util";
	import { createRainbow } from "rainbow-color";
	import { rgbHex } from "color-map";
	import { onMount } from "svelte";

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	const kalibrovatPlatno = () => {
		const { width: sirkaPlatna, height: vyskaPlatna } = ziskejVelikost(
			canvas.parentElement
		);

		const DPR = window.devicePixelRatio || 1;

		canvas.width = Math.floor(sirkaPlatna) * DPR;
		canvas.height = Math.floor(vyskaPlatna) * DPR;

		ctx.scale(DPR, DPR);
	};

	onMount(() => {
		ctx = canvas.getContext("2d");

		kalibrovatPlatno();

		const krok = 5;
		const pocetBloku = Math.floor(canvas.width / krok);
		const skok = Math.floor(canvas.height / pocetBloku);

		const duha = createRainbow(pocetBloku);

		const bloky = Array(pocetBloku)
			.fill(null)
			.map((_, index) => {
				return {
					vyska: index * skok,
					index,
					barva: rgbHex(duha[index]),
				};
			});

		const zamichaneBloky = zamichejList(bloky);

		let i = 0;
		for (const { vyska, index, barva } of zamichaneBloky) {
			ctx.fillStyle = barva;
			ctx.fillRect(i * krok, canvas.height - vyska, krok, vyska);
			i++;
		}
	});
</script>

<svelte:window on:resize={() => kalibrovatPlatno()} />
<div class="w-full h-full overflow-hidden">
	<canvas bind:this={canvas} />
</div>
