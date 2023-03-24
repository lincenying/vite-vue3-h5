import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules: Record<string, any> = import.meta.glob('../mock/*.ts', { eager: true })

const _mockModules: Array<string> = []
Object.keys(modules).forEach(key => {
    if (key.includes('/_')) {
        return
    }
    _mockModules.push(...modules[key].default)
})
export const mockModules = _mockModules

export function setupProdMockServer() {
    createProdMockServer(_mockModules)
}
