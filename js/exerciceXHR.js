// Exercice pour implementer une requete XHR

function showGithubUsers(data) {
    //Affiche la reponse de GitHUB users
    //params : reponse de github à la requete xhr
    //return : 

    //transforme la reponse en objet javascript
    // let githubUsers = JSON.parse(data);

    //la reponse est deja un objet javascript
    let githubUsers = data;


    let liste = "<p>" + githubUsers.length + " users : </p> ";
    if (githubUsers.length > 0) {
        liste += "<ul>";
        githubUsers.forEach((item) => {
            liste = liste + '<li>' + "<div id='userimg'>" + "<img src='" + item.avatar_url + "'>" + "</div>" + "<div id='userinfo'>" + "<p>" + item.id + "</p>" + "<p>" + item.login + "</p>" + "</div>" + '</li>';
        });
        liste += "</ul>";
        document.getElementById("content").innerHTML = liste;
    } else {
        document.getElementById("content").innerHTML = "Aucun utilisateur";
    }


    console.log(githubUsers);
}

function sendXhr(url, success) {
    // envoie une requete a Github ou autre
    // params : url = URL ou route de l'API, success function a appeler en cas de succes
    // return : vide

    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = 'json';
    xhr.send();

    //en cas de reponse ok
    xhr.addEventListener('load', function (e) {
        success(e.target.response);
    });

    //en cas d'erreur
    xhr.addEventListener('error', function (e) {
        console.log("erreur retournée : ", e);
    });
}

function getAndShowGithubUsers() {
    //recupere et affiche la liste des users github
    //params : vide
    //return : vide

    sendXhr('https://api.github.com/users', showGithubUsers);

}

let displayUserRepos = (response) => {
    // affiche les repos d'un user
    // params : response = responsedonnees de repos renvoyées par github
    // return : vide
    
    let html = "<table>";
    html += "<tr><th>Nom</th><th>Description</th><th>Homepage</th><th>Dernière MAJ</th></tr>";
    response.forEach((item) => {
        html += "<tr>";
            html += "<td>";
                html += item.name;
            html += "</td>";
            html += "<td>";
                html += item.description;
            html += "</td>";
            html += "<td>";
                html += item.homepage;
            html += "</td>";
            html += "<td>";
                html += item.updated_at;
            html += "</td>";
        html += "</tr>"
    });
    html += "</table>";

    document.getElementById("content").innerHTML += html;
    console.log(response);

}

let getUser = (data, uid) => {
    // extrait les données d'un utilisateur dans la liste des user
    // params : data = reponse de github avec la liste des users,
    //          uid = id de la table github du user qu'on cherche
    // return : vide
    let user = data[uid];
    user = data.find(item => item.id == uid);
    console.log('user : ' + user.login + ' repos : ' + user.repos_url);
    sendXhr(user.repos_url, displayUserRepos);
}

function showUserRepos(user_id) {
    //gere les taches pour afficher la liste des repos d'un utilisateur github
    //params : id = id de l'utilisateur
    //return : vide

    sendXhr('https://api.github.com/users', function (data) {
        getUser(data, user_id)
    });
}


getAndShowGithubUsers();
console.log('requete liste users Github envoyée');

showUserRepos(3);
console.log('requete repos Github envoyée');