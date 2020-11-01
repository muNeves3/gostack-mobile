import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.15.3:3333'
})

export default api;

//IOS com emulador: localhost
//IOS com físico: ip da maquina
//Android com emulador: localhost (adb reverse)
//Android com emulador: 10.0.2.2 (Android studio)
//Android com emulardor: 10.0.3.2 (Genymotion)
//Android com físico: ip da maquina