import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'

const server = http.createServer(async(req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    //Ao invés de verificar se é igual eu uso o método test
    //Toda regex tem um método chamado text: pathRegex.test que retorne true ou false
    //Aí passo a nossa url
    return route.method === method && route.path.test(url)
  });

  if(route) {
    //Agora eu quero ver os dados que a regex encontrou na minha rota
    const routeParameters = req.url.match(route.path)
    console.log(routeParameters)

		return route.handler(req, res)
	} 

  return res.writeHead(404).end();
})

server.listen(3333)
