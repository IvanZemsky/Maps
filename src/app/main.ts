import App from "./app.vue"
import router from "./router/router"

import { createApp } from "vue"
import WorksUi from "works-ui"
import "works-ui/styles.css"
import "leaflet/dist/leaflet.css"
import "./styles/fonts.css"
import "./styles/theme.css"
import { createPinia } from "pinia"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(WorksUi)

app.mount("#app")
