export function parseCurrency(value: number) {
	return new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL'
	}).format(value);
}

export function parseDate(date?: Date | null) {
	if(!date) return date;

	return date.toISOString().split('T')[0];
}
