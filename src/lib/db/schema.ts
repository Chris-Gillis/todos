import { text, boolean, pgTable, integer, serial } from 'drizzle-orm/pg-core';

export const Todos = pgTable('todos', {
	id: serial('id').notNull(),
	text: text('text').notNull(),
	done: boolean('done').notNull(),
	userId: integer('user_id').notNull()
});

export const Users = pgTable('users', {
	email: text('email').notNull(),
	id: serial('id').notNull()
});
