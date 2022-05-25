describe('Journal', function () {
    beforeEach(() => {
        cy.visit('/journal/the-upgrade-to-4k')
    })

    it('Introduction heading has an id', () => {
        cy.get('#introduction').should('exist')
    })
})
