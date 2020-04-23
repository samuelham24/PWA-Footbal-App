import pwa from './pwa.js'

let path = window.location.hash.substr(1)
path ? path = path : path = 'home'

//Invoke PWA modules
pwa.registration()
pwa.notification()