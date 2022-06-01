/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
// failing the test
    return false
})
describe('login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })

    it('login functionality', () => {
      cy.get('[test-id=login-link]').click().then(()=>{
        cy.get('[test-id=email-input]').type('farazshah2001@gmail.com')
        cy.get('[test-id=password-input]').type('pass123')
        cy.get('[test-id=login-button]').click().then(()=>{
            cy.url().should('be.equal', 'http://localhost:3000/')
        })
      })
    })
})
    // 

