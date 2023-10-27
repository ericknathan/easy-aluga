import prisma from '$lib/database/client.js';
import type { UserPreferences } from '@prisma/client';

export async function load(event) {
	const session = await event.locals.getSession();
	let preferences: UserPreferences | null = null;

	if (session?.user) {
		preferences = await prisma.userPreferences.findUnique({
			where: {
				userId: session.user.id
			}
		});
	}

	return {
		session,
		preferences,
		url: event.url.pathname
	};
}
