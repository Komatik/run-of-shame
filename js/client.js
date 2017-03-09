'use strict';

document.getElementById("call_serverResponse").onclick = createTable
var dataArray = []

window.onload = getData

function getData(){  
    $.get("/data", function(finishers){
        $.each(finishers,function(index, finisher){
            dataArray.push(finisher)
        })
    })
}

function createTable(){
    var table = document.getElementById("server_response")
    if(table.childNodes[0]){ table.removeChild(table.childNodes[0]) }
    for (var i = 0;i < dataArray.length;i++){
        var rij = table.insertRow()

        var celNaam = rij.insertCell()
        celNaam.innerHTML = dataArray[i].naam

        var celVoornaam = rij.insertCell()
        celVoornaam.innerHTML = dataArray[i].voornaam
        
        var celGender = rij.insertCell()
        celGender.innerHTML = dataArray[i].gender
        
        var celTijd = rij.insertCell()
        celTijd.innerHTML = dataArray[i].minuten + ":" + dataArray[i].seconden
    }
}