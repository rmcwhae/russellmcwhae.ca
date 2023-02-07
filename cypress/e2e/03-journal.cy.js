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

    it('increments the view count by one', () => {
        cy.get('[data-test="article-views"]').as('viewsText')
        cy.get('@viewsText').then(($viewsText) => {
            const initialViewCountText = $viewsText.text()
            cy.reload()
            cy.get('@viewsText').then(($viewsText) => {
                const reloadViewCountText = $viewsText.text()
                expect(initialViewCountText).not.to.eq(reloadViewCountText)
            })
        })
    })
})
