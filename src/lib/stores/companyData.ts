import type { CompanyModel, VehicleModel } from '$lib/types';
import { writable } from 'svelte/store';

type CompanyData = CompanyModel & { vehicles?: VehicleModel[] };

const { set, subscribe, update } = writable<CompanyData>({} as CompanyData);

export const companyData = {
	set,
	subscribe,
	update,
	setCompany: (company: CompanyModel) => update((prevValue) => ({ ...prevValue, ...company })),
	setVehicles: (vehicles: VehicleModel[]) => update((prevValue) => ({ ...prevValue, vehicles })),
};
