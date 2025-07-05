describe('OrangeHRM E2E Testing - Tugas Week 8', () => {
    const baseUrl = 'https://opensource-demo.orangehrmlive.com/'

    before(() => {
        cy.visit(baseUrl)
    })

    it('Login to OrangeHRM and validate dashboard', () => {
        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()
        cy.url().should('include', '/dashboard')
        cy.contains('Dashboard').should('be.visible')
        cy.screenshot('01_dashboard_page')
    })

    it('Access Admin menu and validate', () => {
        cy.contains('Admin').click()
        cy.url().should('include', '/admin')
        cy.contains('User Management').should('be.visible')
        cy.screenshot('02_admin_page')
    })

    it('Add a new Admin user and validate', () => {
        cy.contains('Add').click()

        // Example fields - adjust selectors as needed
        cy.get('input[placeholder="First Name"]').type('QA')
        cy.get('input[placeholder="Last Name"]').type('Tester')
        cy.get('input[placeholder="Username"]').type('qatestuser')
        cy.get('input[type="password"]').eq(0).type('TestUser@123')
        cy.get('input[type="password"]').eq(1).type('TestUser@123')

        cy.contains('Save').click()

        // Search user to validate creation
        cy.get('input[placeholder="Search"]').type('qatestuser')
        cy.contains('qatestuser').should('exist')
        cy.screenshot('03_user_added')
    })

    after(() => {
        cy.log('All E2E tests for OrangeHRM completed.')
    })
})