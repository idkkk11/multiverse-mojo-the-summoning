const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals')
const { User, Deck, Card, Attack } = require('./index')
const { db } = require('../db/config')

// define in global scope
let user

// clear db and create new user before tests
beforeAll(async () => {
    await db.sync({ force: true })
})

// clear db after tests
afterAll(async () => await db.close())

describe('These associations work:', () => {
    it('Each user can make a deck', async () => {
        const user = await User.create({
            username: "JohnDoe"
        });
        const deck = await Deck.create({
            name: "johnDoesDeck",
            xp: 150
        });
        user.setDeck(deck);

        const userWithDeck = await User.findOne({
            where: {username: "JohnDoe"},
            include: Deck
        })
        const deckOfUserWithDeck = await userWithDeck.getDeck()

        expect(deckOfUserWithDeck).toMatchObject({
            name: "johnDoesDeck"
        })
    })
    it('Each deck can have many cards', async () => {
        const deck = await Deck.findByPk(1);
        const card1 = await Card.create({
            name: 'monster',
            mojo: 122,
            stamina: 1000,
            imgUrl: "img_monster.jpg"
        });
        const card2 = await Card.create({
            name: 'alien',
            mojo: 95,
            stamina: 154,
            imgUrl: "img_alien.jpg"
        });

        await deck.setCards([card1, card2])
       
        const deckWithCards = await Deck.findOne({
            where: {name: "johnDoesDeck"},
            include: Card
        })
        
        expect(deckWithCards.Cards.length).toBe(2)
    })
    it('Cards can have many attacks', async () => {
        const card1 = await Card.findByPk(1);

        const attack1 = await Attack.create({
            title: "Punch",
            mojoCost: 4,
            staminaCost: 2
        });
        const attack2 = await Attack.create({
            title: "Kick",
            mojoCost: 8,
            staminaCost: 4
        });
        

        await card1.setAttacks([attack1, attack2])
       
        const card1WithAttacks = await Card.findOne({
            where: {name: "monster"},
            include: Attack
        })

        expect(card1WithAttacks.Attacks.length).toBe(2)
    })
    
    it('Attacks can have many cards', async () => {     

        const attack1WithCards = await Attack.findOne({
            where: {title: "Punch"},
            include: Card
        })
        
        expect(attack1WithCards.Cards.length).toBe(1)
    })
})
