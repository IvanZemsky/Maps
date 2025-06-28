import { describe, it, expect } from 'vitest'
import { defineComponent, provide, h } from 'vue'
import type { InjectionKey } from 'vue'
import { mount } from '@vue/test-utils'
import { useInject } from '../use-inject'

const MyKey: InjectionKey<string> = Symbol()

describe('useInject', () => {
  it('should inject provided value', () => {
    const Child = defineComponent({
      setup() {
        const value = useInject(MyKey)
        return () => h('div', value)
      },
    })

    const Parent = defineComponent({
      setup(_, { slots }) {
        provide(MyKey, 'injected value')
        return () => h('div', slots.default && slots.default())
      },
    })

    const wrapper = mount(Parent, {
      slots: {
        default: () => h(Child),
      },
    })

    expect(wrapper.html()).toContain('injected value')
  })
})
