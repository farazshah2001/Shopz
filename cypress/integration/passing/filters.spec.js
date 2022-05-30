// <reference types="cypress" />
describe('filters', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('select filters ', () => {
          cy.get('[test-id=age-filter]').select('old').then(()=>{
            cy.get('[test-id=age-filter]').should('have.value','old')
          })
          cy.get('[test-id=category-filter]').select('sport').then(()=>{
            cy.get('[test-id=category-filter]').should('have.value','sport')
          })
          cy.get('[test-id=color-filter]').select('black').then(()=>{
            cy.get('[test-id=color-filter]').should('have.value','black')
          })
          cy.get('[test-id=gender-filter]').select('male').then(()=>{
            cy.get('[test-id=gender-filter]').should('have.value','male')
          })
    })

    it('reset filter button ', () => {
        cy.get('[test-id=age-filter]').select('old').then(()=>{
            cy.get('[test-id=resetFilter-button]').click().then(()=>{
                cy.get('[test-id=age-filter]').should('have.value',null);
              })
        })
    })
})
