import { defineComponent, ref, withModifiers } from 'vue'

const App = defineComponent({
    setup() {
        const count = ref(0)

        const inc = () => {
            count.value++
        }

        const el = <div onClick={withModifiers(inc, ['self'])}>{count.value}</div>

        return () => el
    }
})

export default App
