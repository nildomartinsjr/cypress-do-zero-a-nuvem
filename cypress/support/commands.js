
//Comando customizado que não recebe nenhum argumento
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', () => {
    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartins@gmail.com')  
    cy.get('#open-text-area').type('Agradeço a atenção.')
    cy.contains('button','Enviar').click()
})

//Comando customizado que recebe um objeto como argumento
Cypress.Commands.add('fillMandatoryFieldsAndSubmit1', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)  
    cy.get('#open-text-area').type(data.text)
    cy.contains('button','Enviar').click()
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
    cy.contains('button','Enviar').click()
})
//Comando que recebe um objeto como argumento, com valores padrão (Exercício de repetição 1)

Cypress.Commands.add('PreencheLogin', (data = {}) =>{
    const {

        firstName = 'Marie',
        lastName = 'Claire',
        email = 'mclaraire@gmail.com',
        text = 'Thank you!'
    } = data;

    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)  
    cy.get('#open-text-area').type(text)
    cy.contains('button','Enviar').click()

})

//Comando que recebe um objeto como argumento, com valores padrão (Exercício de repetição 1)
Cypress.Commands.add('FillForm', (data = {})=>{
   const {
    firstName = 'João',
    lastName = 'Gilberto',
    email = 'joaog@gmail.com',
    phone = '999888777',
    text = 'Agradeço à atenção.'
   } = data;

   cy.get('#firstName').type(firstName)
   cy.get('#lastName').type(lastName)
   cy.get('#email').type(email)
   cy.get('#phone').type(phone)
   cy.get('#phone-checkbox').check()
   cy.get('#open-text-area').type(text)
   cy.contains('button','Enviar').click()

})

//Comando que recebe um objeto como argumento, com valores padrão (Exercício de repetição 2)
Cypress.Commands.add('LonginSucesso', (data = {})=>{
    const {
        firstName = 'Julio',
        lastName = 'Lima',
        email = 'juliolima@hotmail.com',
        phone = '444555666',
        text = 'abcdefghij'
    } = data;

    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#phone').type(phone)
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(text)
    cy.contains('button','Enviar').click()

})
//Comando que recebe um objeto como argumento, com valores padrão (Exercício de repetição 3)
Cypress.Commands.add('meucomando', (data = {})=>{
    const {
    firstName = 'Jose',
    lastName = 'Maria',
    email = 'josemaria@gmail.com',
    phone = '999888444',
    text = 'Thank you'
     } = data 

    cy.get('#firstName').type(firstName)
    cy.get('#lastName').type(lastName)
    cy.get('#email').type(email)
    cy.get('#phone').type(phone)
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type(text)
    cy.contains('button','Enviar').click()

})