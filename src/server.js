import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQueryParams } from './utils/extract-query-params.js';

const server = http.createServer(async(req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url)
  });

  if(route) {
    const routeParams = req.url.match(route.path);

    //Para enviar search params como MarcLipe
    // console.log(extractQueryParams(routeParams.groups.query));
    //Vou mudar a lógica de dentro dos meus grupos para pegar meus query params e todo o resto uso em uma variável chamada params para os route params
    const { query, ...params } = routeParams.groups
    //E uso as minhas duas variáveis
    req.params = params
    //Se o meu query estiver vazio eu retorno um query um objeto vazio
    req.query = query ? extractQueryParams(query) : {}

    req.params = { ...routeParams.groups };
    return route.handler(req, res);
  } 

  return res.writeHead(404).end();
})

server.listen(3333)
