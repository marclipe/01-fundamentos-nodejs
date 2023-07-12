import fs from 'node:fs/promises'

const databasePath = new URL('db.json', import.meta.url);

export class Database {
  #database = {}

  constructor() {
    fs.readFile(databasePath, 'utf-8')
    .then(data => {
      this.#database = JSON.parse(data)
    }).catch(() => {
      this.#persist();
    })
  }

  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database)); 
  }

  select(table) {
    const data = this.#database[table] ?? []

    return data;
  }

  insert(table, data) {

    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  //teremos o parametro data, que é para receber os dados dos meu usuário que eu quero atualizar
  update(table, id, data) {
    //parecida com a delete, pois vamos buscar também pelo rowIndex para saber se essa info já existe
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      //vou fazer uma substituição com o data, aproveito e mando o id junto
      //Novamente uma tabela só no meu banco de dados
      this.#database[table][rowIndex] = {id, ...data}
      this.#persist()
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)

      this.#persist()
    }
  }
}