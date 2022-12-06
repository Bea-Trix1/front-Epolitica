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

window.addEventListener("load", showProjectInfo)

function showProjectInfo() {
    let url = `https://dadosabertos.camara.leg.br/api/v2/proposicoes/${urlParams.id}`
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
            let tipo = document.getElementById("project-type")
            tipo.innerHTML = data.dados.siglaTipo

            let ementa = document.getElementById("project-ementa")
            ementa.innerHTML = data.dados.ementa
        })
        .catch(function(error) {
            console.log(error)
        })
}

function sendComment() {
    let commentContent = document.getElementById("comment-content").value

    let session = JSON.parse(localStorage.getItem("epolitica-session"))

    let url = `https://74ff-2804-7f0-bec1-90e0-cd6f-1372-2e77-6521.sa.ngrok.io/v1/proposition/${urlParams.id}/comment`
    let headers = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': session.access_token
        }),
        body: JSON.stringify(commentContent)
    }

    fetch(url, headers)
        .then((response) => {
            if (response.status != 200) {
                throw new Error('something went wrong while commenting')
            }
            location.reload()
        })
        .catch(function(error) {
            console.log(error)
        })
}

var commentsPage = 1

function loadMoreComments() {
    commentsPage++
    showComments()
}

window.addEventListener("load", showComments)

function showComments() {
    let commentSection = document.getElementById("comments-area")

    let url = `https://74ff-2804-7f0-bec1-90e0-cd6f-1372-2e77-6521.sa.ngrok.io/v1/proposition/${urlParams.id}/comments?page=${commentsPage}&limit=15`
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
            data.forEach(element => {
                let div = document.createElement("div")
                div.className = "card"

                let div2 = document.createElement("div")

                let nome = document.createElement("h2")
                nome.className = "profile-name"
                nome.innerHTML = element.user_public_info.name

                let imagem = document.createElement("img")
                imagem.className = "profile-img"
                imagem.src = element.user_public_info.picture
                imagem.referrerPolicy = "no-referrer"

                let comment = document.createElement("p")
                comment.className = "profile-info"
                comment.innerHTML = element.comment

                div2.appendChild(nome)
                div2.appendChild(comment)
                div.appendChild(imagem)
                div.appendChild(div2)
                commentSection.appendChild(div)

            })
        })
        .catch(function(error) {
            console.log(error)
        })
}