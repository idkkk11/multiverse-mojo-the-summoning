const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Deck } = require('./index')
const { db } = require('../db/config')

// define in global scope
let deck

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true })
    deck = await Deck.create({
        name: 'my deck',
        xp: 125
    })
})

// clear db after tests
afterAll(async () => await db.close())

describe('Deck', () => {
    it('has an id', async () => {
        expect(deck).toHaveProperty('id')
    })

    it('stores the correct mojo', async () => {
        expect(deck.xp).toBe(125)
    })
})
