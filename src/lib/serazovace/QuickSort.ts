import type { Blok, SeraditelnyObjekt } from "../types";
import { zamen } from "../util";
import { ZakladniSerazovac } from "./ZakladniSerazovac";

function* rozdel(list: Blok[], zacatek: number, konec: number) {
	console.log({ zacatek, konec });
	const pivot = list[Math.floor((zacatek + konec) / 2)].poradi;

	let levyIndex = zacatek - 1;
	let pravyIndex = konec + 1;
	while (true) {
		do {
			levyIndex += 1;
		} while (list[levyIndex].poradi < pivot);

		do {
			pravyIndex -= 1;
		} while (list[pravyIndex].poradi > pivot);

		if (levyIndex >= pravyIndex) {
			return pravyIndex;
		}

		zamen(list, pravyIndex, levyIndex);

		list[pravyIndex].zvyrazneny = true;
		list[levyIndex].zvyrazneny = true;

		yield list;

		list[pravyIndex].zvyrazneny = false;
		list[levyIndex].zvyrazneny = false;
	}
}

export class QuickSort implements ZakladniSerazovac {
	*serad(list: Blok[], zacatek?: number, konec?: number): Generator<Blok[], Blok[]> {
		if (zacatek === undefined) {
			zacatek = 0;
		}
		if (konec === undefined) {
			konec = list.length - 1;
		}

		if (zacatek < 0 || konec < 0 || zacatek >= konec) {
			yield list;
			return;
		}
		let pulka: number;
		const rozdelovac = rozdel(list, zacatek, konec);

		while (true) {
			const { value, done } = rozdelovac.next();

			if (done) {
				pulka = value as number;
				//console.log("nova pulka", pulka);
				break;
			} else {
				yield value as any;
			}
		}
		console.log("broke out");

		yield* this.serad(list, zacatek, pulka);
		yield* this.serad(list, pulka + 1, konec);
	}
}
