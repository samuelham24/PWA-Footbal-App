
 webPush = require('web-push');
 
const vapidKeys = {
   "publicKey":"BIMI87GOH-KSRN3fOHEI9X1RPy4GBbLTwKgrjnR5sAu9c9gwknob6MLD54pC7ya895SOCYx9Rd1KvHhH6zfT_9o",
   "privateKey":"hwK7Y2axin4MFO9kHrfIS4VHPORpo1iU0v7s22rq7i4"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/fh1Gk583DcU:APA91bEYsD-awKrGX8v7Yc_8g37yAUWU23JlTJULTANs0lCJB8286p_qMjOGuRe-aSaeCNT2YpnJLDLFf-HsVwht1Te39SYW8SiL4xRsG78KoKHA7oQeiR5vtTCOVCeVRrmJ3K2tYL43",
   "keys": {
       "p256dh": " BM/22QelYNAzq2s3IFIOxvs13kkCSyVp5A/L20neTXMuxPZSi9jsGrl1eKvJFjgT66Nayb5yr+L+9IDq0d3BXRg=",
       "auth": "FwUTSxlAThUDy5KBHpjCrw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '948582180336',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);