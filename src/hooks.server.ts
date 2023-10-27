import { SvelteKitAuth } from '@auth/sveltekit';

import { authOptions } from '$lib/utils/auth';

export const handle = SvelteKitAuth(authOptions);
