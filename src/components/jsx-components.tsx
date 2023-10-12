import { withModifiers } from 'vue'

const App = defineComponent({
    name: 'JsxComponents',
    setup() {
        let count = $ref(0)

        const inc = () => {
            count += 1
        }

        return () => (
            <div p-20px>
                <van-button onClick={withModifiers(inc, ['self'])}>
                    &lt;&lt;&lt;&lt;
                    {count}
                    {' '}
                    &lt;&lt;&lt;&lt;
                </van-button>
            </div>
        )
    },
})

export default App
