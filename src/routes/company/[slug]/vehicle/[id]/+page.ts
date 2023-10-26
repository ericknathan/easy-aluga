import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, parent }) => {
	const { id: vehicleId } = params;
	const { vehicles } = await parent();

	const vehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

	if (vehicle) {
		return {
			vehicle
		};
	}

	throw error(404, 'Not found');
};
