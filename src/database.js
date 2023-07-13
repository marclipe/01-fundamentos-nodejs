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

  select(table, search) {
    //Como vou alterar o valor de data será uma let
    let data = this.#database[table] ?? []

    if(search) {
      //Eu quero fazer um filtro baseado no que eu enviar no search, eu quero procurar a search tanto no nome quanto no email
      data = data.filter(row => {
        //Como search é um objeto vou começar convertendo ele para um Array e uso o método some devolve 
        return Object.entries(search).some(([key, value]) => {
          //Retorno se a linha row, na propriedade key inclui o valor que estou buscando
          return row[key].toLowerCase().includes(value.toLowerCase()); //Ele vai fazer a busca tudo por caixa baixa
        })
      })
    }

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

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
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