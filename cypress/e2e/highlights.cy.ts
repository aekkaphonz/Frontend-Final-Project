describe('Highlights (Post Detail) Tests', () => {
  // We'll use a test post ID. You should replace this with a valid post ID from your database
  const testPostId = 'test-post-id'

  beforeEach(() => {
    // Login before testing highlights page
    cy.visit('http://localhost:3000/signin')
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    
    // Visit the highlights page
    cy.visit(`http://localhost:3000/home/highlights/${testPostId}`)
  })

  it('should display post details correctly', () => {
    cy.get('.post-title').should('be.visible')
    cy.get('.post-content').should('be.visible')
    cy.get('.post-image').should('exist')
  })

  it('should show author information', () => {
    cy.get('.author-info').should('be.visible')
    cy.get('.post-date').should('be.visible')
  })

  it('should handle comments', () => {
    // Add a new comment
    cy.get('.comment-input').type('This is a test comment')
    cy.get('.submit-comment').click()
    
    // Verify comment is added
    cy.contains('This is a test comment').should('be.visible')
  })

  it('should handle likes', () => {
    cy.get('.like-button').click()
    // Verify like count increases
    cy.get('.like-count').should('not.be.empty')
  })

  it('should show related posts', () => {
    cy.get('.related-posts').should('exist')
    cy.get('.related-post-card').should('have.length.at.least', 1)
  })

  it('should handle comment replies', () => {
    cy.get('.comment-reply-button').first().click()
    cy.get('.reply-input').type('This is a test reply')
    cy.get('.submit-reply').click()
    cy.contains('This is a test reply').should('be.visible')
  })
})
