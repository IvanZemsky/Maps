import type { App } from "vue"
import {
   UiButton,
   UiSpacing,
   UiFilePicker,
   UiCard,
   UiInput,
   UiTextarea,
   UiWrapper,
   UiSelect,
   UiSelectOption,
   UiModal,
   UiToast,
} from "works-ui"

export function registerUI(app: App) {
   app.component("UiButton", UiButton)
   app.component("UiSpacing", UiSpacing)
   app.component("UiFilePicker", UiFilePicker)
   app.component("UiCard", UiCard)
   app.component("UiInput", UiInput)
   app.component("UiTextarea", UiTextarea)
   app.component("UiWrapper", UiWrapper)
   app.component("UiSelect", UiSelect)
   app.component("UiSelectOption", UiSelectOption)
   app.component("UiModal", UiModal)
   app.component("UiToast", UiToast)
}
