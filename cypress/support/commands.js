Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (firstName, lastName, email, text) => {
    cy.get('#firstName').type(firstName); 
    cy.get('#lastName').type(lastName); 
    cy.get('#email').type(email); 
    cy.get('#open-text-area').type(text); 
    cy.contains('.button[type="submit"]', 'Enviar').click();
  });
  
  Cypress.Commands.add('fillMandatoryFieldsAndSubmit1', (data) => {
    cy.get('#firstName').type(data.firstName); 
    cy.get('#lastName').type(data.lastName); 
    cy.get('#email').type(data.email); 
    cy.get('#open-text-area').type(data.text); 
    cy.contains('.button[type="submit"]', 'Enviar').click();
  });

  Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', (data1 = {
    firstName:'Namedefault',
    lastName:'LastNamedefault',
    email:'emaildefault@gmail.com',
    text: 'Textdefault!'
  }) => {
    cy.get('#firstName').type(data1.firstName); 
    cy.get('#lastName').type(data1.lastName); 
    cy.get('#email').type(data1.email); 
    cy.get('#open-text-area').type(data1.text); 
    cy.contains('.button[type="submit"]', 'Enviar').click();
  });






























