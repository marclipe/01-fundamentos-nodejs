///users/:id
export function buildRoutePath(path) {
  const routeParametersRegex = /:([a-zA-Z]+)/g

  //Para conferir se a regex deu certo
  console.log(Array.from(path.matchAll(routeParametersRegex)))
}