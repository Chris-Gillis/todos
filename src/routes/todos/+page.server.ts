import { conn } from '$lib/db/conn.server.ts';
import { Todos } from '$lib/db/schema.ts';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function load({ locals }) {
	const session = await locals.getSession();
	if (!session?.user) {
		throw redirect(303, '/');
	}
	const user = locals.user;

	return {
		streamed: {
			todos: conn.select().from(Todos).where(eq(Todos.userId, user.id))
		}
	};
}
