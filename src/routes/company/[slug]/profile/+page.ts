import type { VehicleModel } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { vehicles } = await parent();

	const filteredVehicles = (vehicles || []).filter((vehicle) => vehicle.id !== 'main').slice(0, 3);
	const reservations: VehicleModel[] = [];

	if (filteredVehicles[0])
		reservations.push({
			...filteredVehicles[0],
			reservation: {
				from: '23/10/2023',
				to: '29/10/2023',
				payment: 'Visa **** **** 9857',
				location: 'Aeroporto de Congonhas'
			}
		});

	if (filteredVehicles[1])
		reservations.push({
			...filteredVehicles[1],
			reservation: {
				from: '14/06/2023',
				to: '26/06/2023',
				payment: 'Mastercard **** **** 1809',
				location: 'Unidade Barra Funda'
			}
		});

	if (filteredVehicles[2])
		reservations.push({
			...filteredVehicles[2],
			reservation: {
				from: '04/05/2023',
				to: '09/05/2023',
				payment: 'Amex **** **** 8291',
				location: 'Unidade Barra Funda'
			}
		});

	return {
		reservations
	};
};
