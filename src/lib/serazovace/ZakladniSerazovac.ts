import { Blok, SeraditelnyObjekt } from "../types";

export interface ZakladniSerazovac {
	serad(list: Blok[], ...any): Generator<Blok[], Blok[]>;
}
