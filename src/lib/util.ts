export const ziskejVelikost = (element: HTMLElement) => {
	const { width, height } = getComputedStyle(element);

	return {
		width: parseFloat(width),
		height: parseFloat(height),
	};
};

// pouziva moderni Durstenfeld verzi Fisher-Yates michaciho algoritmu
export const zamichejList = (tlist: any[]) => {
	let list = [...tlist]; // zkopiruje list

	for (let i = list.length - 1; i > 0; i--) {
		const nahodnyIndex = Math.floor(Math.random() * (i + 1));

		// zamění puvodni hodnotu s jinou hodnotou ktera je nahodne vybrana
		[list[i], list[nahodnyIndex]] = [list[nahodnyIndex], list[i]];
	}

	return list;
};
