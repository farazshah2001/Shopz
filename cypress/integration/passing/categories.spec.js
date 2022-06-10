/// <reference types="cypress" />

// import { expect } from "chai";
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
// failing the test
  return false
})


describe('number of categories', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('list length = 6', () => {
      cy.get('[test-id=categories-container]').children().should('have.length',6)
    })
})

describe('category info', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('text should be mens cloth', () => {
      cy.get('[test-id=men-cloths-category-text]').should('have.text','Men')
    })
})









  