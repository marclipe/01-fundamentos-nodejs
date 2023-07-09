import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async(req, res) => {
  const { method, url } = req;

  await json(req, res);

  // método find() em um array chamado routes para procurar um objeto que atenda a duas condições
  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

	//Caso eu encontre uma rota eu vou retornar handler passando o que ela precisa receber que é o req e res 
  if(route) {
		return route.handler(req, res)
	} 

  return res.writeHead(404).end();
})

server.listen(3333)
