// <reference types="cypress" />
describe('filters', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/')
    })
  
    it('select filters ', () => {
          cy.get('[test-id=age-filter]').select('old').then(()=>{
            cy.get('[test-id=age-filter]').should('have.value','teen')
          })
    })

    it('reset filter button ', () => {
        cy.get('[test-id=age-filter]').select('old').then(()=>{
            cy.get('[test-id=resetFilter-button]').click().then(()=>{
                cy.get('[test-id=age-filter]').should('have.value','teen');
              })
        })
    })
})
