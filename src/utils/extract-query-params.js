//será nesse formato: ?search=MarcLipe
///?search=MarcLipe&page=2 preciso tratar casos que tenha o &
export function extractQueryParams(query) {
  return query.substr(1).split("&").reduce((queryParams, param) => {
      const [key, value] = param.split("=");

      queryParams[key] = value

      return queryParams
    }, {});
}