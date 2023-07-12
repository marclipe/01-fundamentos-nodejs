//será nesse formato: ?search=MarcLipe
///?search=MarcLipe&page=2 preciso tratar casos que tenha o &
export function extractQueryParams(query) {
  ///preciso tratar casos que tenha o &
  // Aí ele vai ser um Array assim ['search=Diego', 'page=2'] com o split
  //No caso vou transformar com o reduce em um novo objeto para ir adicionando dentro dos meus queryParams
  return query.substr(1).split("&").reduce((queryParams, param) => {
      //o split para dividir esse carinha 'page=2' em 2 vai ficar ['page', '2'] e primeiro também ['search', 'MarcLipe']
      //key para pegar a primeira posição e value para pegar a segunda posição no Array
      const [key, value] = param.split("=");

      //é meu objeto que quero formar no final
      queryParams[key] = value

      return queryParams
    }, {});
}