CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial NOT NULL,
	"text" text NOT NULL,
	"done" boolean NOT NULL,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"email" text NOT NULL,
	"id" serial NOT NULL
);
