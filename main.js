/* Função Validar */
function validar() {
  let token = document.getElementById("token");
  let balance = document.getElementById("balance");

  // verificar se o campo token está vazio
  if (token.value == "" || balance.value == "") {
    swal("Ops...!", "Preencha todos os campos corretamente!", "warning");
  } else {
    // verificar se os dados do arr_token existem (diferentes de null)
    if (localStorage.getItem("arr_token") != null) {
      let arr_token = JSON.parse(localStorage.getItem("arr_token"));
      const hasExists = verificarToken(token.value, arr_token);

      if (hasExists) {
        return swal(" Token já existente!");
      }

      let tamanho_token = arr_token.length;
      arr_token[tamanho_token] = token.value;

      let arr_balance = JSON.parse(localStorage.getItem("arr_balance"));
      let tamanho_balance = arr_balance.length;
      arr_balance[tamanho_balance] = balance.value;

      localStorage.setItem("arr_token", JSON.stringify(arr_token));
      localStorage.setItem("arr_balance", JSON.stringify(arr_balance));
      location = "index.html";
    } else {
      //caso não exista o arr_token vai ser criado o array e setar o valor do input do usuario na posição zero
      let arr_token = [];
      arr_token[0] = token.value;
      let arr_balance = [];
      arr_balance[0] = balance.value;
      localStorage.setItem("arr_token", JSON.stringify(arr_token));
      localStorage.setItem("arr_balance", JSON.stringify(arr_balance));
      location = "index.html";
    }
  }
}

//função para percorrer as posições do array TOKEN e apresentar os valores na tabela home
function display_token() {
  if (localStorage.getItem("arr_token") != null) {
    let arr_token = JSON.parse(localStorage.getItem("arr_token"));
    document.write('<div class="list_left col-md-6">');
    document.write("<span>Tokens</span>");
    document.write("<ul>");
    arr_token.forEach((valor, position) => {
      document.write("<li>");
      document.write(
        '<a href="edit.html?id=' +
          position +
          '"><i class="fa-solid fa-pen-to-square"></i></a>'
      );
      document.write(valor);
      document.write("</li>");
    });
    document.write("</ul>");
    document.write("</div>");
  } else {
    document.write(
      '<span style="margin: 0;font-size: 24px; color: #fff;">Nenhum token foi adicionado!</span>'
    );
  }
}

//função para percorrer as posições do array BALANCE e apresentar os valores na tabela home
function display_balance() {
  if (localStorage.getItem("arr_token") != null) {
    let arr_balance = JSON.parse(localStorage.getItem("arr_balance"));
    document.write('<div class="list_right col-md-6">');
    document.write("<span>Balance</span>");
    document.write("<ul>");
    arr_balance.forEach((valor, position) => {
      document.write("<li>");
      document.write(valor);
      document.write("</li>");
    });
    document.write("</ul>");
    document.write("</div>");
  }
}

function rucuperar(id) {
  let arr_token = JSON.parse(localStorage.getItem("arr_token"));
  let arr_balance = JSON.parse(localStorage.getItem("arr_balance"));
  let resultado = [];
  resultado[0] = arr_token[id];
  resultado[1] = arr_balance[id];
  return resultado;
}
function alterar_input(valor) {
  document.getElementById("token").value = valor[0];
  document.getElementById("balance").value = valor[1];
}
function editar() {
  const urlParams = new URLSearchParams(location.search);
  if (urlParams.has("id")) {
    var id = urlParams.get("id");
    document.write('<form action="#">');
    document.write('<label for="token">Token</label>');
    document.write(
      '<input type="text" name="token" id="token" class="form-control mb-3" />'
    );
    document.write('<label for="balance">Balance</label>');
    document.write(
      '<input type="text" name="balance" id="balance" class="form-control" />'
    );
    document.write("</form>");
    alterar_input(rucuperar(id));
  } else {
    document.write(
      '<span style="margin: 0;font-size: 24px; color: #fff;">OPS, ocorreu um erro!</span>'
    );
  }
}

function deletar() {
  swal({
    title: "Tem certeza?",
    text: "Uma vez excluído, você não poderá recuperar este arquivo imaginário!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      const arr_token = JSON.parse(localStorage.getItem("arr_token"));
      const arr_balance = JSON.parse(localStorage.getItem("arr_balance"));

      const urlParams = new URLSearchParams(location.search);
      const position = urlParams.get("id");

      if (position) {
        arr_token.splice(position, 1);
        arr_balance.splice(position, 1);
        localStorage.setItem("arr_token", JSON.stringify(arr_token));
        localStorage.setItem("arr_balance", JSON.stringify(arr_balance));
      }

      swal("Deletado com sucesso!", {
        icon: "success",
      }).then(() => (location = "index.html"));
    } else {
      swal("Seus dados estão seguros!!");
    }
  });
}

function edit() {
  const urlParams = new URLSearchParams(location.search);
  const position = urlParams.get("id");
  const arr_token = JSON.parse(localStorage.getItem("arr_token"));
  const arr_balance = JSON.parse(localStorage.getItem("arr_balance"));

  arr_token[position] = document.getElementById("token").value;
  arr_balance[position] = document.getElementById("balance").value;
  localStorage.setItem("arr_token", JSON.stringify(arr_token));
  localStorage.setItem("arr_balance", JSON.stringify(arr_balance));
  location = "index.html";
}

function verificarToken(inputValue, arr_token) {
  const hasExists = arr_token.includes(inputValue);

  return hasExists;
}
