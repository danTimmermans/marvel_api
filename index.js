function request(callback, personnage) {
    //On créer l'object XHR
    var xhr = new XMLHttpRequest();
    var hash = CryptoJS.MD5("1a855f2d48351585cf0b0375d3a68ea0981c8409db9359b5e6458f866f1f8c146645b0904");
    //On lui indique qu'à chaque changement de statut il exécute la function anonyme ci dessous
    xhr.onreadystatechange = function () {
      // console.log("readySate : " + xhr.readyState + " | status : " + xhr.status);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var resultat = JSON.parse(xhr.responseText);
        // console.log(resultat)
        //Il appelle la fonction passée en callback, donc ici afficherData(resultat)
        callback(resultat); 
      }
    };
    
    xhr.open(
      "GET",
      // `http://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&lang=fr&appid=4123bf9e94cd4b058f791b7bf2b5a75c`,
      `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${personnage}&ts=1&apikey=b9359b5e6458f866f1f8c146645b0904&hash=${hash}`,
      true
    );
    xhr.send();
  }
  
  function afficherData(data) {
    var div = document.getElementById("demoajax");
    div.textContent = "";
    // for(let i = 0; i<data.data.results.length; i++){
    // div.textContent += data.data.results[i].name;
    // };
    for(let indice in data.data.results){
      var card = document.createElement("div");
      var cardTitle = document.createElement("div");
      var cardPic = document.createElement("div");
      var elem = document.createElement("h2");
      var pic = document.createElement("img")
      elem.textContent = data.data.results[indice].name;
      card.setAttribute("class", "elem");
      div.appendChild(card);
      card.appendChild(cardTitle);
      card.appendChild(cardPic);
      cardTitle.appendChild(elem);
      cardTitle.setAttribute("class", "title");
      cardPic.setAttribute("class", "foto")
      pic.setAttribute("src", data.data.results[indice].thumbnail.path+"."+data.data.results[indice].thumbnail.extension);
      cardPic.appendChild(pic);
    }
  }
  
  function afficherHero(){
      var searchedHero = document.getElementById("personnage").value;
      request(afficherData, searchedHero)
      document.getElementById("personnage").value = "";
  }
 