function potvrdiBIT(){
  var key = document.getElementById("keyB").value;
  var secret = document.getElementById("secretB").value;
  var repozitorij = document.getElementById("repozB").value;
  var branch = document.getElementById("branchB").value;
  var tgodina = document.getElementById("tgodinaB").value;

  BitbucketApi.dohvatiAccessToken(key, secret, function(err, data){
    if(err){
      console.log("Došlo je do problema!");
      console.log(err);
      return;
    }

    BitbucketApi.dohvatiRepozitorije(data, tgodina, repozitorij, branch, function(err, data){
      if(err)
        document.getElementById('bitbucketpoziviValues').innerHTML = "Došlo je do problema sa repozitorijima!";

      KreirajFajl.kreirajListu( bitYear, data, function( err, data ){
        if(err)
          document.getElementById('bitbucketpoziviValues').innerHTML = "Došlo je do problema sa listom!";

          document.getElementById('bitbucketpoziviValues').innerHTML = data.data;
      });
    });
  });
}
