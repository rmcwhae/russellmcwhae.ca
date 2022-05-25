describe('Navigation', function () {
    it('visits the homepage', function () {
        cy.visit('/')
        cy.contains('Hi, I’m Russell.')
    })

    it('visits the photography page', function () {
        cy.visit('/')
        cy.contains('Portfolio')
    })

    it('visits the calendars page', function () {
        cy.visit('/calendars')
        cy.contains('Calendars')
    })

    it('visits the projects page', function () {
        cy.visit('/projects')
        cy.contains('Projects')
    })

    it('visits the journal page', function () {
        cy.visit('/journal')
        cy.contains('Journal')
    })

    // Other tests to write: lightbox, single journal article
})
