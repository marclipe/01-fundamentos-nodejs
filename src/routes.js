import { Database } from "./database.js"; //importação .js por causa do type: module
import { randomUUID } from "node:crypto";

//Agora o importação do Banco de dados é nesse aquivo, assim com random UUID 
const database = new Database()

export const routes = [
  {
    method: 'GET', 
    path: '/users', 
    handler: (req, res) => {
      const users = database.select("users");

      return res.end(JSON.stringify(users));
    }
  }, 
  {
    method: 'POST', 
    path: '/users', 
    handler: (req, res) => {
      const { name, email } = req.body;
      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert("users", user);

      return res.writeHead(201).end();
    }
  }
]