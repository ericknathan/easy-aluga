export type VehicleModel = {
	id: string;
	title: string;
	description: string;
	brand: string;
	image: string;
	month_value: number;
	fuel: string;
	tags: {
		name: string;
		icon: string;
	}[];
	colors: string[];
	reservation: VehicleReservationModel;
};

export type VehicleReservationModel = {
	from: string;
	to: string;
	payment: string;
	location: string;
};
