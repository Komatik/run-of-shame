'use strict';

document.getElementById("call_serverResponse").onclick = getData

function getData(){
    $.get("/data", function(finishers){
        $.each(finishers,function(index, finisher){
            var table = document.getElementById("server_response")
            var rij = table.insertRow()

            var celNaam = rij.insertCell()
            celNaam.innerHTML = finisher.naam

            var celVoornaam = rij.insertCell()
            celVoornaam.innerHTML = finisher.voornaam
            
            var celGender = rij.insertCell()
            celGender.innerHTML = finisher.gender
            
            var celTijd = rij.insertCell()
            celTijd.innerHTML = finisher.minuten + ":" + finisher.seconden
        })
    })
}