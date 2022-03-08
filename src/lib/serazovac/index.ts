import { rgbHex } from "color-map";
import { createRainbow } from "rainbow-color";
import { Dispecer } from "../dispecer";
import { BubbleSort } from "../serazovace/BubbleSort";
import { QuickSort } from "../serazovace/QuickSort";
import { ZakladniSerazovac } from "../serazovace/ZakladniSerazovac";
import { Blok } from "../types";
import { zamichejList, ziskejVelikost } from "../util";
const algoritmy = {
	QuickSort: new QuickSort(),
	BubbleSort: new BubbleSort(),
};

export class SerazovaciPlatno extends Dispecer<{
	zastaveni: [];
	pokracovani: [];
	zmenaAlgoritmu: [string];
	zmenaRychlosti: [number];
	zmenaSirkuBloku: [number];
	resetovani: [];
	pripraven: [];
}> {
	private ctx: CanvasRenderingContext2D;
	private bloky: Blok[] = [];

	private sirkaBloku: number = 5;

	constructor(private canvas: HTMLCanvasElement) {
		super();

		this.ctx = canvas.getContext("2d");

		this.kalibruj();

		this.zmenAlgortimus("BubbleSort");
		this.udelejBloky();

		this.vykresli();

		this.rozesli("pripraven");
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
		console.log("vykresluju");
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
	private listAlgoritmu = algoritmy;

	get algoritmy() {
		return Object.keys(this.listAlgoritmu);
	}

	private aktualniAlgoritmus: string;

	get algoritmus() {
		return this.aktualniAlgoritmus;
	}

	private serazuj(serazovac: Generator, dalsiSekvence: () => any) {
		let hotovo = false;
		let noveBloky;

		for (let i = 0; i < this.aktualniRychlost; i++) {
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

	zmenAlgortimus(algoritmus: keyof typeof algoritmy) {
		this.aktualniAlgoritmus = algoritmus;

		this.updatujSerazovac();

		this.rozesli("zmenaAlgoritmu", algoritmus);
	}

	private zastavSerazovani() {
		this.serazuje = false;

		this.rozesli("zastaveni");
	}

	private pokracujVSerazovani() {
		this.serazuje = true;

		this.rozesli("pokracovani");
	}

	zastav() {
		this.zastavSerazovani();

		this.vycistiBloky();
	}

	resetuj() {
		this.udelejBloky();

		this.zastav();
	}

	private aktualniSerazovac: Generator;

	pokracuj() {
		this.pokracujVSerazovani();

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

	private updatujSerazovac() {
		this.vycistiBloky();

		this.aktualniSerazovac = this.listAlgoritmu[this.aktualniAlgoritmus].serad(
			this.bloky
		);
	}

	private vycistiBloky() {
		this.bloky = this.bloky.map<Blok>((blok) => {
			return {
				...blok,
				zvyrazneny: false,
			};
		});

		this.vykresli();
	}

	udelejBloky() {
		this.vygenerujBloky();
		this.zamichejBloky();

		this.updatujSerazovac();
	}

	private aktualniRychlost: number = 2;

	get rychlost() {
		return this.aktualniRychlost;
	}

	zmenRychlost(novaRychlost: number) {
		this.aktualniRychlost = novaRychlost;

		this.rozesli("zmenaRychlosti", novaRychlost);
	}

	zmenSirkuBloku(novaSirka: number) {
		this.sirkaBloku = novaSirka;
		this.udelejBloky();

		this.rozesli("zmenaSirkuBloku", novaSirka);
	}
}
