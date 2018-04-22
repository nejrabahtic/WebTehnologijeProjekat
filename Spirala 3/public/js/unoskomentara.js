function up(red){
  if(red != 1){
    var tabela = document.getElementById("tabelaUK");
    var trenutni = tabela.rows[red].cells;
    var gornji = tabela.rows[red-1].cells;
    for(var i=0; i<5; i++){
      var z = trenutni[i].innerHTML;
      trenutni[i].innerHTML = gornji[i].innerHTML;
      gornji[i].innerHTML = z;
    }
  }
}
function down(red){
  if(red != 5){
    var tabela = document.getElementById("tabelaUK");
    var trenutni = tabela.rows[red].cells;
    var donji = tabela.rows[red+1].cells;
    for(var i=0; i<5; i++){
      var z = trenutni[i].innerHTML;
      trenutni[i].innerHTML = donji[i].innerHTML;
      donji[i].innerHTML = z;
    }
  }
}
function potvrdiKomentar(){
  var indexK = document.getElementById("indexKomentar").value;
  var spiralaK = document.getElementById("spiralaKomentar").value;
  var tabelaK = document.getElementById("tabelaC").childNodes[1].childNodes;
  var vrijednosti = [];
  //console.log(tabelaK)
  for(var i = 0; i < tabelaK.length; i++){
    if(tabelaK[i].localName == "tr" && tabelaK[i].childNodes[1].localName != "th"){
    console.log(tabelaK[i].childNodes[1].childNodes[0].textContent)
      vrijednosti.push({
        sifra_studenta: tabelaK[i].childNodes[1].childNodes[0].textContent,
        tekst: tabelaK[i].childNodes[3].childNodes[0].value
      });
    }
  }

  for(var i = 0; i < vrijednosti.length; i++)
    vrijednosti[i].ocjena = i;
  console.log(vrijednosti)
  KreirajFajl.kreirajKomentar(spiralaK, indexK, vrijednosti, function(err, data){
    console.log(err);
    console.log(data);
  })
}
