const registration = () => {
    if('serviceWorker' in navigator){
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('./service-worker.js')
                .then(() => console.log('Register Success'))
                .catch(() => console.log('Register Not Success'))
        })
    }else{
        console.log('Service Worker it is not supported!')
    }
}

const notification = () => {
    if('Notification' in window){
    Notification.requestPermission().then(result => {
    if(result === 'denied'){
    console.log('Denied')
    return
    }else if (result === 'default'){
    console.log('Default!')
    return
    }
    if('PushManager' in window){
    navigator.serviceWorker.getRegistration().then(reg => {
    reg.pushManager
    .subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BIMI87GOH-KSRN3fOHEI9X1RPy4GBbLTwKgrjnR5sAu9c9gwknob6MLD54pC7ya895SOCYx9Rd1KvHhH6zfT_9o'
    })
    .then(sub => {
        console.log('Sukses subscribe endpoint', sub.endpoint)
        console.log('Sukses subscribe p256dh key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('p256dh')))))
        console.log('Sukses subscribe auth key: ', btoa(String.fromCharCode.apply(null, new Uint8Array(sub.getKey('auth')))))
        })
    .catch(err => console.log('Gagal Subscribe : ',err))
        })
    }
})
}
}

export default {
    registration,
    notification
}