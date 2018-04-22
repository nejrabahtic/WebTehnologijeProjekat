var BitbucketApi = (function(){

  function pomocnaFunkcija(ind, obrisi, fnCallback, repositories, trebaObrisati){
    trebaObrisati[ind] = obrisi;
    if(!trebaObrisati[ind])
      repositories[ind] = null;

    if(trebaObrisati.indexOf(null) > -1)
      return;

    repositories = repositories.filter(function(repozitorij){
      return repozitorij!= null;
    });

    fnCallback(null, repositories);
  }

  return {
      dohvatiAccessToken: function(key, secret, fnCallback){
        if(!key || !secret){
          fnCallback(-1, {message: "Key ili secret nisu pravilno proslijeđeni!"});
          return;
        }

        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function() {
            if (ajax.readyState == 4 && ajax.status == 200)
                fnCallback(null, JSON.parse(ajax.responseText).access_token);
            else if (ajax.readyState == 4)
                fnCallback(ajax.status, null);
        }

        ajax.open("POST", "https://bitbucket.org/site/oauth2/access_token", true);
        ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        ajax.setRequestHeader("Authorization", 'Basic ' + btoa(key + ":" + secret));
        ajax.send("grant_type=" + encodeURIComponent("client_credentials"));
      },
      dohvatiRepozitorije: function(token, godina, naziv, branch, fnCallback){
        var repositories = [];
        var trebaObrisati = [];

        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
           if (ajax.readyState == 4 && ajax.status == 200){
             var vrijednosti = JSON.parse(ajax.responseText).values;

             vrijednosti = vrijednosti.filter(function(vrijednost){
               var datum = new Date(value.created_on);
               return datum.getFullYear() == godina || datum.getFullYear() == (parseInt(godina) + 1);
             });

            for(var i = 0; i < vrijednosti.length; i++){
              repositories.push(vrijednosti[i].links.clone[1].href);
              trebaObrisati.push(null);
            }

            for(var i = 0; i < vrijednosti.length; i++){
              BitbucketApi.dohvatiBranch(token, vrijednosti[i].links.branches.href, branch, function(err, data){
                pomocnaFunkcija(i, data, fnCallback, repositories, trebaObrisati);
              });
            }
         }
         else if (ajax.readyState == 4)
             fnCallback(ajax.status, null);
        }

        ajax.open("GET", "https://api.bitbucket.org/2.0/repositories?role=member&pagelen=150&q=name" + encodeURIComponent('~"') + naziv + encodeURIComponent('"'));

        ajax.setRequestHeader("Authorization", 'Bearer ' + token);
        ajax.send();

      },
      dohvatiBranch: function(token, url, naziv, fnCallback){
        const ajax = new XMLHttpRequest();
        ajax.onreadystatechange = function(){
          if (ajax.readyState == 4 && ajax.status == 200){
            var vrijednosti = JSON.parse(ajax.responseText).values
            vrijednosti = vrijednosti.filter(function(vrijednost){
              return vrijednost.name.indexOf(naziv) > -1;
            });
            fnCallback(null, vrijednosti.length > 0);
          }
          else if(ajax.readyState == 4)
            fnCallback(ajax.status, "Greška!");
        }

        ajax.open("GET", url);
        ajax.setRequestHeader("Authorization", 'Bearer ' + token);
        ajax.send();
      }
  }
})();
