const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { Card } = require('./index')
const { db } = require('../db/config')

let card

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true })
    card = await Card.create({
        name: 'hit',
        mojo: 23,
        stamina: 12,
        imgUrl: "img.jpg"
    })
})

// clear db after tests
afterAll(async () => await db.close())

describe('Card', () => {
    it('has an id', async () => {
        expect(card).toHaveProperty('id')
    })

    it('stores the correct mojo', async () => {
        expect(card.mojo).toBe(23)
    })
})
