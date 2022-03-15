import type { Blok, SeraditelnyObjekt } from "../types";
import { zamen } from "../util";
import { ZakladniSerazovac } from "./ZakladniSerazovac";

export class ShellSort implements ZakladniSerazovac {
	*serad(list: Blok[]): Generator<Blok[], Blok[]> {
		let mezera = list.length;
		list = [...list];
		while (mezera > 0) {
			let i = 0;
			let j = mezera;

			while (j < list.length) {
				if (list[i].poradi > list[j].poradi) {
					zamen(list, i, j);

					list[i].zvyrazneny = true;
					list[j].zvyrazneny = true;

					yield list;

					list[i].zvyrazneny = false;
					list[j].zvyrazneny = false;
				}

				i += 1;
				j += 1;

				let k = i;
				while (k - mezera > -1) {
					const indexSMezerou = k - mezera;

					if (list[indexSMezerou].poradi > list[k].poradi) {
						zamen(list, k, k - mezera);

						list[k].zvyrazneny = true;
						list[indexSMezerou].zvyrazneny = true;

						yield list;

						list[k].zvyrazneny = false;
						list[indexSMezerou].zvyrazneny = false;
					}

					k -= 1;
				}
			}

			mezera = Math.floor(mezera / 2);
		}

		yield list;
		return list;
	}
}
