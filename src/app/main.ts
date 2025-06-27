import App from "./app.vue"
import router from "./router/router"

import { createApp } from "vue"
import "works-ui/styles.css"
import "leaflet/dist/leaflet.css"
import "./styles/fonts.css"
import "./styles/theme.css"
import "@/features/map/ui/styles.css"
import { createPinia } from "pinia"
import { registerUI } from "./lib/register-ui"

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
registerUI(app)

app.mount("#app")
