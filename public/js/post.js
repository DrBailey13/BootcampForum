function initialsImg(){

    var fName = ""
    var lName = ""
    var name = fName + "%20" + lName
    
    
    let url = `https://initials-avatar.p.rapidapi.com/?${name}&background=177025&color=D4AF37&size=128&length=2&rounded=false&uppercase=false&font-size=0.5`
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url":url,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "initials-avatar.p.rapidapi.com",
            "x-rapidapi-key": "beb5ffb560msh52696fdf7f6443cp1c7ff2jsnaa362e82397b"
        }
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
    });
    }
    initialsImg()