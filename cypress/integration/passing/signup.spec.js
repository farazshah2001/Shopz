/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
// failing the test
    return false
})
describe('signup', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })

    it('signup functionality', () => {
      cy.get('[test-id=login-link]').click().then(()=>{
        cy.get('[test-id=signup-link]').click().then(()=>{
            cy.get('[test-id=signup-name]').type('abc')
            cy.get('[test-id=signup-email]').type('abdd@gmail.com')
            cy.get('[test-id=signup-password]').type('pass123')
            cy.get('[test-id=signup-button]').click().then(()=>{
                cy.url().should('be.equal', 'http://localhost:3000/login')
            })
        })
      })
    })
})
    // 

