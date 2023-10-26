import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

import { companyData } from '$lib/stores';
import type { CompanyModel, VehicleModel } from '$lib/types';

import companies from '$lib/database/companies.json';

export const load: LayoutLoad = async ({ params, fetch, url }) => {
	const company = companies.find((company) => company.id === params.slug) as CompanyModel;

	const vehiclesResponse = await fetch(`/assets/companies/${params.slug}/vehicles/list.json`);
	const vehicles = (await vehiclesResponse.json()) as VehicleModel[];

	if (company) {
		companyData.setCompany(company);
		companyData.setVehicles(vehicles);

		return {
			company,
			vehicles,
			url: url.pathname
		};
	}

	throw error(404, 'Not found');
};
