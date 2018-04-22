var Validacija = (function(){
	var maxGrupa = 7;
	var trenutniSemestar = 0;//0 za zimski, 1 za ljetni semestar

	/*validirajFakultetski*/
	function validirajFakultetski(email){
		return /[a-z][a-z|\d]*@etf.unsa.ba/.test(email);
	}
	/*validirajGrupu*/
	function validirajGrupu(brojGrupe){
		var maxGrupa = postaviMaxGrupa();
		if (brojGrupe >= 1 && brojGrupe <= maxGrupa)
			return true;
		else
			return false;
	}
	/*validirajIndex*/
	function validirajIndex(index){
		var str = index.toString();
		var firstDigit = str.charAt(0);
		var length = str.length;
		if (firstDigit == 1 && length == 5)
			return true;
		else
			return false;
	}
	/*validirajAkGod*/
	function validirajAkGod(akGodina){
		if(akGodina.length != 9)
    	return false;
    else{
			var dioAkGodina1 = akGodina.slice(0, 4);
			var dioAkGodina2 = akGodina.slice(5, 9);

      var akGodina1 = Number(dioAkGodina1);
      var akGodina2 = Number(dioAkGodina2);

      if(akGodina1 + 1 == akGodina2 && /20[0-9][0-9]\/20[0-9][0-9]$/.test(akGodina))
      	return true;
      else
      	return false;
      }
	}
	/*validirajPassword*/
	function validirajPassword(password){
		var str = password.toString();
		var splitStr = str.split("");
		var flagNumber = false;
		var flagUpperCase = false;
		var flagLowerCase = false;
		var flagLength = false;

		if (str.length >= 7 && str.length <=20)
			flagLength = true;

		var alphabetLower = "abcdefghijklmnopqrstuvwxyz";
		var alphabetUpper = "ABCDEFGHIJKLMNOPQRSTUVWYZ";
		var numbers = "1234567890";

		for(var i = 0; i < str.length; i++){
			//da li je veliko slovo u passwordu
			for (var j = 0; j < alphabetUpper.length; j++){
				if (str.charAt(i) == alphabetUpper.charAt(j)){
					flagUpperCase = true;
					break;
				}
			}
			//da li je malo slovo u passwordu
			for (var j = 0; j < alphabetLower.length; j++){
				if (str.charAt(i) == alphabetLower.charAt(j)){
					flagLowerCase = true;
					break;
				}
			}
			//da li je broj u passwordu
			for (var j = 0; j < numbers.length; j++){
				if (str.charAt(i) == numbers.charAt(j)){
					flagNumber = true;
					break;
				}
			}
		}

		if (flagLength && flagUpperCase && flagLowerCase && flagNumber)
			return true;
		else
			return false;
	}
	/*validirajPotvrdu*/
	function validirajPotvrdu(password1, password2){
		var str1 = password1.toString();
		var str2 = password2.toString();
		if (str1 == str2 && validirajPassword(str1) && validirajPassword(str2))
			return true;
		else
			return false;
	}
	/*validirajBitbucketURL*/
	function validirajBitbucketURL(bitBucketURL){
		let repozitorij = /https:\/\/.+\@bitbucket\.org\/.+\/.+\.git/;

		if(bitBucketURL.match(re) == null)
			return false;

		repozitorij = /(?:(?!\/).)+(?=\.git)/;
    return this.validirajNazivRepozitorija(null, bitBucketURL.match(repozitorij)[0]);
	}
	/*validirajBitbucketSSH*/
	function validirajBitbucketSSH(bitBucketSSH){
		let re = /^git\@bitbucket\.org\:.+\/.+\.git$/;

		if(bitBucketSSH.match(repozitorij) == null)
			return false;

		repozitorij = /(?:(?!\/).)+(?=\.git)/;
		return this.validirajNazivRepozitorija(null, bitBucketSSH.match(repozitorij)[0]);
	}
	/*validirajNazivRepozitorija*/
	function validirajNazivRepozitorija(repozitorijRegex, repozitorij){
        if(repozitorijRegex == "")
        	return (/wtProjekat1[0-9]{4}/.test(repozitorij)||/wtprojekat1[0-9]{4}/.test(repozitorij));
        else
            return repozitorijRegex.test(repozitorij);
    }
    /*validirajImeiPrezime*/
    function validirajImeiPrezime(imePrezime){
    	var validiran = /^(([A-Z]{1})+([a-z]){1,})((-([A-Z]{1})+([a-z]){1,}?)|('([a-z]{1})+([a-z]){1,}?)){0,}(\s)(([A-Z]{1})+([a-z]){1,})$/;
			if(validiran.test(imePrezime))
				return true;
			else
				return false;
    }
	/*postaviMaxGrupa*/
	function postaviMaxGrupa(grupa){
		if (grupa != 0)
			maxGrupa = grupa;
	}
	/*postaviTrenSemestar*/
	function postaviTrenSemestar(semestar){
		if(semestar == "zimski")
			trenutniSemestar = 0;
		else
			trenutniSemestar = 1;
	}

return{
	validirajFakultetski : validirajFakultetski,
	validirajIndex : validirajIndex,
	validirajGrupu : validirajGrupu,
	validirajAkGod : validirajAkGod,
	validirajPassword : validirajPassword,
	validirajPotvrdu : validirajPotvrdu,
	validirajBitbucketURL : validirajBitbucketURL,
	validirajBitbucketSSH : validirajBitbucketSSH,
	validirajNazivRepozitorija : validirajNazivRepozitorija,
	validirajImeiPrezime : validirajImeiPrezime
	}
}());

// window.onload = function(){
//     nastavnikOff();
//     Clear();
// };

function studentOff(){
    document.getElementById("index").style.display="none";
    document.getElementById("ng").style.display="none";
    document.getElementById("bitURL").style.display="none";
    document.getElementById("bitSSH").style.display="none";
    document.getElementById("nazivRepozitorija").style.display="none";
}
function studentBack(){
    document.getElementById("index").style.display="block";
    document.getElementById("ng").style.display="block";
    document.getElementById("bitURL").style.display="block";
    document.getElementById("bitSSH").style.display="block";
    document.getElementById("nazivRepozitorija").style.display="block";
}
function nastavnikOff(){
	  document.getElementById("korisnikIme").style.display="none";
    document.getElementById("mail").style.display="none";
    document.getElementById("maxGrupa").style.display="none";
    document.getElementById("regRepozitorij").style.display="none";
    document.getElementById("trenSem").style.display="none";
}
function nastavnikBack(){
    document.getElementById("korisnikIme").style.display="block";
    document.getElementById("mail").style.display="block";
    document.getElementById("maxGrupa").style.display="block";
    document.getElementById("regRepozitorij").style.display="block";
    document.getElementById("trenSem").style.display="block";
}
function Clear(){
    document.getElementById("ime").value="";
    document.getElementById("pass").value="";
    document.getElementById("passConf").value="";
    document.getElementById("akGod").value="";

    document.getElementById("index").value="";
    document.getElementById("bitURL").value="";
    document.getElementById("bitSSH").value="";
    document.getElementById("nazivRepozitorija").value="";
    document.getElementById("korisnikIme").value="";
    document.getElementById("mail").value="";
    document.getElementById("maxGrupa").value="";
    document.getElementById("regRepozitorij").value="";
    document.getElementById("trenSem").value="";

    for (var i = 0; i < 50; i++){
    	Poruke.ocistiGresku(i);
    }
}

function registrujNastavnikaFun(){
    document.getElementById("Header").textContent = "Registracija Nastavnika";
    studentOff();
    nastavnikBack();
    Clear();
}

function registrujStudentaFun(){
    document.getElementById("Header").textContent = "Registracija Studenta";
	  nastavnikOff();
    studentBack();
    Clear();
}

function validiraj(ref, staValidiram, ref1){
  var deleteMistake = true, ind;
  if(ref.value == undefined || ref.value=="" || ref1 != undefined && (ref1.value == undefined || ref1.value==""))
    deleteMistake = false;

  switch (staValidiram) {
    case "imeIPrezime":
        if(deleteMistake)
            deleteMistake = Validacija.validirajImeiPrezime(ref.value);
        ind = 0;
        break;
    case "email":
        if(deleteMistake)
            deleteMistake = Validacija.validirajFakultetski(ref.value);
        ind = 1;
        break;
    case "index":
      if(deleteMistake)
        deleteMistake = Validacija.validirajIndex(ref.value);
      ind = 2;
      break;
    case "akademskaGodina":
      if(deleteMistake)
        deleteMistake = Validacija.validirajAkGod(ref.value);
      ind = 3;
      break;
    case "sifra":
      if(deleteMistake)
        deleteMistake = Validacija.validirajPassword(ref.value);
      ind = 4;
      break;
    case "potvrdaSifre":
      if(deleteMistake)
        deleteMistake = Validacija.validirajPotvrdu(ref.value, ref1.value);
      ind = 5;
      break;
    case "bitbucketURL":
      if(deleteMistake)
        deleteMistake = Validacija.validirajBitbucketURL(ref.value);
      ind = 6;
      break;
    case "bitbucketSSH":
        if(deleteMistake)
            deleteMistake = Validacija.validirajBitbucketSSH(ref.value);
        ind = 7;
        break;
    case "nazivRepozitorija":
        if(deleteMistake)
            deleteMistake = Validacija.validirajNazivRepozitorija(null, ref.value);
        ind = 8;
        break;
    case "trenutniSemestar":
        deleteMistake = (ref.value == "0" || ref.value == "1") && deleteMistake;
        ind = 9;
        break;
    default:
      deleteMistake = true;
  }
  if(deleteMistake){
    Poruke.ocistiGresku(ind);
  }
  else{
    Poruke.dodajPoruku(ind);
  }
}
