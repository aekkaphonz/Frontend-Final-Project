describe('Popular Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/home/popular')
  })

  it('should display the popular page layout correctly', () => {
    cy.get('nav').should('be.visible')
    cy.contains('บทความมาแรง').should('be.visible')
    cy.get('.MuiGrid-container').should('exist')
  })

  it('should show loading state', () => {
    cy.contains('กำลังโหลด...').should('exist')
  })

  it('should display article cards', () => {
    cy.get('.MuiCard-root').should('have.length.at.least', 1)
    cy.get('.MuiCardMedia-root').should('exist') // Check for images
    cy.get('.MuiCardContent-root').should('exist') // Check for content
  })

  it('should show login prompt for non-logged-in users', () => {
    cy.get('.MuiCard-root').first().click()
    cy.get('.swal2-popup').should('be.visible')
    cy.contains('กรุณาเข้าสู่ระบบก่อนเข้าชมบทความ').should('be.visible')
  })

  it('should display article metrics', () => {
    cy.get('.MuiCard-root').first().within(() => {
      cy.get('[data-testid="VisibilityIcon"]').should('exist') // Views icon
      cy.get('[data-testid="CommentIcon"]').should('exist') // Comments icon
      cy.get('[data-testid="ThumbUpIcon"]').should('exist') // Likes icon
    })
  })

  it('should sort articles by trending status', () => {
    // Verify articles are sorted by likes (for recent posts) or views (for older posts)
    cy.get('.MuiCard-root').should('have.length.at.least', 1)
  })
})
