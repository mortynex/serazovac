<script lang="ts">
	import { zamichejList, ziskejVelikost } from "../lib/util";
	import { createRainbow } from "rainbow-color";
	import { rgbHex } from "color-map";
	import { onMount } from "svelte";
	import type { Blok } from "../lib/types";
	import { BubbleSort } from "../lib/serazovace/BubbleSort";
	import { QuickSort } from "../lib/serazovace/QuickSort";

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

	const vytvorBlocky = (pocetBloku: number, vyskoveSkoky: number): Blok[] => {
		const duha = createRainbow(pocetBloku);

		return Array(pocetBloku)
			.fill(null)
			.map((_, poradi) => {
				return {
					vyska: poradi * vyskoveSkoky,
					poradi,
					barva: rgbHex(duha[poradi]),
					zvyrazneny: false,
				};
			});
	};

	const vykresliBloky = (bloky: Blok[]) => {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let i = 0;
		for (let { vyska, barva, zvyrazneny } of bloky) {
			ctx.fillStyle = zvyrazneny ? "#ff007f" : barva;

			vyska = zvyrazneny ? canvas.height : vyska;
			const x = i * horizontalniSkok;
			const y = canvas.height - vyska;

			const sirka = horizontalniSkok;

			ctx.fillRect(x, y, sirka, vyska);

			i++;
		}
	};

	export let horizontalniSkok = 2;

	onMount(() => {
		ctx = canvas.getContext("2d");

		kalibrovatPlatno();

		main();
	});

	const main = () => {
		kalibrovatPlatno();

		const pocetBloku = Math.floor(canvas.width / horizontalniSkok);
		const vyskovySkok = Math.floor(canvas.height / pocetBloku);

		const bloky = vytvorBlocky(pocetBloku, vyskovySkok);

		const zamichaneBloky = zamichejList(bloky);

		vykresliBloky(zamichaneBloky);

		const serazovac = new QuickSort().serad(zamichaneBloky);

		const krok = () => {
			let preskocene: Blok[];
			/*for (let i = 0; i < 1; i++) {
				const { value } = serazovac.next();
				if (value) {
					preskocene = value;
				}
			}*/

			let { value, done } = serazovac.next();
			if (done && !preskocene) {
				console.log(`HOTOVO`);
				//console.log({ value });
				return;
			} else if (done && preskocene) {
				value = preskocene;
			}

			if (!value) {
				console.log("CHYBA");
				return;
			}
			console.log({ value });
			vykresliBloky(value);
			requestAnimationFrame(krok);
		};

		requestAnimationFrame(krok);
	};
</script>

<svelte:window on:resize={() => main()} />
<div class="w-full h-full overflow-hidden">
	<canvas bind:this={canvas} />
</div>
