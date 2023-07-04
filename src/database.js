export class Database {
  #database = {} //uso um objeto para adicionar qualquer coisa além de usuário

  select(table) {
    //existe uma tabela com o nome que passei? se não retorno um Array
    const data = this.#database[table] ?? []

    return data;
  }

  insert(table, data) {
    //Verificar se existe um registro inserido naquela tabela, se não existir vamos adicionar
    //Verifico se já existe um array nessa tabela
    if (Array.isArray(this.#database[table])) {
      //Vou pegar essa tabela e adicionar o novo item
      this.#database[table].push(data);
    } else {
      //Se não eu vou criar um Array com o item ali dentro, pois não tenho nada inserido na tabela
      this.#database[table] = [data];
    }
    //retorno o item que foi inserido
    return data;
  }
}