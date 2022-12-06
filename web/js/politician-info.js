window.addEventListener("load", showAccountPicture)

function showAccountPicture() {
    let session = JSON.parse(localStorage.getItem("epolitica-session"))

    let url = `https://74ff-2804-7f0-bec1-90e0-cd6f-1372-2e77-6521.sa.ngrok.io/v1/user/public/${session.user_id}`
    let headers = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json'
        })
    }

    fetch(url, headers)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let accountPicture = document.getElementById("account-picture")
            if (data.picture != "null") {
                accountPicture.src = data.picture
            }
        })
        .catch(function(error) {
            console.log(error)
        })
}

var urlParams = function() {
    var query = location.search.slice(1)
    var partes = query.split('&')
    var data = {}
    partes.forEach(function(parte) {
        var chaveValor = parte.split('=')
        var chave = chaveValor[0]
        var valor = chaveValor[1]
        data[chave] = valor
    })

    return data
}()

window.addEventListener("load", showDeputyInfo)

function showDeputyInfo() {
    let url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${urlParams.id}`
    let headers = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json'
        })
    }

    fetch(url, headers)
        .then((response) => {
            return response.json()
        })
        .then((data) => {

            let foto = document.getElementById("foto-politico")
            foto.src = data.dados.ultimoStatus.urlFoto

            let email = document.getElementById("email-politico")
            email.innerHTML = data.dados.ultimoStatus.email

            let nascimento = document.getElementById("nascimento-politico")
            nascimento.innerHTML = data.dados.dataNascimento

            let deputyName = document.getElementById("nome-politico")
            let partyName = document.getElementById("partido-politico")

            deputyName.innerHTML = data.dados.ultimoStatus.nome
            partyName.innerHTML = data.dados.ultimoStatus.siglaPartido
        })
        .catch(function(error) {
            console.log(error)
        })
}

var projectsPage = 1

function loadMoreProjects() {
    projectsPage++
    showProjects()
}

window.addEventListener("load", showProjects)

function showProjects() {
    let containerCard = document.getElementById("container-card")

    let url = `https://dadosabertos.camara.leg.br/api/v2/proposicoes?idDeputadoAutor=${urlParams.id}&pagina=${projectsPage}&itens=10`
    let headers = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json'
        })
    }

    fetch(url, headers)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            data.dados.forEach(element => {
                let div = document.createElement("div")
                div.className = "card"

                let div2 = document.createElement("div")

                let a = document.createElement("a")
                a.href = `/proposition-comments.html?id=${urlParams.id}`

                let p = document.createElement("p")
                p.innerHTML = element.ementa

                let div3 = document.createElement("div")
                div2.className = "role_name"
                div2.innerHTML = element.siglaTipo

                div2.appendChild(div3)
                div2.appendChild(p)
                a.appendChild(div2)
                div.appendChild(a)
                containerCard.appendChild(div)
            });
        })
        .catch(function(error) {
            console.log(error)
        })
}

function sendFollow() {
    let session = JSON.parse(localStorage.getItem("epolitica-session"))

    let url = `https://74ff-2804-7f0-bec1-90e0-cd6f-1372-2e77-6521.sa.ngrok.io/v1/politician/${urlParams.id}/follow`
    let headers = {
        method: 'POST',
        headers: new Headers({
            'Accept': 'application/json',
            'Authorization': session.access_token
        })
    }

    fetch(url, headers)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('something went wrong while commenting')
            }
        })
        .catch(function(error) {
            console.log(error)
        })
}