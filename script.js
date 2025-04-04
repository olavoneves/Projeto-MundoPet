const uploadBttn = document.getElementById('uploadButton')
const uploadInput = document.getElementById('uploadInput')

uploadBttn.addEventListener('click', () => {
    uploadInput.click();
})

function lerConteudoDoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader(); // Ler o arquivo que está sendo recebido como parâmetro
        leitor.onload = () => {
            resolve({url: leitor.result, nome: arquivo.name}) 
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
