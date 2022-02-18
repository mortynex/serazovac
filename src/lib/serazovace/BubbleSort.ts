import type { Blok, SeraditelnyObjekt } from "../types";
import { ZakladniSerazovac } from "./ZakladniSerazovac";

export class BubbleSort implements ZakladniSerazovac {
	*serad<Objekt extends SeraditelnyObjekt>(
		list: Objekt[]
	): Generator<Objekt[], Objekt[]> {
		list = [...list];

		let index = 0;
		let jeSerazeno = false;
		let nalezenaChyba = false;

		while (jeSerazeno === false) {
			const dalsiIndex = index + 1;
			const dalsiBlok = list[dalsiIndex];
			if (!dalsiBlok) {
				// pokud za posledni kolo nebyla nalezena chyba v poradi, list je serazeny
				if (nalezenaChyba === false) {
					jeSerazeno = true;
				}
				// pokud za posledni kolo byla chyba, pujdeme na dalsi kolo
				else {
					index = 0;
					nalezenaChyba = false;
				}

				continue;
			}

			const { poradi: dalsiPoradi } = dalsiBlok;
			const { poradi } = list[index];
			// pokud je dalsi cislo mensi nez soucasne, vymen je
			if (poradi > dalsiPoradi) {
				[list[index], list[dalsiIndex]] = [list[dalsiIndex], list[index]];

				nalezenaChyba = true;

				yield list;
			}

			index++;
		}

		yield list;
		return list;
	}
}
