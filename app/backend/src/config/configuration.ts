export default () => ({
  app: {
    port: parseInt(process.env.PORT ?? '3000', 10),
  },

  jwt: {
    secret: process.env.JWT_SECRET!,
  },

  database: {
    url: process.env.DATABASE_URL!,
  },
});
