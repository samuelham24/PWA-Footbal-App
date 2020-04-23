const TimFavorit = () => {
    getTeam()
        .then(function (data) {
            let teamsHTML = ''
            data.forEach(function (team) {
                teamsHTML  +=
                `
                <tr>
                    <td><img src="${team.logo}" alt="${team.name}" class="responsive-img" width="30"></td>
                    <td>${team.name}</td>
                    <td>${team.venue}</td>
                    <td><button onclick="hapusFavoritTim(${team.id},'${team.name}','${team.venue}','${team.phone}')" class="waves-effect waves-light btn">HAPUS</button></td>
                </tr>
                `
            })
            document.getElementById('progress').style.display = 'none'
            document.getElementById('favoritTim').innerHTML = teamsHTML
        })
}

const pushNotification = msg => {
    const title = 'Notifikasi';
    const options = {
        body: msg,
        icon: '/icon.png'
    };
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.ready.then(regis => {
            regis.showNotification(title, options);
        });
    }
}

const addBookmarkTeam = (id,logo,name,venue) => {
    addTeam({id,logo,name,venue})
    M.toast({html: `Berhasil Memasukkan ${name} ke Daftar Tim Favorit`, classes: 'rounded'});
    pushNotification(`Berhasil Memasukkan ${name} ke Daftar Tim Favorit`)
}

const hapusFavoritTim = (id,name) => {
    let imSure = confirm(`Setuju hapus ${name} dari Daftar Tim Favorit ?`)
    if(imSure){
        deleteTeam(id)
        TimFavorit()
        M.toast({html: `Berhasil Menghapus ${name} dari Tim Favorit`, classes: 'rounded'})
        pushNotification(`Berhasil Menghapus ${name} dari Tim Favorit`)
    }
    
}
