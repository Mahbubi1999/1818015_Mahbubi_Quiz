const baseUrl = "https://psychonauts-api.herokuapp.com/api";
const brands = `${baseUrl}/characters`;
const power = `${baseUrl}/powers`;




const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");
const fetchHeader = {
    headers: {
        'X-Auth-Token': null
    }
};

function getListBrands() {
    title.innerHTML = "Character Hero"
    fetch(brands)
        .then(response => response.json())
        .then(resJson => {
            console.log(resJson);
            let data = "";
            resJson.forEach(char => {
                data += `
                <li class="card horizontal ">
                    <img src="${char.img}" alt="" class="circle">
                    <p>Gender: ${char.gender} <br>
                       Nama: ${char.name} <br>
                       Id: ${char._id} <br>
                    </p>
                    <a href="#!" class=""><i class=""></i></a>
                </li>
                `
            });
            contents.innerHTML = '<ul class="collection">' + data + '</ul>'
        }).catch(err => {
            console.error(err);
        })
}

function getListStandings() {
    title.innerHTML = "Character Powers";
    fetch(power)
    .then(response => response.json())
    .then(resJson => {
        console.log(resJson);
        let data = "";
        resJson.forEach(char => {
            data += `
            <li class="collection-item avatar">
                <img src="${char.img}" alt="" class="circle">
                <span class="title">${char.name}</span>
                <p>Diskripsi: ${char.description} <br>
                   Nama Powers: ${char.name}
                </p>
                <a href="#!" class=""><i class=""></i></a>
            </li>
            `
        });
        contents.innerHTML = '<ul class="collection">' + data + '</ul>'
    }).catch(err => {
        console.error(err);
    })
}

function loadPage(page) {
    switch (page) {
        case "ListCharacter":
            getListBrands();
            break;
        case "ListPowers":
            getListStandings();
            break;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);

    document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener("click", evt => {
            let sideNav = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sideNav).close();
            page = evt.target.getAttribute("href").substr(1);
            loadPage(page);
        })
    })
    var page = window.location.hash.substr(1);
    if (page === "" || page === "!") page = "ListCharacter";
    loadPage(page);
});