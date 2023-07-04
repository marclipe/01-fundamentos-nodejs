import http from 'node:http'
import { json } from './middlewares/json.js'
import { Database } from './database.js'

//no lugar de user, agora database
const database = new Database

const server = http.createServer(async(req, res) => {
	const {method, url} = req

	await json(req, res)

	if(method === 'GET' && url === '/users') {
		//Na buscagem vou buscar a listagem de usuários na minha tabela
		const users = database.select('users');

		return res.end(JSON.stringify(users))
	} 

	if(method === 'POST' && url === '/users') {
		const { name, email } = req.body

		//Agora variável user
		const user = {
			id: 1,
			name,
			email
		};

		//já aparece as opções para mim
		//nome da tabela e nome da informação
		database.insert('users', user)

		return res.writeHead(201).end()
	}

	return res.writeHead(404).end()
})

server.listen(3333)
