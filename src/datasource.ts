import { DataSource } from "typeorm";

export const datasource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  logging: true,
  entities: ["./src/entities/*.ts"]
}); 