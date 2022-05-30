/// <reference types="cypress" />

// import { expect } from "chai";



describe('number of categories', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('list length = 6', () => {
      cy.get('[test-id=categories-container]').children().should('have.length',5)
    })
})

describe('category info', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('text should be mens cloth', () => {
      cy.get('[test-id=men-cloths-category-text]').should('have.text','Men ')
    })
})







describe('category onCLick', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
    
    it('onCLick should call a function', () => {
        const onClick = cy.stub();
      cy.get('[test-id=men-cloths-category]').click().then(()=>{
          expect(onClick).to.be.called()
      })
    })
})

  