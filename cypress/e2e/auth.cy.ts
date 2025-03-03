describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/signin')
  })

  it('should display login form correctly', () => {
    cy.get('input[type="email"]').should('be.visible')
    cy.get('input[type="password"]').should('be.visible')
    cy.get('button[type="submit"]').should('be.visible')
  })

  it('should show validation errors for empty fields', () => {
    cy.get('button[type="submit"]').click()
    cy.get('.error-message').should('be.visible')
  })

  it('should show error for invalid credentials', () => {
    cy.get('input[type="email"]').type('invalid@email.com')
    cy.get('input[type="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.get('.swal2-popup').should('contain', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง')
  })

  it('should navigate to signup page', () => {
    cy.contains('สมัครสมาชิก').click()
    cy.url().should('include', '/signup')
  })

  describe('Registration Tests', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/signup')
    })

    it('should display registration form', () => {
      cy.get('input[name="username"]').should('be.visible')
      cy.get('input[type="email"]').should('be.visible')
      cy.get('input[type="password"]').should('be.visible')
      cy.get('input[name="confirmPassword"]').should('be.visible')
    })

    it('should validate password match', () => {
      cy.get('input[name="username"]').type('testuser')
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('input[type="password"]').type('password123')
      cy.get('input[name="confirmPassword"]').type('password124')
      cy.get('button[type="submit"]').click()
      cy.get('.error-message').should('contain', 'รหัสผ่านไม่ตรงกัน')
    })
  })

  describe('User Session Tests', () => {
    it('should maintain user session after successful login', () => {
      // Login
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('input[type="password"]').type('password123')
      cy.get('button[type="submit"]').click()

      // Verify login persists after page reload
      cy.reload()
      cy.get('.user-profile').should('exist')
    })

    it('should successfully logout', () => {
      // Login first
      cy.get('input[type="email"]').type('test@example.com')
      cy.get('input[type="password"]').type('password123')
      cy.get('button[type="submit"]').click()

      // Logout
      cy.get('.logout-button').click()
      cy.get('button').contains('เข้าสู่ระบบ').should('exist')
    })
  })
})
