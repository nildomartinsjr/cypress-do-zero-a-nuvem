import {faker} from '@faker-js/faker'
describe('Preenche formulário com Faker', () => {
    it('Successfuly',()=>{
        cy.visit('./src/index.html')

    
    const nome = faker.lorem.words(1)
    const sobrenome = faker.lorem.words(1)
    const email = faker.internet.email()
    const text = faker.lorem.words(10)

    cy.get('#firstName').type(nome).should('have.value', nome)
    cy.get('#lastName').type(sobrenome).should('have.value', sobrenome)
    cy.get('#email').type(email).should('have.value', email)
    cy.get('#phone').type('999888777').should('have.value', '999888777')

    cy.get('#product').select('youtube').should('have.value', 'youtube')

    cy.get('input[value="feedback"]').check().should('be.checked')
    cy.get('#email-checkbox').check().should('be.checked')
    cy.get('#open-text-area').type(text).should('have.value', text)

   
    cy.get('.button[type="submit"]').click()

    cy.get('.success').should('be.visible')

    })
}); 