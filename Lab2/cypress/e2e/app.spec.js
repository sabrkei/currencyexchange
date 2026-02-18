describe('Currency Exchange App', () => {
  it('navigates between pages using the navbar', () => {
    cy.visit('/')
    cy.contains('Historical Data').click()
    cy.url().should('include', '/historical')
    cy.contains('Converter').click()
    cy.url().should('include', '/converter')
    cy.contains('Latest Rates').click()
    cy.url().should('include', '/live')
  })

  it('displays at least ten exchange rates on the live page', () => {
    cy.visit('/live')
    cy.get('.list-group-item', { timeout: 10000 }).should('have.length.at.least', 5)
  })

  it('fetches historical rates for a selected date', () => {
    cy.visit('/historical')
    cy.get('input[type="date"]').type('2024-01-15')
    cy.contains('Load Rates').click()
    cy.get('.list-group-item', { timeout: 10000 }).should('have.length.at.least', 1)
    cy.contains('2024-01-15')
  })

  it('converts currency and shows a result', () => {
    cy.visit('/converter')
    cy.get('#amount').clear().type('250')
    cy.contains('Convert').click()
    cy.get('.alert', { timeout: 10000 }).should('contain', '250')
  })

  it('changes base currency on the live page and updates rates', () => {
    cy.visit('/live')
    cy.get('.list-group-item', { timeout: 10000 }).should('have.length.at.least', 1)
    cy.get('#base-currency').select('USD')
    cy.get('.list-group-item', { timeout: 10000 }).should('have.length.at.least', 1)
  })
})
