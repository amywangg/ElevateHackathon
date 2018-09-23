var validator = require("email-validator");
var fs = require('fs');
var obj={};


$(".signUpBtn").click(()=>{
    if($("#logIn").css('display')=='none'){
        if($("#Email2").val()==""||$("#Email3").val()==""){
            displayMsg("Field Cannot be Blank!");
        }else if($("#Email3").val()!=""){
            displayMsg("Fields do not match!");
        }else if($('#Password2').val()==""){
            displayMsg("Password Field Cannot be Blank!");
        }else if (validator.validate($("#Email2").val())){
                saveUser($("#Email2").val(),$('#Password2').val(),$('#Nickname').val())
            }
    }else{
        $("#logIn").css('display','none');
        $("#signUp").fadeIn("slow");
    }
    });

$(".logInBtn").click(()=>{
    if($("#logIn").css('display')=='none'){
    $("#signUp").css('display','none');
    $("#logIn").fadeIn("slow");
    }else{
        checkUser($("#Email1").val(),$('#Password1').val())
    }
});

$(".profImg").click(()=>{
    $('.mainFeed').fadeOut('fast');
    $('.profile').fadeIn('fast');
});

$(".backbtn").click(()=>{
    $('.profile').fadeOut('fast');
    $('.mainFeed').fadeIn('fast');
});

function displayMsg(message) {
    console.log(message)
    $('.infoDiv').fadeIn("slow");
    $('#infoSmall').text(message)
    setTimeout(function() {
      $('.infoDiv').fadeOut("slow");
    }, 2000);
  }


function saveUser (email, password, title){
    fs.readFile('user.json', 'utf8', function callback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        obj.user.push({email: email, password:password, title:title}); //add some data
        json = JSON.stringify(obj); //convert it back to json
        fs.writeFile('user.json', json); // write it back 
        $("#signUp").css('display','none');
        $("#logIn").fadeIn("slow");
    }});
}

function checkUser (email, password){
    fs.readFile('user.json','utf8', function (err,data){
        var userFound=false;
        var nickname;
        if(err) throw err;
        obj=JSON.parse(data)
        values = Object.keys(obj).map(function (key) { return obj[key]; });
        keys = Object.keys(obj);

        console.log(keys)
        console.log(obj.user[0].email)
        
        // populate the key value pairs
        for(i=0; i<obj.user.length; i++){
           if(obj.user[i].email==email && obj.user[i].password==password){
            userFound=true;
            nickname=obj.user[i].title;
           }
        }
        if(userFound==false){
            displayMsg("Incorrect Email or Password");
           }else{
            $('.preIndex').fadeOut("fast")
            $('.mainFeed').show("fast")
            $('#profileName').innerText=nickname
           }
    });
}

