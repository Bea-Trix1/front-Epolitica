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

window.addEventListener("load", showProjects)

var projectsPage = 1

function loadMoreProjects() {
    projectsPage++
    showProjects()
}

function showProjects() {
    let cardsWrap = document.getElementById("cards_wrap")

    let url = `https://dadosabertos.camara.leg.br/api/v2/proposicoes?pagina=${projectsPage}&itens=10`
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
                div.className = "card_item"

                let div2 = document.createElement("div")
                div2.className = "card_inner"

                let img = document.createElement("img")
                img.src = "./img/infocard.png"

                let div3 = document.createElement("div")
                div3.className = "role_name"
                div3.innerHTML = element.siglaTipo

                let div4 = document.createElement("div")
                div4.className = "film"
                div4.innerHTML = element.ementa

                let a = document.createElement("a")
                a.href = `/proposition-comments.html?id=${element.id}`

                div2.appendChild(img)
                div2.appendChild(div3)
                div2.appendChild(div4)
                a.appendChild(div2)
                div.appendChild(a)
                cardsWrap.appendChild(div)
            });
        })
        .catch(function(error) {
            console.log(error)
        })
}