import { createPinia, setActivePinia } from "pinia"
import { describe, it, beforeEach, expect } from "vitest"
import { getDefaultRegion } from "@/entities/region"
import { createRegionFileManagerStore } from "../region-file-manager-store"
import { ref } from "vue"
import { ZodError } from "zod/v4"

// test environment: jsdom
function createJSONFileFromString(content: string, name = "test.json") {
   return new File([content], name, { type: "application/json" })
}

function initStore() {
   return createRegionFileManagerStore(ref(getDefaultRegion()))()
}

describe("[REGION FILE MANAGER] parseRegionFile (JSON)", () => {
   beforeEach(() => {
      setActivePinia(createPinia())
   })

   it("read file", async () => {
      const fileManagerStore = initStore()
      const validData = getDefaultRegion()
      const file = createJSONFileFromString(JSON.stringify(validData))
      const result = await fileManagerStore.parseRegionFile(file)

      expect(result).toEqual(validData)
   })

   it("must throw ZodError when JSON is not match the scheme", async () => {
      const fileManagerStore = initStore()
      const file = createJSONFileFromString(`{"name": "Region"}`)
      const parse = () => fileManagerStore.parseRegionFile(file)

      await expect(parse).rejects.toThrow(ZodError)
   })

   it("must throw syntax error when JSON is invalid", async () => {
      const fileManagerStore = initStore()
      const file = createJSONFileFromString("{ invalid json }")
      const parse = () => fileManagerStore.parseRegionFile(file)

      await expect(parse).rejects.toThrow(SyntaxError)
   })
})
