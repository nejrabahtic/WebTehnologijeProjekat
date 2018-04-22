var Poruke = (function(){
	var idDivaPoruka;
	var mogucePoruke = ["Ime i prezime nije validno",
						"Email koji ste napisali nije validan fakultetski email",
   						"Indeks nije validan",
					    "Akademska godina nije validna",
					    "Password nije validan",
					    "Potvrda passworda nije validna",
					    "Bitbucket URL nije validan",
					    "Bitbucket SSH nije validan",
					    "Naziv repozitorija nije validan",
					    "Semestar nije validan"];
	var porukeZaIspis = ["", "", "", "", "", "", "", "", "", "", "", "" ];
	

	return{
		ispisiGreske: function(){
			if (idDivaPoruka == null)
				idDivaPoruka = document.getElementById('greskeId');
			idDivaPoruka.innerHTML = "";
			for (var i = 0; i < porukeZaIspis.length; i++){
				if (porukeZaIspis[i] != ""){
					var temp = document.createElement("P");
		            temp.innerHTML = porukeZaIspis[i];
		            idDivaPoruka.appendChild(temp);
				}
			}
		},
		postaviIdDiva: function(ref){
			idDivaPoruka = ref;
		},
		dodajPoruku: function(ind){
			if (ind < 0 || ind > mogucePoruke.length)
				return;
			porukeZaIspis[ind] = mogucePoruke[ind];
			this.ispisiGreske();
		},
		ocistiGresku: function(ind){
			if (ind < 0 || ind > mogucePoruke.length)
				return;
			porukeZaIspis[ind] = "";
			this.ispisiGreske();
		}
	}
}());
