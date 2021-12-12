var express = require('express');
var session = require('express-session');
var app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({
secret: "chave criptográfica",
secure: false,
resave: false,
saveUninitialized: false
}));

var list = new Array(20)
for(var i = 0;i<list.length;i++)
{
    list[i] = new Array(2)
}

var ranking_array = new Array(20)
for(var i = 0;i<ranking_array.length;i++)
{
    ranking_array[i] = new Array(2)
}

var pag_list = 
'<html>\
<head>\
<title>RankList</title>\
</head>\
<body bgcolor="#161853">\<br>\
    <div align="center" style="color:white; font-size: 75px;">\
      RANKING TOP 10 <br><br>\
    </div>\
    <div align="center"\
        style="background:#EC255A; text-align: center; margin-left: 25%; margin-right: 25%; border-radius: 25px;">\
        <br>\
        <div style="color:White; font-family:Georgia; font-size: 30px;">\
            1. #nome# -> #points# Pts  <br><br>\
            2. #nome2# -> #points2# Pts  <br><br>\
            3. #nome3# -> #points3# Pts  <br><br>\
            4. #nome4# -> #points4# Pts  <br><br>\
            5. #nome5# -> #points5# Pts  <br><br>\
            6. #nome6# -> #points6# Pts  <br><br>\
            7. #nome7# -> #points7# Pts  <br><br>\
            8. #nome8# -> #points8# Pts  <br><br>\
            9. #nome9# -> #points9# Pts  <br><br>\
            10. #nome10# -> #points10# Pts  <br><br>\
            <br>\
        </div>\
    </div>\
</body>\
</html>';

var passwd_nt = 
'<html>\
<head>\
  <style type="text/css">\
    .Enviar {\
      background-color: #1A508B;\
      height: 40px;\
      width: 200px;\
      color: #FAEDF0;\
      font-size: 20px;\
      border-radius: 10px;\
    }\
  </style>\
</head>\
<body bgcolor="#161853">\
  <div align="center" style="color:white; font-size: 75px;">\
    Ranking\
  </div>\
  <br><br><br><br><br><br><br>\
  <div align="center">\
    <form action="http://localhost:8080/list" method="POST">\
    <div style="color:#FAEDF0; font-size: 25px;">\
    Senha Incorreta!\
  </div>\
  <br><br>\
      <div align="center"\
        style="background:#EC255A; text-align: center; margin-left: 30%; margin-right: 30%; border-radius: 55px;">\
        <br><br><br>\
        <div style="color:#FAEDF0; font-size: 50px;">\
          Senha\
        </div>\
        <br>\
        <input class="Enviar" style="height:40px;width: 350px; font-size: 30pt; text-align: center " type="password"\
          name="passwd" value="">\
        <br><br><br><br>\
        <input class="Enviar" type="submit" value="Submit">\
        <br><br><br><br>\
      </div>\
    </form>\
  </div>\
</body>\
</html>';
var array_points = new Array(20)
count = 0;
app.post('/reg', function(req, res) {
 var user = req.body.userid
 var points = req.body.points
list[count][0] = user
list[count][1] = points

array_points[count] = points
 count++

 array_points.sort(function(a,b){return b-a})
for(var i=0;i<array_points.length;i++)
{
  for (var j =0;j<list.length;j++)
  {
    if(array_points[i]==list[j][1])
    {
      ranking_array[i] = list[j]
    }
  }
}

console.log(ranking_array)
});

app.post('/list', function(req, res) {
var passwd = req.body.passwd
var correct_password = "abc1234"
if(passwd==correct_password)
{
 pag_list = pag_list.replace("#nome#",ranking_array[0][0])
 pag_list = pag_list.replace("#points#",ranking_array[0][1])

 pag_list = pag_list.replace("#nome2#",ranking_array[1][0])
 pag_list = pag_list.replace("#points2#",ranking_array[1][1])

 pag_list = pag_list.replace("#nome3#",ranking_array[2][0])
 pag_list = pag_list.replace("#points3#",ranking_array[2][1])

 pag_list = pag_list.replace("#nome4#",ranking_array[3][0])
 pag_list = pag_list.replace("#points4#",ranking_array[3][1])

 pag_list = pag_list.replace("#nome5#",ranking_array[4][0])
 pag_list = pag_list.replace("#points5#",ranking_array[4][1])

 pag_list = pag_list.replace("#nome6#",ranking_array[5][0])
 pag_list = pag_list.replace("#points6#",ranking_array[5][1])

 pag_list = pag_list.replace("#nome7#",ranking_array[6][0])
 pag_list = pag_list.replace("#points7#",ranking_array[6][1])

 pag_list = pag_list.replace("#nome8#",ranking_array[7][0])
 pag_list = pag_list.replace("#points8#",ranking_array[7][1])

 pag_list = pag_list.replace("#nome9#",ranking_array[8][0])
 pag_list = pag_list.replace("#points9#",ranking_array[8][1])

 pag_list = pag_list.replace("#nome10#",ranking_array[9][0])
 pag_list = pag_list.replace("#points10#",ranking_array[9][1])
 res.send(pag_list)
}else{
  res.send(passwd_nt)
}

});

  app.listen(8080);
