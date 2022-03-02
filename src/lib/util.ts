export const ziskejVelikost = (element: HTMLElement) => {
	const { width, height } = getComputedStyle(element);

	return {
		width: parseFloat(width),
		height: parseFloat(height),
	};
};

// pouziva moderni Durstenfeld verzi Fisher-Yates michaciho algoritmu
export const zamichejList = (list: any[]) => {
	list = [...list]; // zkopiruje list

	for (let i = list.length - 1; i > 0; i--) {
		const nahodnyIndex = Math.floor(Math.random() * (i + 1));

		// zamění puvodni hodnotu s jinou hodnotou ktera je nahodne vybrana
		zamen(list, i, nahodnyIndex);
	}

	return list;
};

export function* obalGeneratoru(gen: Generator) {
	while (true) {
		const { value, done } = gen.next();

		yield value;

		if (done) {
			break;
		}
	}
}
export const zamen = (list: any[], prvniIndex: number, druhyIndex: number) => {
	[list[prvniIndex], list[druhyIndex]] = [list[druhyIndex], list[prvniIndex]];
};

export const PLATNO_CONTEXT = "platnoContext___";
