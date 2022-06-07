describe('Journal', function () {
    beforeEach(() => {
        cy.visit('/journal/the-upgrade-to-4k')
    })

    it('Introduction heading has an id', () => {
        cy.get('#introduction').should('exist')
    })

    it('displays a table of contents with six items', () => {
        cy.get('[data-test="toc"]').should('exist')
        cy.get('[data-test="toc"] > ul').children().should('have.length', 6)
    })

    it('displays a table of contents with six items', () => {
        cy.get('[data-test="toc"]').should('exist')
        cy.get('[data-test="toc"] > ul').children().should('have.length', 6)
    })
})
