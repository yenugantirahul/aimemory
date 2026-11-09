import neo4j from "neo4j-driver";
import { env } from "../config/env.js";
import { Relationship, relationshipSchema } from "../schemas/memory.schema.js";

 const driver = neo4j.driver(
  env.NEO4J_URI,
  neo4j.auth.basic(
    env.NEO4J_USERNAME,
    env.NEO4J_PASSWORD
  )
);

// Caps how many facts get pulled into each prompt.
const MAX_RELATIONS = 50;

export const neo4jService = {
  // Without these, every lookup and MERGE scans all nodes of the label.
  async setup(): Promise<void> {
    const session = driver.session();

    try {
      await session.run(
        "CREATE CONSTRAINT user_id_unique IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE",
      );
      await session.run(
        "CREATE INDEX entity_name_type IF NOT EXISTS FOR (e:Entity) ON (e.name, e.type)",
      );
    } finally {
      await session.close();
    }
  },

  async insert(userId: string, relationships: Relationship[]): Promise<void> {
    const session = driver.session();

    try {
      await session.executeWrite(async (tx) => {
        // Create user node
        await tx.run(
          `
          MERGE (u:User {id: $userId})
          `,
          { userId },
        );

        // Create entities and relationships
        for (const rel of relationships) {
          await tx.run(
            `
            MERGE (u:User {id: $userId})

            MERGE (e:Entity {
              name: $entity,
              type: $entityType
            })

            MERGE (u)-[:HAS_RELATION {
              type: $relation
            }]->(e)
            `,
            {
              userId,
              entity: rel.entity,
              entityType: rel.entityType,
              relation: rel.relation,
            },
          );
        }
      });
    } finally {
      await session.close();
    }
  },

  async search(userId: string): Promise<Relationship[]> {
    const session = driver.session();

    try {
      const result = await session.executeRead((tx) =>
        tx.run(
          `
          MATCH (u:User {id:$userId})-[r:HAS_RELATION]->(e)

          RETURN
            r.type AS relation,
            e.name AS entity,
            e.type AS entityType

          LIMIT $limit
          `,
          { userId, limit: neo4j.int(MAX_RELATIONS) },
        ),
      );

      // Drop rows with missing/non-string properties instead of failing the chat.
      return result.records.flatMap((record) => {
        const relationship = relationshipSchema.safeParse({
          relation: record.get("relation"),
          entity: record.get("entity"),
          entityType: record.get("entityType"),
        });
        return relationship.success ? [relationship.data] : [];
      });
    } finally {
      await session.close();
    }
  },
};
