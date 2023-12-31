import { SvelteKitAuth } from '@auth/sveltekit';
import GitHub from '@auth/core/providers/github';
import { GITHUB_ID, GITHUB_SECRET } from '$env/static/private';
import {
	redirect,
	type Handle,
	type RequestEvent,
	type ResolveOptions,
	type MaybePromise
} from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { conn } from '$lib/db/conn.server';
import { Users } from '$lib/db/schema';
import { eq } from 'drizzle-orm';
async function authorization({
	event,
	resolve
}: {
	event: RequestEvent;
	resolve: (event: RequestEvent, opts?: ResolveOptions) => MaybePromise<Response>;
}) {
	// Protect any routes under /authenticated
	if (event.url.pathname.startsWith('/todos')) {
		const session = await event.locals.getSession();
		if (!session) {
			throw redirect(303, '/');
		}

		console.log('alley');
		if (session.user?.email) {
			console.log('oop');
			const users = await conn.select().from(Users).where(eq(Users.email, session.user.email));
			if (users.length) {
				event.locals.user = users[0];
			} else {
				const user = await conn.insert(Users).values({ email: session.user.email }).returning();
				event.locals.user = user;
			}
		}
	}

	// If the request is still here, just proceed as normally
	return resolve(event);
}

// First handle authentication, then authorization
// Each function acts as a middleware, receiving the request handle
// And returning a handle which gets passed to the next function
export const handle: Handle = sequence(
	SvelteKitAuth({
		providers: [GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET })]
	}),
	authorization
);
