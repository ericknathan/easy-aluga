import { getSession } from '@auth/sveltekit';
import type { UserPreferences } from '@prisma/client';
import type { RequestHandler } from './$types';

import prisma from '$lib/database/client';
import { authOptions } from '$lib/utils/auth';

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as Partial<UserPreferences> & {
		name?: string;
		email?: string;
	};
	const session = await getSession(request, authOptions);

	console.log({ body, session });

	if (body.birthDate) body.birthDate = new Date(body.birthDate);
	if (body.minPassengers) body.minPassengers = Number(body.minPassengers);
	if (body.distanceRange) body.distanceRange = Number(body.distanceRange);

	if (body.email) delete body.email;

	if (body.name) {
		await prisma.user.update({
			where: {
				id: session!.user!.id
			},
			data: {
				name: body.name
			}
		});

		delete body.name;
	}

	const userPreferences = await prisma.userPreferences.findUnique({
		where: {
			userId: session!.user!.id
		}
	});

	if (!userPreferences) {
		await prisma.userPreferences.create({
			data: {
				userId: session!.user!.id,
				...body
			}
		});
	} else {
		await prisma.userPreferences.update({
			where: {
				userId: session!.user!.id
			},
			data: body
		});
	}

	return new Response(null, { status: 204 });
};
