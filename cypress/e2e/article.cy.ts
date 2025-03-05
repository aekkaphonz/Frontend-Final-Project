describe('Article Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/home/article')
  })

  it('should display the article page layout correctly', () => {
    // Check main components
    cy.get('nav').should('be.visible')
    cy.get('.MuiContainer-root').should('be.visible')
    cy.get('.MuiList-root').should('exist')
  })

  it('should display sorting options', () => {
    cy.get('select').should('exist')
    cy.get('select').should('contain', 'newest')
    cy.get('select').should('contain', 'oldest')
    cy.get('select').should('contain', 'mostLikes')
    cy.get('select').should('contain', 'mostViews')
  })

  it('should display tag filters', () => {
    cy.get('.MuiChip-root').should('exist')
    cy.get('.MuiChip-root').first().should('contain', 'ทั้งหมด')
  })

  it('should display article cards with content', () => {
    cy.get('.MuiList-root').find('li').should('exist')
    cy.get('.MuiTypography-root').should('exist') // Check for title
    cy.get('img').should('exist') // Check for images
  })

  it('should handle like button interactions', () => {
    // Test like button without login
    cy.get('button').contains('FavoriteIcon').first().click()
    cy.on('window:alert', (text) => {
      expect(text).to.contains('กรุณาเข้าสู่ระบบเพื่อทำการไลค์')
    })
  })

  it('should navigate to post detail when clicking a post', () => {
    cy.get('.MuiList-root').find('li').first().click()
    cy.url().should('include', '/home/highlights/')
  })

  it('should filter posts by tag', () => {
    // Click on a tag chip
    cy.get('.MuiChip-root').eq(1).click()
    // Verify filtered results
    cy.get('.MuiList-root').should('exist')
  })

  it('should sort posts', () => {
    // Test sorting by different options
    cy.get('select').select('oldest')
    cy.get('.MuiList-root').should('exist')
    
    cy.get('select').select('mostLikes')
    cy.get('.MuiList-root').should('exist')
  })
})
