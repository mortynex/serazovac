import type { Blok, SeraditelnyObjekt } from "../types";
import { ZakladniSerazovac } from "./ZakladniSerazovac";

export class RadixSort implements ZakladniSerazovac {
	*serad(list: Blok[]) {
		list = [...list];

		let pocetCislic = this.ziskejNejvetsiCislo(list);

		for (let pozice = 1; pozice < String(pocetCislic).length + 1; pozice++) {
			yield* this.seradPocitanim(list, pozice);
		}

		yield list;
		return list;
	}

	private *seradPocitanim(list: Blok[], pozice: number) {
		const soucet: number[] = new Array(10).fill(0);

		for (let i = 0; i < list.length; i++) {
			const cisloNaPozici = this.ziskejCisloNaPozici(list[i].poradi, pozice);

			soucet[cisloNaPozici] += 1;
		}

		for (let i = 1; i < soucet.length; i++) {
			soucet[i] += soucet[i - 1];
		}

		const vyslednyList = new Array(soucet[9]).fill(null);

		for (let i = 0; i < list.length; i++) {
			const cisloNaPozici = this.ziskejCisloNaPozici(list[i].poradi, pozice);

			const index = soucet[cisloNaPozici] - 1;

			vyslednyList[index] = list[i];
		}

		for (let i = 0; i < list.length; i++) {
			list[i] = vyslednyList[i];
		}

		yield list;
		return;
	}

	private ziskejNejvetsiCislo(list: Blok[]) {
		return list.reduce((nejvetsiCislo, { poradi: aktualniCislo }) => {
			if (aktualniCislo > nejvetsiCislo) {
				nejvetsiCislo = aktualniCislo;
			}

			return nejvetsiCislo;
		}, 0);
	}

	private ziskejCisloNaPozici(cislo: number, pozice: number) {
		return Number(String(cislo).split("").reverse()[pozice - 1] ?? 0);
	}
}
