import sqlite3 from "sqlite3";
import path from "path";



export const conexionDB = () => {
    const ROOT_PATH = process.env.ROOT
    const DATABASE = process.env.DATABASE;
    const rutaDB = path.join(ROOT_PATH, "database", DATABASE);

    return new sqlite3.Database(rutaDB);
    
}



