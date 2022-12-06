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

var deputiesPage = 1

function loadMoreDeputies() {
    deputiesPage++
    showDeputies()
}

window.addEventListener("load", showDeputies)

function showDeputies() {
    let containerCard = document.getElementById("container-card")

    let url = `https://dadosabertos.camara.leg.br/api/v2/deputados?pagina=${deputiesPage}&itens=10`
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


                let a = document.createElement("a")
                a.className = "card"
                a.href = `/politician-info.html?id=${element.id}`

                let div = document.createElement("div")

                let img = document.createElement("img")
                img.src = element.urlFoto
                img.alt = "Avatar"
                img.style.width = "100%"

                let spam = document.createElement("spam")
                spam.innerHTML = element.nome

                div.appendChild(img)
                div.appendChild(spam)
                a.appendChild(div)
                containerCard.appendChild(a)
            })
        })
        .catch(function(error) {
            console.log(error)
        })
}

window.addEventListener("load", showParties)

function showParties() {
    let partyList = document.getElementById("party-list")

    let url = "https://dadosabertos.camara.leg.br/api/v2/partidos"
    let headers = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json'
        })
    }

    fetch(url, headers)
        .then((response) => {
            // console.log(response)
            return response.json()
        })
        .then((data) => {
            console.log(data)
            data.dados.forEach(element => {

                let li = document.createElement("li")
                let a = document.createElement("a")
                a.href = element.uri
                a.innerHTML = element.sigla

                li.appendChild(a)
                partyList.appendChild(li)
            })
        })
        .catch(function(error) {
            console.log(error)
        })
}