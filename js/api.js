const leagueID = '2002'
const urlGet = 'https://api.football-data.org/v2/'
const endKlasemen = `competitions/${leagueID}/standings`
const endTim = `competitions/${leagueID}/teams`
const api_token = '9b2365bd3e6e44cfba383b11901e1598'
const endMatch = `competitions/${leagueID}/matches?status=SCHEDULED`

function status(response) {
    if (response.status !== 200) {
      console.log("Error : " + response.status);
      return Promise.reject(new Error(response.statusText));
    } else {
      return Promise.resolve(response);
    }
  }

function json(response) {
    return response.json();
  }

function error(error) {
    console.log("Error : " + error);
  }

function fetchApi(url){
    return fetch(url,{
        'headers':{
        'X-Auth-Token': api_token
        }
    })
    .then(status)
    .then(json)
}

//Klasemen Sementara
function KlasemenSementara() {
    if('caches' in window){
    caches.match(urlGet + endKlasemen).then(function (response) {
    if(response){response.json().then(function (data) {
    let klasemenDataHTML = ''
    data = data.standings[0].table
    data.forEach( function(TimDetail) {
    let logoTimURL = TimDetail.team.crestUrl
    logoTimURL = logoTimURL.replace(/^http:\/\//i, 'https://')
    klasemenDataHTML +=
                `
                <tr>
                    <td>${TimDetail.position}</td>
                    <td><img src="${logoTimURL}" alt="${TimDetail.team.name}" class="responsive-img" width="45"></td>
                    <td>${TimDetail.team.name}</td>
                    <td>${TimDetail.playedGames}</td>
                    <td>${TimDetail.won}</td>
                    <td>${TimDetail.draw}</td>
                    <td>${TimDetail.lost}</td>
                    <td>${TimDetail.goalDifference}</td>
                    <td>${TimDetail.points}</td>
                </tr>
                `
                    })
                document.getElementById('progress').style.display = 'none'
                document.getElementById('klasemenData').innerHTML = klasemenDataHTML
                })
            .catch(err => console.log(error))
            }
        })
        
    }
    
    fetchApi(urlGet + endKlasemen)
    .then(function (data) {
        let klasemenDataHTML = ''
        data = data.standings[0].table

        data.forEach(function(TimDetail) {
        let logoTimURL = TimDetail.team.crestUrl
        logoTimURL = logoTimURL.replace(/^http:\/\//i, 'https://')
        klasemenDataHTML +=
            `
            <tr>
                <td >${TimDetail.position}</td>
                <td><img src="${logoTimURL}" alt="${TimDetail.team.name}" class="responsive-img" width="45"></td>
                <td>${TimDetail.team.name}</td>
                <td>${TimDetail.playedGames}</td>
                <td>${TimDetail.won}</td>
                <td>${TimDetail.draw}</td>
                <td>${TimDetail.lost}</td>
                <td>${TimDetail.goalDifference}</td>
                <td>${TimDetail.points}</td>
            </tr>
            `
        })
        document.getElementById('progress').style.display = 'none'
        document.getElementById('klasemenData').innerHTML = klasemenDataHTML
    })
    .catch(err => console.log(err))
}

// Pertandingan Berikutnya
var convertUTCDate = function(date) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()} ${formatAMPM(date)}`
}

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours :
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//Pertandingan
function MatchBerikut() {
    if('caches' in window){
    caches.match(`${urlGet}competitions/${leagueID}/matches?status=SCHEDULED`)
    .then(function (response) {
    if(response){response.json().then(function (data) {
        let matchHTML = ''
        match = data.matches
        maxData = match.length
             if (match.length > 20) {
            maxData = 20;
        }
                            
            for (let i = 0; i < maxData; i++) {
            matchHTML += 
                `
                <tr>
                <td>${match[i].matchday}</td>
                <td>${convertUTCDate(new Date(match[i].utcDate))}</td>
                <td>${match[i].homeTeam.name} VS ${match[i].awayTeam.name}</td>
                </tr>
                `
                }

            document.getElementById('progress').style.display = 'none'
            document.getElementById('matches').innerHTML = matchHTML
            })    
        }
    })
                
}
    
    fetchApi(urlGet + endMatch)
    .then(function (data){
        let matchHTML = ''
        match = data.matches
        maxData = match.length
        if (match.length > 20) {
            maxData = 20;
            }
                            
        for (let i = 0; i < maxData; i++) {
        matchHTML += 
            `
            <tr>
                <td>${match[i].matchday}</td>
                <td>${convertUTCDate(new Date(match[i].utcDate))}</td>
                <td>${match[i].homeTeam.name} VS ${match[i].awayTeam.name}</td>
            </tr>
            `
            }
                
            document.getElementById('progress').style.display = 'none'
            document.getElementById('matches').innerHTML = matchHTML
            })
            .catch(err => console.log(error))
            }

//Daftar Tim 

function DaftarTim() {
    if('caches' in window){
    caches.match(`${urlGet}/v2/competitions/${leagueID}/teams`).then(function (response) {
    if(response){response.json().then(function (data) {
    let teamsHTML = ''
    data = data.teams
    data.forEach(function(timDetail) {
    let logoTimURL = timDetail.crestUrl
    logoTimURL = logoTimURL.replace(/^http:\/\//i, 'https://')
    teamsHTML  +=
        `
        <tr>
            <td><img src="${logoTimURL}" alt="${timDetail.name}" class="responsive-img" width="30"></td>
            <td>${timDetail.name}</td>
            <td>${timDetail.venue}</td>
            <td><button onclick="addBookmarkTeam(${timDetail.id},'${logoTimURL}','${timDetail.name}','${timDetail.venue}')" class="waves-effect waves-light btn">SIMPAN TIM</button></td>
        </tr>
        `
            })
            document.getElementById('progress').style.display = 'none'
            document.getElementById('teams').innerHTML = teamsHTML
        })
    }
})
        
}

    fetchApi(urlGet + endTim)
    .then(function (data) {
        let teamsHTML = ''
        data = data.teams
        data.forEach(function(timDetail) {
            let logoTimURL = timDetail.crestUrl
            logoTimURL = logoTimURL.replace(/^http:\/\//i, 'https://')
            teamsHTML  +=
            `
            <tr>
            <td><img src="${logoTimURL}" alt="${timDetail.name}" class="responsive-img" width="30"></td>
            <td>${timDetail.name}</td>
            <td>${timDetail.venue}</td>
            <td><button onclick="addBookmarkTeam(${timDetail.id},'${logoTimURL}','${timDetail.name}','${timDetail.venue}')" class="waves-effect waves-light btn">SIMPAN TIM</button></td>
        </tr>
            `
        })
        document.getElementById('progress').style.display = 'none'
        document.getElementById('teams').innerHTML = teamsHTML
    })
    .catch(err => console.log(error))
}

