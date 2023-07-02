/**Implemente um código JS que carregue imagens randômicas a medida que o usuário realiza a rolagem (scroll) até o final da página. Nesse sentido, siga os seguintes passos:

1 – Antes de iniciar, crie um arquivo chamado data.json que contenha pelo menos 15 imagens no seguinte formato json: 

[{"url": "http://exemplo.com/img2.jpg"}, {"url": "http://exemplo.com/img2.jpg"}]

2 – Quando o usuário entrar na página, faça uma requisição XMLHttpRequest (Ajax) para carregar de maneira randômica um conjunto de imagens; repita essa ação quando o usuário realizar o scroll até o final da página  com o objetivo de manter um carregamento infinito de imagens. Dica para detectar o scroll até o final da página:

if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
// você está no final da página
}

3 - Porém, a nesse exercício a função que implementa o objeto XMLHttpRequest deve retornar uma Promisse. Um exemplo de completo de como podemos trabalhar retornar uma Promisse que utiliza o objeto XMLHttpRequest pode ser obtido na documentação do MDN:

https://github.com/mdn/js-examples/blob/master/promises-test/index.html */

function promise(method, imagemUrl) {
    
    return new Promise(function (resolve, reject) {
      let request;
      request = new XMLHttpRequest();   

      //Tratamento do retorno
      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          resolve(request.responseText);
        } else {
			console.log(xhr.readyState)
        }
      };
      //Configurando a requisição
      request.open(method, imagemUrl, true);
      //Tratamento de erro
      request.onerror = function () {
        reject(Error("Erro de rede."));
      };
      //Enviando a requisição
      request.send();
    });
}

function carregarImagens() {

    promise("GET", "data.json")
    .then(function (response) {
        var data = JSON.parse(response);
        for (let i = 0; i <= data.images.length; i++) {
            let image = data.images[Math.floor(Math.random() * 15)];
            var images = document.getElementById("images");
            var img = document.createElement("img");
            img.src = image.imagemUrl;
            images.appendChild(img);
        }
    })

    .catch(function (error) {
        console.log(error);
    });
}

document.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        carregarImagens();
    } 
});