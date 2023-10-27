import type { SvelteKitAuthConfig } from '@auth/sveltekit';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

import Google from '@auth/core/providers/google';

import { prisma } from '$lib/database/client';
import { PrismaAdapter } from '@auth/prisma-adapter';
import type { User } from '@auth/core/types';

export const authOptions: SvelteKitAuthConfig = {
	adapter: PrismaAdapter(prisma),
	providers: [
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET,
			authorization: {
				params: {
					prompt: 'consent',
					access_type: 'offline',
					response_type: 'code'
				}
			}
		})
	],
  callbacks: {
    async session({ session, user }) {
      session.user = {
        ...session.user,
        id: user.id
      } as User;

      return session;
    }
  }
};
