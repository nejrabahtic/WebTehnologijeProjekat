var KreirajFajl = (function(){
    function validirajString(string){
      return string[0]? true: false;
    }

    function validirajNiz(niz, headers){
      if(niz == null || niz == undefined || niz.length == 0)
        return false;
      for(var i = 0; i < niz.length; i++)
        for(var j = 0; j < headers.length; j++)
          if(niz[i][headers[j]] == undefined || niz[i][headers[j]] == null)
            return false;
      return true;
    }

    return{
        kreirajKomentar: function(spirala, index, sadrzaj, fnCallback){
          if(!validirajString(spirala) || !validirajString(index) || !validirajNiz(sadrzaj, ["sifra_studenta", "tekst", "ocjena"])){
            fnCallback(-1, {message: "Neispravni parametri"});
            return;
          }

          const ajax = new XMLHttpRequest();
          ajax.onreadystatechange = function(){
            if(this.readyState == 4)
              this.status == 200? fnCallback(null, JSON.parse(this.responseText)): fnCallback(this.status, JSON.parse(this.responseText));
          }

          ajax.open("POST", "http://localhost:3000/komentar", true);
          ajax.setRequestHeader("Content-type", "application/json");

          ajax.send(JSON.stringify({
            spirala: spirala,
            index: index,
            sadrzaj: sadrzaj
          }));
        },
        kreirajListu: function(godina, nizRepozitorija, fnCallback){
          if(!validirajString(godina) || !validirajNiz(nizRepozitorija, [])){
            fnCallback(-1, {message: "Neispravni parametri"});
            return;
          }

          const ajax = new XMLHttpRequest();
          ajax.onreadystatechange = function(){
            if(this.readyState == 4)
              this.status == 200? fnCallback(null, JSON.parse(this.responseText)): fnCallback(this.status, JSON.parse(this.responseText));
          }

          ajax.open("POST", "http://localhost:3000/lista", true);
          ajax.setRequestHeader("Content-type", "application/json");

          ajax.send(JSON.stringify({
            godina: godina,
            nizRepozitorija: nizRepozitorija
          }));
        },
        kreirajIzvjestaj: function(spirala, index, fnCallback){
          if(!validirajString(spirala) || !validirajString(index)){
            fnCallback( -1, {message: "Neispravni parametri"});
            return;
          }

          const ajax = new XMLHttpRequest();
          ajax.onreadystatechange = function(){
            if(this.readyState == 4)
              this.status == 200? fnCallback(null, JSON.parse(this.responseText)): fnCallback(this.status, JSON.parse(this.responseText));
          }

          ajax.open("POST", "http://localhost:3000/izvjestaj", true);
          ajax.setRequestHeader("Content-type", "application/json");

          ajax.send(JSON.stringify({
            spirala: spirala,
            index: index
          }));
        },
        kreirajBodove: function(spirala, index, fnCallback){
          if(!validirajString(spirala) || !validirajString(index)){
            fnCallback(-1, {message: "Neispravni parametri"});
            return;
          }

          const ajax = new XMLHttpRequest();
          ajax.onreadystatechange = function(){
            if(this.readyState == 4)
              this.status == 200? fnCallback(null, JSON.parse(this.responseText)): fnCallback(this.status, JSON.parse(this.responseText));
          }

          ajax.open("POST", "http://localhost:3000/bodovi", true);
          ajax.setRequestHeader("Content-type", "application/json");

          ajax.send(JSON.stringify({
            spirala: spirala,
            index: index
          }));
        },
        kreirajSpisak: function(spirala, indexi, fnCallback){
          if(!validirajString(spirala) || !validirajNiz(indexi, [])){
            fnCallback(-1, "Neispravni parametri");
          }

          const ajax = new XMLHttpRequest();
          ajax.onreadystatechange = function(){
            if(this.readyState == 4)
              this.status == 200? fnCallback(null, JSON.parse(this.responseText)): fnCallback(this.status, JSON.parse(this.responseText));
          }

          ajax.open("POST", "http://localhost:3000/unosspiska", true);
          ajax.setRequestHeader("Content-type", "application/json");

          ajax.send(JSON.stringify({
            spirala: spirala,
            indexi: indexi
          }));
        }
    }
})();
