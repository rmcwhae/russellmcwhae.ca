describe('Photo lightbox', function () {
    beforeEach(() => {
        cy.visit('/events')
    })

    it('opens Big Hill Springs with 5 photos', () => {
        cy.contains('Big Hill Springs').click()
        cy.get('#gallery .container').as('container')
        cy.get('@container').children().should('have.length', 5)
        cy.get('@container').children()
    })

    it('opens the lightbox on the first photo of Big Hill Springs', () => {
        cy.contains('Big Hill Springs').click()
        cy.get('#gallery .container').as('container')
        cy.get('@container').children().first().click()
        cy.contains('1 / 5')
    })
})
