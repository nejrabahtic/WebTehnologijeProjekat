function potvrdiSpisak(){
  const text = document.getElementById("textareapolje").value;
  const broj = document.getElementById("brojspirale").value;

  console.log(csvToJson(text));

  KreirajFajl.kreirajSpisak(broj, csvToJson(text), function(err, data){
    if(err)
      console.log(err);
    console.log(data);
  });
}

function csvToJson(csv){
	var redoviPodataka = [];
	var forReturn = [];
	sadrzaj = csv.toString();
	//Sadržaj splitan po redovima
	var linijaPodataka = sadrzaj.split("\n");
	linijaPodataka.map(function(linijaPodataka, ind){
    forReturn.push([]);
    redoviPodataka = linijaPodataka.split(',');
    redoviPodataka.map(function(col){
      forReturn[ind].push(col);
    });
  });
  return forReturn;
}
