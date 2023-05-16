interface Config {
  jwtSecret: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
  spaceEndpoint: string;
  databaseUser: string;
  databasePassword: string;
  databaseName: string;
  databaseHost: string;
}

export const config: Config = {
  jwtSecret: process.env.JWT_SECRET || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
  databaseHost: process.env.DATABASE_HOST || "",
  databaseUser: process.env.DATABASE_USER || "",
  databasePassword: process.env.DATABASE_PASSWORD || "",
  databaseName: process.env.DATABASE_NAME || "",
};
