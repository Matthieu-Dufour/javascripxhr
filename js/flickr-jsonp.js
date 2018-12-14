// recupere des images publiques sur flickr


function getFlickerImages() {
    //envoie une requete XHR a flicker pour récupérer le flux d'images publiques
    //params : vide
    //return : vide


    $.getJSON('https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?',
        {
            tags: "landscape",
            tagmode: "any",
            format: "json"
        }, data => { // ou bien function(data){}
            //console.log(data);
            let listePhotos = "";
            data['items'].forEach((item) => {
                listePhotos += "<img src='" + item.media.m + "' />";
            });
            document.getElementById("images").innerHTML = listePhotos;
        }
    );
}



$().ready(function () {
    getFlickerImages();
});