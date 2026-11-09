DROP INDEX "message_userId_idx";--> statement-breakpoint
CREATE INDEX "message_userId_createdAt_idx" ON "message" USING btree ("user_id","created_at","id");