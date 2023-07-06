import fs from 'node:fs/promises' //para trabalhar com arquivo físicos no Node

//Uso uma classe interna do Node URL 
//dois parametros -> o nome do arquivo e o caminho relativo
const databasePath = new URL('db.json', import.meta.url);

export class Database {
  #database = {}

  //Para recuperar os dados
  constructor() {
    //then é uma promise pois quando ele terminar de ler o arquivo por completo vou pegar os dados do arquivo e vou salvar dentro do banco de dados
    fs.readFile(databasePath, 'utf-8')
    .then(data => {
      this.#database = JSON.parse(data)
    }).catch(() => {
      //Para fazer a tratativa uso catch e crio um arquivo mesmo que vazio
      this.#persistent();
    })
  }

  //Método que vai escrever o nosso banco de dados em um arquivo físico
  #persistent(){
    //Vou salvar em json pois é melhor para ler e escrever os dados
    //JSON.stringify(this.#database) para converter o nosso banco em uma estrutura JSON
    fs.writeFile(databasePath, JSON.stringify(this.#database)); //writeFile - Só aceita string
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
    //Vai ser chamado toda vez que eu inserir uam informação no Banco de dados
    this.#persistent();

    return data;
  }
}