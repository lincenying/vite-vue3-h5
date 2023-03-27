/* eslint-disable no-unused-vars */
interface SearchFunc {
    (source: string, subString: string): boolean
}

const mySearch: SearchFunc = (source, subString) => {
    const result = source.search(subString)
    return result > -1
}

mySearch('123', '123')

const suits = ['hearts', 'spades', 'clubs', 'diamonds']

function pickCard(x: { suit: string; card: number }[]): number
function pickCard(x: number): { suit: string; card: number }
function pickCard(x: any) {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == 'object') {
        const pickedCard = Math.floor(Math.random() * x.length)
        return pickedCard
    }
    // Otherwise just let them pick the card
    else if (typeof x == 'number') {
        const pickedSuit = Math.floor(x / 13)
        return { suit: suits[pickedSuit], card: x % 13 }
    }
    return []
}

const myDeck = [
    { suit: 'diamonds', card: 2 },
    { suit: 'spades', card: 10 },
    { suit: 'hearts', card: 4 }
]
const pickedCard1 = myDeck[pickCard(myDeck)]
const pickedCard2 = pickCard(13)

// ==================

function identity<T>(arg: T): string {
    return `${arg}!`
}
const output = identity<number>(123)

function loggingIdentity<T>(arg: T[]): T[] {
    console.log(arg.length) // Array has a .length, so no more error
    return arg
}

const output2 = loggingIdentity<number>([123])

interface GenericIdentityFn {
    <T>(arg: T): Promise<T>
}

const myIdentity: GenericIdentityFn = arg => {
    return Promise.resolve(arg)
}

myIdentity<number>(123)

// ==========

interface Lengthwise {
    length: number
}

const loggingIdentity2 = <T extends Lengthwise>(arg: T): T => {
    console.log(arg.length) // Now we know it has a .length property, so no more error
    return arg
}
const loggingIdentity3 = (arg: Lengthwise): Lengthwise => {
    console.log(arg.length) // Now we know it has a .length property, so no more error
    return arg
}

loggingIdentity2(0)
loggingIdentity3(0)

// ==============

function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key]
}

const x = { a: 1, b: 2, c: 3, d: 4 }

getProperty(x, 'a') // okay
getProperty(x, 'm') // error: Argument of type 'm' isn't assignable to 'a' | 'b' | 'c' | 'd'.
