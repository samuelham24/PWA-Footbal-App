const loadPage = (path = 'home') => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if(xhr.readyState == 4){
            let element = document.querySelector('#body-content')
            if(xhr.status == 200){
                element.innerHTML = xhr.responseText
                if(path === 'home'){
                    api.KlasemenSementara(2002)
                }
                if(path === 'favorites'){
                    TimFavorit()
                    window.hapusFavoritTim = listener.hapusFavoritTim
                }
                if(path === 'teams'){
                    api.DaftarTim(2002)
                    window.addBookmarkTeam = listener.addBookmarkTeam
                }

                if(path === 'match'){
                    api.MatchBerikut()
                }
                
            }else if(xhr.status == 404){
                element.innerHTML = "<h1>Page not Found</h1>"
            }else{
                element.innerHTML = "<h1>Cannot access page</h1>"
            }
        }
    }
    xhr.open('GET',`/pages/${path}.html`,true)
    xhr.send()
}