import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Product } from "./entities/Product";
import { User } from "./entities/User";

dotenv.config();

export default new DataSource({
  type: "postgres",
  url: process.env.CONNECTION_STRING,
  entities: [Product, User],
  synchronize: true, // true will directly affect database changes, Not good for production
});
