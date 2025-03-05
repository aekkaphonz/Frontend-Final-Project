describe('Navigation and Global Features', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  describe('Navigation Tests', () => {
    it('should navigate to all main pages', () => {
      // Test navigation to Article page
      cy.get('a[href*="article"]').click()
      cy.url().should('include', '/home/article')
      
      // Test navigation to Popular page
      cy.get('a[href*="popular"]').click()
      cy.url().should('include', '/home/popular')
      
      // Test navigation back to home
      cy.get('a[href="/"]').click()
      cy.url().should('equal', 'http://localhost:3000/')
    })

    it('should have working sidebar', () => {
      // Open sidebar
      cy.get('.sidebar-toggle').click()
      cy.get('.sidebar').should('be.visible')
      
      // Test sidebar navigation items
      cy.get('.sidebar a').should('have.length.at.least', 1)
    })
  })

  describe('Search Functionality', () => {
    it('should show search results', () => {
      cy.get('.search-input').type('test search')
      cy.get('.search-button').click()
      cy.get('.search-results').should('exist')
    })

    it('should filter search results', () => {
      cy.get('.search-input').type('test')
      cy.get('.search-button').click()
      cy.get('.filter-option').first().click()
      cy.get('.search-results').should('exist')
    })
  })

  describe('Responsive Design Tests', () => {
    it('should be responsive on mobile view', () => {
      cy.viewport('iphone-x')
      cy.get('nav').should('be.visible')
      cy.get('.mobile-menu').should('be.visible')
    })

    it('should be responsive on tablet view', () => {
      cy.viewport('ipad-2')
      cy.get('nav').should('be.visible')
      cy.get('.sidebar-toggle').should('be.visible')
    })
  })

  describe('Error Handling', () => {
    it('should handle 404 pages', () => {
      cy.visit('http://localhost:3000/nonexistent-page', { failOnStatusCode: false })
      cy.get('.error-page').should('be.visible')
      cy.contains('404').should('be.visible')
    })

    it('should handle network errors', () => {
      // Simulate offline mode
      cy.intercept('http://localhost:3001/**', { forceNetworkError: true })
      cy.visit('http://localhost:3000/home/article')
      cy.get('.error-message').should('be.visible')
    })
  })

  describe('Performance Tests', () => {
    it('should load pages within acceptable time', () => {
      cy.visit('http://localhost:3000/home/article', {
        onBeforeLoad: (win) => {
          win.performance.mark('start-loading')
        },
      }).then(() => {
        cy.window().then((win) => {
          win.performance.mark('end-loading')
          win.performance.measure('page-load', 'start-loading', 'end-loading')
          const measure = win.performance.getEntriesByName('page-load')[0]
          expect(measure.duration).to.be.lessThan(3000) // Should load within 3 seconds
        })
      })
    })
  })
})
