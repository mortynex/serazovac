import type { Blok } from "../types";
import { ZakladniSerazovac } from "./ZakladniSerazovac";

export class BubbleSort extends ZakladniSerazovac {
	*serad(list: Blok[]) {
		list = [...list];

		let index = 0;
		let jeSerazeno = false;
		let nalezenaChyba = false;

		while (jeSerazeno === false) {
			const dalsiIndex = index + 1;
			const dalsiBlok = list[dalsiIndex];
			if (!dalsiBlok) {
				if (nalezenaChyba === false) {
					jeSerazeno = true;
				} else {
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
		return;
	}
}
