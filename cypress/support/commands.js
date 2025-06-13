
//Comando customizado que não recebe nenhum argumento
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {

    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartinsjr@gmail.com')  
    cy.get('#open-text-area').type('Agradeço à atenção!')
  
})

//Comando customizado que recebe um objeto como argumento
Cypress.Commands.add('fillMandatoryFieldsAndSubmit1', (data) =>{

    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data['open-text-area'])
})

//Comando que recebe um objeto como argumento, com valores padrão

Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', (data = {}) =>{

 const defaultData = {
    firstName: 'Nildo',
    lastName: 'Martins',
    email: 'nildomartins@gmail.com',
    message: 'Obrigado'
}

  const formData = {...defaultData, ...data}
    cy.get('#firstName').type(formData.firstName)
    cy.get('#lastName').type(formData.lastName)
    cy.get('#email').type(formData.email)
    cy.get('#open-text-area').type(formData.message)


})
