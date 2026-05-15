import "reflect-metadata";
import {DataSource} from "typeorm";
import { Utilizador } from "../models/utilizador";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: process.env.DATABASE_file ||"database.sqlite",
    synchronize: true,
    entities: [Utilizador], //diz ao  banco de dados que a tabela Utilizador  existe
    subscribers:[],
    migrations: [],
});