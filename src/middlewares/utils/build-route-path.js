///users/:id
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  //Vou pegar minha regex e substituir por uma string
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  //Preciso que a minha regex comece com pathWithParams 
  const pathRegex = new RegExp(`^${pathWithParams}`);

  return pathRegex
}