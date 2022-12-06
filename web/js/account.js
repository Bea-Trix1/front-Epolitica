window.addEventListener("load", verifySession)

function verifySession() {
    if (JSON.parse(localStorage.getItem("epolitica-session")) == null) {
        // window.open("/login.html", "_blank")
        location.pathname = "/login.html"
    }
}

window.addEventListener("load", showUserInfo)

function showUserInfo() {
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
            let nome = document.getElementById("account-name")
            nome.innerHTML = data.name

            let foto = document.getElementById("account-picture")
            if (data.picture != "null") {
                foto.src = data.picture
            }
        })
        .catch(function(error) {
            console.log(error)
        })
}

function sendUpdateUser() {
    let updateName = document.getElementById("update-name").value
    let updatePicture = document.getElementById("update-picture").value
    let updateNewPassword = document.getElementById("update-new-password").value
    let updatePassword = document.getElementById("update-password").value

    let session = JSON.parse(localStorage.getItem("epolitica-session"))

    let url = `https://74ff-2804-7f0-bec1-90e0-cd6f-1372-2e77-6521.sa.ngrok.io/v1/user`
    let headers = {
        method: 'PUT',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': session.access_token
        }),
        body: JSON.stringify({
            name: updateName,
            picture: updatePicture,
            new_password: updateNewPassword,
            password: updatePassword
        })
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

var followsPage = 1

function loadMoreFollows() {
    followsPage++
    showFollows()
}

window.addEventListener("load", showFollows)

function showFollows() {
    let follows = document.getElementById("follows")
    let session = JSON.parse(localStorage.getItem("epolitica-session"))

    let url = `https://74ff-2804-7f0-bec1-90e0-cd6f-1372-2e77-6521.sa.ngrok.io/v1/user/follows?page=${followsPage}&limit=10`
    let headers = {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Authorization': session.access_token
        })
    }

    fetch(url, headers)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            data.forEach(element => {
                let urlDep = `https://dadosabertos.camara.leg.br/api/v2/deputados/${element}`
                let headersDep = {
                    method: 'GET',
                    headers: new Headers({
                        'Accept': 'application/json'
                    })
                }

                fetch(urlDep, headersDep)
                    .then((responseDep) => {
                        return responseDep.json()
                    })
                    .then((dataDep) => {
                        // <a href="">
                        //     <li class="card">
                        //         <div>
                        //             <img id="politician-picture" src="img/img_avatar.png" alt="">
                        //             <h3 class="politician-name">Nome politico</h3>
                        //         </div>
                        //     </li>
                        // </a>

                        let a = document.createElement("a")
                        a.href = `/politician-info.html?id=${element}`

                        let li = document.createElement("li")
                        li.className = "card"

                        let div = document.createElement("div")

                        let img = document.createElement("img")
                        img.id = "politician-picture"
                        img.src = dataDep.dados.ultimoStatus.urlFoto

                        let h3 = document.createElement("h3")
                        h3.className = "politician-name"
                        h3.innerHTML = dataDep.dados.ultimoStatus.nome

                        div.appendChild(img)
                        div.appendChild(h3)
                        li.appendChild(div)
                        a.appendChild(li)

                        follows.appendChild(a)
                    })
                    .catch(function(errorDep) {
                        console.log(errorDep)
                    })
            })
        })
        .catch(function(error) {
            console.log(error)
        })
}