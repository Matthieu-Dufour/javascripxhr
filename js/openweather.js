// Gestion des appels OpenWeatherMap

let sendXhr = (urlSend, success) => {
    // appel ajax en jquery 
    // params : urlSend = url de l'api, success fonction de callback en cas de succès
    //  return : vide     

    let xhr = $.ajax({
        url: urlSend,
        method: 'GET',
        dataType: 'json'
    }).done(data => {
        success(data);
    }).fail(error => {
        console.log('data transfert error' + error);
    });
}


let showWeatherData = data => {
    console.log("retour de l'API : ", data);
    let html = "<ul>";
    html += "<li>" + data.coord.lon + "</li>";
    html += "</ul>";
    document.getElementById("meteo").innerHTML = html;
}




//--------------------------------MAIN-------------------

$(document).ready(() => {

    let apiKey = "2ff23c23b228f51a1388f2e2b27e6ef4";

    let city = "Paris,fr";

    let weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + apiKey;
    console.log(weatherUrl);
    sendXhr(weatherUrl, showWeatherData);
});