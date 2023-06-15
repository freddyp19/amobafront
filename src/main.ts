import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faCalendar } from '@fortawesome/free-regular-svg-icons'
import { faTags } from '@fortawesome/free-solid-svg-icons'
import { faDashboard } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'

library.add(faUser)
library.add(faCalendar)
library.add(faTags)
library.add(faDashboard)
library.add(faGear)


createApp(App)
.component('VueDatePicker', VueDatePicker)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.mount('#app')