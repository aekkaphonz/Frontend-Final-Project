/// <reference types="cypress" />

// Import Testing Library commands
import '@testing-library/cypress/add-commands'

Cypress.Commands.add('login', (email: string, password: string) => {
  // Add your login command implementation here if needed
})

// Add more custom commands as needed
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
      // Add more custom command types here
    }
  }
}
