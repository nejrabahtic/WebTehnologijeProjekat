const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', 3000);

app.use('/public', express.static(path.join(__dirname + '/public')));

app.get('/', function(req, res){
    res.status(200).sendFile(__dirname + "/public/index.html" );
});
app.get('/podstranice/login', function(req, res){
    res.status(200).sendFile(__dirname + "/podstranice/login.html");
});
app.get('/podstranice/statistika', function(req, res){
    res.status(200).sendFile(__dirname + "/podstranice/statistika.html");
});
app.get('/podstranice/unoskomentara', function(req, res){
    res.status(200).sendFile(__dirname + "/podstranice/unoskomentara.html");
});
app.get('/podstranice/unosspiska', function(req, res){
    res.status(200).sendFile(__dirname + "/podstranice/unosspiska.html");
});
app.get('/podstranice/nastavnik', function(req, res){
    res.status(200).sendFile(__dirname + "/podstranice/nastavnik.html");
});
app.get('/podstranice/bitbucketpozivi', function(req, res){
    res.status(200).sendFile(__dirname + "/podstranice/bitbucketpozivi.html");
});

app.post('/unosspiska', function(req, res){
    var indexi = req.body.indexi;
    if(!indexi[0])
      return res.status(500).send({message: "Datoteka nije kreirana!", row: "0"});

    for(var i = 0; i < indexi.length; i++){
      var indexiRed = indexi[i];
      if(indexiRed.length != 6)
        return res.status(500).send({message: "Datoteka nije kreirana!", row: i});
    }
    for(var j = 0; j < indexiRed.length; j++){
      indexiRed[j] = indexiRed[j].trim();
      var index = indexiRed[j];
      if(!(/1[0-9]{4}/g).test(index))
        return res.status(500).send({message: "Datoteka nije kreirana!", row: i});
      var brojac = indexiRed.filter(function(i1){
        return i1 == index;
      }).length;
      if(brojac > 1)
        return res.status(500).send({message: "Datoteka nije kreirana!", row: i});
    }

    fs.writeFile('spisakS' + req.body['spirala'] + ".json", JSON.stringify(indexi), function(err){
      if(err)
        return res.status(500).send(err);
      else
        return res.status(200).send({message: "Uspješno kreirana datoteka!", data: indexi});
    });
});
app.post('/komentar', function(req, res){

  var values = req.body;

  fs.writeFile('markS' + values['spirala'] + values['index'] + ".json", JSON.stringify(values["sadrzaj"]), function(err){
    if(err)
      return res.status(500).send(err);
    else
    return res.status(200).send({message: "Uspješno kreirana datoteka!", data: values["sadrzaj"]});
  })
});
app.post('/lista', function(req, res){
  if(!checkBody(req.body, listsOfHeaders.lista))
    return res.status(500).send({message: "Podaci nisu u traženom formatu!", data: null});

  if(!req.body.godina[0] || !req.body.nizRepozitorija[0])
    return res.status(500).send({message: "Podaci nisu u traženom formatu!", data: null});

  var forTxt = "";
  var brojac = 0;

  req.body.nizRepozitorija.map(function(repozitorij){
    var pom = repozitorij.split('\/');
    pom = pom[pom.length - 1];
    pom = pom.split( '\.git' )[0];
    if(pom.indexOf(req.body.godina) > -1){
      brojac++;
      forTxt += repozitorij + "\n";
    }
  });

  forTxt = forTxt[forTxt.length-1] == '\n'? forTxt.slice(0, -1): forTxt;

  fs.writeFile( __dirname + '/spisak' + req.body.godina + ".txt", forTxt, function(err, data){
    if(err)
      return res.status(500).send(err);
    else
      return res.status(200).send({message: "Lista uspješno kreirana!", data: brojac});
  })
});
app.post('/izvjestaj', function(req, res){
  if(!req.body.spirala || !req.body.index)
    return res.status(500).send({message: "Podaci nisu u traženom formatu!"});

  fs.readdir('./', function(err, files){
    if(err)
      return res.status(500).send(err);


    var pathToComments = [];
    var fileName = "spisakS" + req.body.spirala + ".json";
    var sifreStudenta = ["A", "B", "C", "D", "E"];

    if(files.indexOf(fileName) > -1){
      fs.readFile( __dirname + "/" + fileName, function(err, indexi){
        if(err)
          return res.status(500).send(err);

        indexi = JSON.parse(indexi);
        indexi.map(function(indexRed){
          var temp = indexRed.indexOf(req.body.index);
          if(temp > 0){
            pathToComments.push({
              index: indexRed[0],
              sifra: sifreStudenta[temp - 1],
              visited: null,
            });
          }
        });

        if(pathToComments.length == 0)
          return res.status(500).send({message: "Na spisku se ne nalazi index!" + req.body.index});

        var komentari = "";

        pathToComments.map(function(value, ind){
          fs.readFile( __dirname + '/markS' + req.body.spirala + value.index + ".json", function(err, comments){
            pathToComments[ind].visited = true;

            if(err)
              komentari += '\n';
            else{
              comments = JSON.parse(comments);
              var v = comments.find(function(comment){
                return comment.sifra_studenta == value.sifra;
              });
              komentari += v? '##########\n' + v.tekst + '\n': '\n';
            }

            if(pathToComments.find(function(c){
              return c.visited == null
            })
            ) return;

            komentari = komentari[komentari.length-1] == '\n'? komentari.slice(0, -1): komentari;

            fs.writeFile('izvjestajS' + req.body["spirala"] + req.body["index"] + ".txt", komentari, function(err, data){
              if(err)
                res.status(500).send(err);

              var value = __dirname + '/izvjestajS' + req.body["spirala"] + req.body["index"] + ".txt";

              return res.status(200).sendFile(value);
            });
          });
        });
      });
    }
    else
      return res.status(500).send({message: "File" + fileName + " ne postoji", data: null});
  });
});
app.post('/bodovi', function(req, res){

});

app.listen(3000);

function checkBody(body, listOfHeaders){
  console.log(body);
  console.log(listOfHeaders);
  if(Object.keys(body).length != listOfHeaders.length)
    return false;

  for(var i = 0; i < listOfHeaders.length; i++){
    if(body[listOfHeaders[i].name] == undefined)
      return false;

    if(listOfHeaders[i].attr != undefined)
      if(!Array.isArray(body[listOfHeaders[i].name]))
         return false;

    for(var j = 0; j < body[listOfHeaders[i].name].length; j++)
      if(!checkBody(body[listOfHeaders[i].name][j], listOfHeaders[i].attr))
        return false;
  }
  return true;
}

const listsOfHeaders = {
  komentar:[
    {
      name: "spirala",
    },
    {
      name: "index",
    },
    {
      name: "sadrzaj",
      attr:[
        {
        name: "sifra_studenta"
        }, {
          name: "tekst"
        }, {
          name: "ocjena"
        }
      ]
    },
  ],
  lista:[
    {
      name: 'godina'
    },
    {
      name: 'nizRepozitorija',
      isArray: true
    }
  ]
}
