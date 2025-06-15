
//Comando customizado que não recebe nenhum argumento
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartins@gmail.com')  
    cy.get('#open-text-area').type('Agradeço a atenção.')
    cy.get('button[type="submit"]').click()
})

//Comando customizado que recebe um objeto como argumento
Cypress.Commands.add('fillMandatoryFieldsAndSubmit1', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)  
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
})

//Comando que recebe um objeto como argumento, com valores padrão
Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', (data = {
    firstName:'Emanuela',
    lastName:'Oliveira',
    email:'manu@hotmail.com',
    text: 'Test'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)  
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
})



