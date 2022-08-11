/* Função Validar */
function validar() {
  let token = document.getElementById("token");
  let balance = document.getElementById("balance");

  // verificar se o campo token está vazio
  if (token.value == "" || balance.value == "") {
    swal("Ops...!", "Preencha todos os campos corretamente!", "warning");
  } else { // verificar se os dados do arr_token existem (diferentes de null)
    if (localStorage.getItem("arr_token") != null) {
        
      let arr_token = JSON.parse(localStorage.getItem("arr_token"));
      let tamanho_token = arr_token.length;
      arr_token[tamanho_token] = token.value;

      let arr_balance = JSON.parse(localStorage.getItem("arr_balance"));
      let tamanho_balance = arr_balance.length;
      arr_balance[tamanho_balance] = balance.value;

      localStorage.setItem('arr_token', JSON.stringify(arr_token));
      localStorage.setItem('arr_balance', JSON.stringify(arr_balance));
      location = "index.html";
      
    } else { //caso não exista o arr_token vai ser criado o array e setar o valor do input do usuario na posição zero
      let arr_token = [];
      arr_token[0] = token.value;
      let arr_balance = [];
      arr_balance[0] = balance.value;
      localStorage.setItem('arr_token', JSON.stringify(arr_token));
      localStorage.setItem('arr_balance', JSON.stringify(arr_balance));
      location = "index.html";
    }
  }
}

//função para percorrer as posições do array TOKEN e apresentar os valores na tabela home
function display_token(){

    let arr_token = JSON.parse(localStorage.getItem("arr_token"));

    arr_token.forEach((valor, position) => {
      
        document.write('<li>');
        document.write('<a href="edit.html"><i class="fa-solid fa-pen-to-square"></i></a>');
        document.write(valor);
        document.write('</li>');
        
    })
}

//função para percorrer as posições do array BALANCE e apresentar os valores na tabela home
function display_balance(){

    let arr_balance = JSON.parse(localStorage.getItem("arr_balance"));

    arr_balance.forEach((valor, position) => {
      
        document.write('<li>');
        document.write(valor);
        document.write('</li>');
        
    })
}

