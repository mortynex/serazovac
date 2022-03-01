import { rgbHex } from "color-map";
import { createRainbow } from "rainbow-color";
import { BubbleSort } from "../serazovace/BubbleSort";
import { QuickSort } from "../serazovace/QuickSort";
import { ZakladniSerazovac } from "../serazovace/ZakladniSerazovac";
import { Blok } from "../types";
import { zamichejList, ziskejVelikost } from "../util";

export class SerazovaciPlatno {
	private ctx: CanvasRenderingContext2D;
	private bloky: Blok[];

	private sirkaBloku: number = 5;

	constructor(private canvas: HTMLCanvasElement) {
		this.ctx = canvas.getContext("2d");

		this.kalibruj();

		this.udelejBloky();

		this.vykresli();
	}

	kalibruj() {
		const { width: sirkaPlatna, height: vyskaPlatna } = ziskejVelikost(
			this.canvas.parentElement
		);

		const DPR = window.devicePixelRatio || 1;

		this.canvas.width = Math.floor(sirkaPlatna) * DPR;
		this.canvas.height = Math.floor(vyskaPlatna) * DPR;

		this.ctx.scale(DPR, DPR);
	}

	private get sirka() {
		const DPR = window.devicePixelRatio || 1;

		return this.canvas.width / DPR;
	}

	private get vyska() {
		const DPR = window.devicePixelRatio || 1;

		return this.canvas.height / DPR;
	}

	vygenerujBloky() {
		const pocetBloku = Math.floor(this.sirka / this.sirkaBloku);
		const vyskoveSkoky = Math.floor(this.vyska / pocetBloku);

		const duha = createRainbow(pocetBloku);

		this.bloky = Array(pocetBloku)
			.fill(null)
			.map<Blok>((_, poradi) => {
				return {
					vyska: poradi * vyskoveSkoky,
					poradi,
					barva: rgbHex(duha[poradi]),
					zvyrazneny: false,
				};
			});
	}

	zamichejBloky() {
		this.bloky = zamichejList(this.bloky);
	}

	vykresli() {
		this.ctx.clearRect(0, 0, this.sirka, this.vyska);

		let i = 0;
		for (let { vyska, barva, zvyrazneny } of this.bloky) {
			this.ctx.fillStyle = zvyrazneny ? "#ff007f" : barva;

			vyska = zvyrazneny ? this.vyska : vyska;
			const x = i * this.sirkaBloku;
			const y = this.vyska - vyska;

			const sirka = this.sirkaBloku;

			this.ctx.fillRect(x, y, sirka, vyska);

			i++;
		}
	}

	private algoritmus: ZakladniSerazovac = new QuickSort();
	private rychlost: number = 1;

	private serazuj(serazovac: Generator, dalsiSekvence: () => any) {
		let hotovo = false;
		let noveBloky;

		for (let i = 0; i < this.rychlost; i++) {
			const { value, done } = serazovac.next();

			if (value) {
				noveBloky = value;
			}

			if (done === true) {
				hotovo = true;
			}
		}

		if (hotovo) {
			return false;
		}

		this.bloky = noveBloky;

		this.vykresli();

		dalsiSekvence();
	}

	public serazuje: boolean = false;

	zmenAlgortimus() {}

	zastav() {
		this.serazuje = false;
	}

	resetuj() {
		this.zamichejBloky();

		this.zastav();
	}

	private aktualniSerazovac: Generator;

	pokracuj() {
		this.serazuje = true;
		const sekvence = () => {
			if (this.serazuje === false) {
				return;
			}

			this.serazuj(this.aktualniSerazovac, () => {
				requestAnimationFrame(sekvence);
			});
		};

		requestAnimationFrame(sekvence);
	}

	udelejBloky() {
		this.vygenerujBloky();
		this.zamichejBloky();

		this.aktualniSerazovac = this.algoritmus.serad(this.bloky);
	}

	zacni() {
		this.serazuje = true;

		this.aktualniSerazovac = this.algoritmus.serad(this.bloky);

		this.pokracuj();
	}

	zmenRychlost() {}

	zmenSirkuBloku() {}
}
