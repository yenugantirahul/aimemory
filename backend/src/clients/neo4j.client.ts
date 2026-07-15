import neo4j from "neo4j-driver";

 const driver = neo4j.driver(
  process.env.NEO4J_URI!,
  neo4j.auth.basic(
    process.env.NEO4J_USERNAME!,
    process.env.NEO4J_PASSWORD!
  )
);

interface Relationship {
  relation: string;
  entity: string;
  entityType: string;
}

export const neo4jService = {
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

  async search(userId: string) {
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
          `,
          { userId },
        ),
      );

      return result.records.map((record) => ({
        relation: record.get("relation"),
        entity: record.get("entity"),
        entityType: record.get("entityType"),
      }));
    } finally {
      await session.close();
    }
  },
};
