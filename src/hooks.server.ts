import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

import Google from '@auth/core/providers/google';
import { SvelteKitAuth } from '@auth/sveltekit';

export const handle = SvelteKitAuth({
	providers: [Google({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, authorization: {
		params: {
			prompt: "consent",
			access_type: "offline",
			response_type: "code"
		}
	} })]
});
