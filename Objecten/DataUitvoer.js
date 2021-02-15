const uitvoer = document.getElementById('uitvoer');
let dataObject;

function maandNaam(num) {
    switch(num) {
        case 0: return 'januari'; break;
        case 1: return 'februari'; break;
        case 2: return 'maart'; break;
        case 3: return 'april'; break;
        case 4: return 'mei'; break;
        case 5: return 'juni'; break;
        case 6: return 'juli'; break;
        case 7: return 'augustus'; break;
        case 8: return 'september'; break;
        case 9: return 'oktober'; break;
        case 10: return 'november'; break;
        case 11: return 'december'; break;
        default: return num;
    }
}

function geefDagWeek(num) {
    switch (num) {
        case 0: return 'zondag'; break;
        case 1: return 'maandag'; break;
        case 2: return 'dinsdag'; break;
        case 3: return 'woensdag'; break;
        case 4: return 'donderdag'; break;
        case 5: return 'vrijdag'; break;
        case 6: return 'zaterdag'; break;
        default: return num;
    }
}

function maakDatum(num) {
    let datum = new Date(num);

    let dagWeek = datum.getDay();
    let dagMaand= datum.getDate();
    let maand = datum.getMonth();
    let jaar = datum.getFullYear();
    let uren = datum.getHours();
    let minuten = datum.getMinutes();

    if(minuten < 10) {
        minuten = '0' + minuten;
    }

    if(uren < 10) {
        uren = '0' + uren;
    }

    return `${geefDagWeek(dagWeek)} <br> ${dagMaand} ${maandNaam(maand)} ${jaar} ${uren}:${minuten}`;
}

function uitvoeren() {
    // Deze functie voert de data uit in de div met de ID uitvoer.
    let html = '';

    dataObject.forEach(element => {
        html += `<div class="rij">`;
        html += `<div>${maakDatum(element.tijd)}</div>`;
        html += `<div>${element.tempBuiten} &deg;C</div>`;
        html += `<div>${element.tempBinnen} &deg;C</div>`;
        html += `<div>${element.tempGewenst} &deg;C</div>`;

        if(element.tempGewenst > element.tempBinnen) {
            html += `<div><img class="icon" src="icons/vlam.svg" alt="CV aan"></div>`;
        } else {
            html += `<div><img class="icon" src="icons/vlamUit.svg" alt="CV uit"></div>`;
        }

        if(element.lichtKamer) {
            html += `<div><img class="icon" src="icons/lampAan.svg" alt="lamp aan"></div>`;
        } else {
            html += `<div><img class="icon" src="icons/lampUit.svg" alt="lamp uit"></div>`;
        }

        if(element.lichtBuiten) {
            html += `<div><img class="icon" src="icons/lampAan.svg" alt="lamp aan"></div>`;
        } else {
            html += `<div><img class="icon" src="icons/lampUit.svg" alt="lamp uit"></div>`;
        }

        html += `</div>`;
    });

    uitvoer.innerHTML = html;
}

function starten () {
    dataObject = energieData;
    uitvoeren();
}

document.addEventListener('DOMContentLoaded', starten);