Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
// failing the test
    return false
})
describe('product', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/')
      cy.get('[test-id=login-link]').click().then(()=>{
        cy.get('[test-id=email-input]').type('farazshah2001@gmail.com')
        cy.get('[test-id=password-input]').type('pass123')
        cy.get('[test-id=login-button]').click()
      })
    })

    it('product buying', () => {
        

    })
});