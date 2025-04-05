const uploadBttn = document.getElementById('uploadButton')
const uploadInput = document.getElementById('uploadInput')

uploadBttn.addEventListener('click', () => {
    uploadInput.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader(); // Ler o arquivo que está sendo recebido como parâmetro
        leitor.onload = () => {
            resolve({
                url: leitor.result,
                nome: arquivo
            })
        } // Se tudo der certo, vai ser retornado a leitura do nosso arquivo e o nome do arquivo

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo ${arquivo.name}`)
        } // Se der errado, vai retornar a mensagem de erro de arquivo 

        leitor.readAsDataURL(arquivo)

    })
}

const imagePrincipal = document.querySelector(".main-image")
const nomeImage = document.querySelector(".imagemEscrita")

uploadInput.addEventListener("change", async (evento) => {
    const arquivo = evento.target.files[0];

    if(arquivo) {
        try {
            const conteudoArquivo = await lerConteudoDoArquivo(arquivo);
            imagePrincipal.src = conteudoArquivo.url;
            nomeImage.textContent = conteudoArquivo.nome;
        }catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
    }
})

const hashTags = document.getElementById('hashTags')
const listaHashTags = document.getElementById('listaHashTags')

listaHashTags.addEventListener('click', (evento) => {
    if (evento.target.classList.contains("removeHashTag")) {
        const hashTagQueremosRemover = evento.target.parentElement;
        listaHashTags.removeChild(hashTagQueremosRemover);
    }
})

const hashTagsDisponiveis = ["Cachorro", "Gato", "Jacaré", "Lagarto", "Cobra", "Porco", "Peixe", "Tubarão", "Boi", "Cavalo", "Coelho", "Cabra", "Ovelha", "Vaca", "Tartaruga", "Jabuti", "Passaro"];

// Função assincrona para comparar oq o usuario digitou com a nossa lista de limitação
async function verificarHashTags(hashTagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(hashTagsDisponiveis.includes(hashTagTexto));
        }, 1000) // 1 segundo
    })
}

hashTags.addEventListener('keypress', async (evento) => {
    // Se nosso evento capturar a tecla Enter
    if (evento.key === "Enter") { 
        // Para não atualizar a tela
        evento.preventDefault(); 
        const hashTagTexto = hashTags.value.trim();
        if (hashTagTexto !== "") {
            try {
                const hashTagExiste = await verificarHashTags(hashTagTexto);
                if (hashTagExiste) {
                    // Criar um elemento html da tag li
                    const newHashTag = document.createElement("li"); 
                    newHashTag.innerHTML = `<p>${hashTagTexto}</p> <img src="./Imagens/close-black.png" class="removeHashTag" width="15px" height="15px">`
                    listaHashTags.appendChild(newHashTag);
                    hashTags.value = "";
                }else {
                    alert("Hashtag não encontrada.")
                }
            }catch (error) {
                console.error("Erro ao verificar a existência da hashtag");
                alert("Erro ao verificar a existência da hashtag. Verifique o console.")
            }
        }
    }
})

const botaoPublicar = document.getElementById('botao-publicar')

async function publicarProjeto(tituloProjeto, descricaoProjeto, hashTagsProjeto) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const tudoCerto = Math.random() > 0.5;

            if (tudoCerto) {
                resolve("Projeto publicado com sucesso.")
            }else {
                reject("Erro ao publicar o projeto.")
            }
        }, 1500);
    })
}

botaoPublicar.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const tituloProjeto = document.getElementById('tituloFoto').value;
    const descricaoProjeto = document.getElementById('desc').value;
    // Lista com todos elementos p's que ele encontrar na lista. Pegar somente o texto em si usando o map
    const hashTagsProjeto = Array.from(listaHashTags.querySelectorAll("p")).map((hashTag) => hashTag.textContent);

    try {
        const resultado = await publicarProjeto(tituloProjeto, descricaoProjeto, hashTagsProjeto);
        console.log("Deu tudo certo!");
        alert(`Projeto enviado com sucesso! \n\n${tituloProjeto} \n${descricaoProjeto} \n${hashTagsProjeto}`)
    }catch (error) {
        console.log("Erro ao enviar: ", error)
        alert("Erro ao enviar o projeto!")
    }
})

const botaoDescartar = document.querySelector(".botao-descartar")

botaoDescartar.addEventListener('click', async (evento) => {
    evento.preventDefault();

    const formulario = document.querySelector('form')
    formulario.reset();

    imagePrincipal.src = "./Imagens/pexels-efrem-efre-2786187-31357888.jpg";
    nomeImage.textContent = "imagem_do_cachorro.png";
    
    listaHashTags.innerHTML = "";
})