CREATE TABLE IF NOT EXISTS "users" (
	"id" bigserial NOT NULL UNIQUE,
	"user_id" varchar(100) NOT NULL UNIQUE,
	"displayname" varchar(100) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "friends" (
	"id" bigserial NOT NULL UNIQUE,
	"user_id" bigint NOT NULL,
	"friend_id" bigint NOT NULL,
	"approved" boolean NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	PRIMARY KEY ("id"),
    UNIQUE ("user_id", "friend_id")
);

CREATE TABLE IF NOT EXISTS "sessions" (
	"id" bigserial NOT NULL UNIQUE,
	"user_id" bigint NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "groups" (
	"id" bigserial NOT NULL UNIQUE,
	"group_name" varchar(100) NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "group_members" (
	"id" bigserial NOT NULL UNIQUE,
	"group_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
    "created_at" timestamp with time zone NOT NULL,
    UNIQUE ("group_id", "user_id"),
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "voice_files" (
	"id" bigserial NOT NULL UNIQUE,
	"sender_id" bigint NOT NULL,
	"receiver_id" bigint NOT NULL,
	"file_name" varchar(255) NOT NULL,
	"s3_key" varchar(255) NOT NULL,
	"first_played_at" timestamp with time zone,
	"play_flag" boolean NOT NULL DEFAULT true,
	"sent_at" timestamp with time zone NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "players" (
	"id" bigserial NOT NULL UNIQUE,
	"user_id" bigint NOT NULL,
	"player_id" varchar(255) NOT NULL,
	"created_at" timestamp with time zone NOT NULL,
	PRIMARY KEY ("id"),
    UNIQUE ("user_id", "player_id")
);


ALTER TABLE "friends" ADD CONSTRAINT "friends_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "friends" ADD CONSTRAINT "friends_fk2" FOREIGN KEY ("friend_id") REFERENCES "users"("id");
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "group_members" ADD CONSTRAINT "group_members_fk1" FOREIGN KEY ("group_id") REFERENCES "groups"("id");

ALTER TABLE "group_members" ADD CONSTRAINT "group_members_fk2" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "voice_files" ADD CONSTRAINT "voice_files_fk1" FOREIGN KEY ("sender_id") REFERENCES "users"("id");

ALTER TABLE "voice_files" ADD CONSTRAINT "voice_files_fk2" FOREIGN KEY ("receiver_id") REFERENCES "users"("id");
ALTER TABLE "players" ADD CONSTRAINT "players_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");