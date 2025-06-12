describe('Central de Atendimento ao Cliente TAT', () => {

 beforeEach(() => {
       cy.visit('./src/index.html') 
    });

  it('verifica o título da aplicação', () => {

    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', ()=> {
    cy.get('#firstName')
      .type('Nildo')
    cy.get('#lastName')
      .type('Martins')
    cy.get('#email')
      .type('nildomartins@gmail.com')  
    cy.get('#open-text-area')
      .type('Agradeço a atenção.')
    cy.get('.button')
      .click()
    cy.get('.success')
      .should('be.visible')
  })

  it('preenche os campos obrigatórios e envia o formulário', ()=> {
    cy.get('#firstName')
      .type('Nildo')
    cy.get('#lastName')
      .type('Martins')
    cy.get('#email')
      .type('nildomartins@gmail.com')  
    cy.get('#open-text-area')
      .type('Agradeço a atenção. Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.Agradeço a atenção.',{delay:0})
    cy.get('.button')
      .click()
    cy.get('.success')
      .should('be.visible')
  })

  it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
    cy.get('#firstName')
    .type('nildo')
    cy.get('#lastName')
    .type('Martins')
    cy.get('#email')
    .type('nildomartins%com')
    cy.get('#open-text-area')
    .type('Obrigado pela atenção!')
    cy.get('.button')
    .click()
    cy.get(".error")
    .should('be.visible')

  }) 
  
})
