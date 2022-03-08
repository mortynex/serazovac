export class Dispecer<Eventy extends Record<string, any[]>> {
	private poslouchaci = new Map();

	private ziskejPoslouchace(jmenoEventu: keyof Eventy) {
		return this.poslouchaci.get(jmenoEventu) ?? [];
	}

	rozesli<Jmeno extends keyof Eventy>(jmenoEventu: Jmeno, ...argumenty: Eventy[Jmeno]) {
		const listPosluchacu = this.ziskejPoslouchace(jmenoEventu);

		for (const poslouchac of listPosluchacu) {
			poslouchac(...argumenty);
		}
	}

	poslouchej<Jmeno extends keyof Eventy>(
		jmenoEventu: Jmeno,
		poslouchac: (...argumenty: Eventy[Jmeno]) => any
	) {
		const listPosluchacu = this.ziskejPoslouchace(jmenoEventu);

		listPosluchacu.push(poslouchac);

		this.poslouchaci.set(jmenoEventu, listPosluchacu);
	}
}
