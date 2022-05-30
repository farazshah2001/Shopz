/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})
describe('redirect', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
      cy.get('[test-id=login-link]').click().then(()=>{
        cy.get('[test-id=email-input]').type('farazshah2001@gmail.com')
        cy.get('[test-id=password-input]').type('pass123')
        cy.get('[test-id=login-button]').click()
      })
    })
    // 
    it('onCLick should redirect to logout', () => {
        cy.get('[test-id=login-link]').click().then(()=>{
            cy.url().should('be.equal', 'http://localhost:3000/signup')
        })
    })
    it('onCLick should redirect to sell', () => {
        cy.get('[test-id=sell-link]').click().then(()=>{
            cy.url().should('be.equal', 'http://localhost:3000/profile')
        })
    })
    it('onCLick should redirect to home from profile', () => {
        cy.get('[test-id=profile-link]').click().then(()=>{
            cy.get('[test-id=home-link]').click().then(()=>{
                cy.url().should('be.equal', 'http://localhost:3000/sell')
            })
        })
    })
    it('onCLick should redirect to profile', () => {
        cy.get('[test-id=profile-link]').click().then(()=>{
           cy.url().should('be.equal', 'http://localhost:3000/sell')
        })
    })
})