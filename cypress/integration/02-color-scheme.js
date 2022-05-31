const visit = (darkAppearance) =>
    cy.visit('/', {
        onBeforeLoad(win) {
            cy.stub(win, 'matchMedia')
                .withArgs('(prefers-color-scheme: dark)')
                .returns({
                    matches: darkAppearance,
                })
        },
    })

describe('Colour Scheme', function () {
    it.only('loads the homepage in light mode', function () {
        visit(false)

        cy.get('body').should('have.attr', 'data-theme', 'light')
        cy.get('body').should(() => {
            expect(localStorage.getItem('user-theme')).to.eq('"light"')
        })
    })

    it('loads the homepage in dark mode', function () {
        visit(true)

        cy.get('body').should('have.attr', 'data-theme', 'dark')
    })

    it('light/dark mode toggle works', function () {
        visit(false)

        cy.get('body').should('have.attr', 'data-theme', 'light')
        cy.get('body').should(() => {
            expect(localStorage.getItem('user-theme')).to.eq('"light"')
        })

        cy.get('[data-test="desktop-colour-scheme-switcher"]').click()

        cy.get('body').should('have.attr', 'data-theme', 'dark')
        cy.get('body').should(() => {
            expect(localStorage.getItem('user-theme')).to.eq('"dark"')
        })
    })
})
