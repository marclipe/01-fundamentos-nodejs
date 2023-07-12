///users/:id
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g
  const pathWithParams = path.replaceAll(routeParametersRegex, '(?<$1>[a-z0-9\-_]+)')

  //Preciso colocar depois da verificação que a gente já havia feito
  //E deixo (?<query>)? uso interrogação pois é opcional
  //uso o cifrão $ para termina com a verificação 
  //(.*) é para pegar tudo (qualquer caractere) que vem depois de interrogação
  const pathRegex = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegex
}