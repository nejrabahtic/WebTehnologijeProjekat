function generisiIzvjestaj(){
  var index = document.getElementById('indexNastavnik').value;
  var spirala = document.getElementById('spiralaNastavnik').value;

  KreirajFajl.kreirajIzvjestaj(spirala, index, function(err, data){
    if(err) return;
    download("izvjestajS" + spirala + index, data);
  })
}

function download(filename, text){
  var element = document.createElement('a');

  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function generisiBodove(){
  var index = document.getElementById('indexNastavnik').value;
  var spirala = document.getElementById('spiralaNastavnik').value;

  KreirajFajl.kreirajBodove(spirala, index, function(err, data){
    if(err)
      return;
    document.getElementById('bodoviNastavnik').innerHTML = JSON.parse(data).poruka;
  })
}
