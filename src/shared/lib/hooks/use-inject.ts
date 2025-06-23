import { inject, type InjectionKey } from "vue"

export function useInject<T>(
   provideName: string | InjectionKey<T>,
   defaultValue?: T,
   errorMessage?: string,
) {
   const defaultErrorMsg = `'${String(provideName)}' was not provided`

   if (defaultValue !== undefined) {
      return inject<T>(provideName, defaultValue)
   }

   const value = inject<T>(provideName)
   if (value === undefined) {
      throw new Error(errorMessage || defaultErrorMsg)
   }

   return value
}
