describe('Central de Atendimento ao Cliente TAT', () => {

 beforeEach(() => {
       cy.visit('./src/index.html') 
    });

  it('verifica o título da aplicação', () => {

    cy.title()
      .should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  //Exercício
  it('preenche os campos obrigatórios e envia o formulário', ()=> {
    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartins@gmail.com')  
    cy.get('#open-text-area').type('Agradeço a atenção.')
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })

//Exercício extra 1
  it('preenche os campos obrigatórios e envia o formulário', ()=> { 
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwyz', 10)
    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartins@gmail.com')  
    cy.get('#open-text-area').type(longText,{delay:0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })
//Exercício extra 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
    cy.get('#firstName').type('nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartins%com')
    cy.get('#open-text-area').type('Obrigado pela atenção!')
    cy.get('button[type="submit"]').click()

    cy.get(".error").should('be.visible')

  }) 
//Exercício extra 3
it('se um valor não-numérico for digitado no campo telefone, seu valor continuará vazio', ()=>{
  cy.get('#phone')
    .type('abcdef')
    .should('have.value', '')
})

//Exercício extra 4
it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartins@gmail.com')
    cy.get('#open-text-area').type('Obrigado pela atenção.')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()

    cy.get(".error").should('be.visible')
})

//Exercício extra 5
it('preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{
  cy.get('#firstName')
    .type('Nildo')
    .should('have.value', 'Nildo')
    .clear()
    .should('have.value','')
  cy.get('#lastName')
    .type('Martins')
    .should('have.value', 'Martins')
    .clear()
    .should('have.value', '')
  cy.get('#email')
    .type('nildomartins@gmail.com')
    .should('have.value', 'nildomartins@gmail.com')
    .clear()
    .should('have.value', '')
  cy.get('#phone')
    .type('999888777')
    .should('have.value', '999888777')
    .clear()
    .should('have.value', '')

})

//Exercício extra 6
it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{
  cy.get('.button')
    .click()
  cy.get(".error").should('be.visible')
})

//Exercício extra 7 - Comando customizado que não recebe nenhum argumento
it('envia o formuário com sucesso usando um comando customizado',()=> {
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')
})

//Comando customizado que recebe um objeto como argumento
it('envia o formuário com sucesso usando um comando customizado',()=> {
  const data = {
    firstName: 'Nildo',
    lastName: 'Martins',
    email:'nildomartins@gmail.com',
    text:'Teste'
  }
  cy.fillMandatoryFieldsAndSubmit1(data)

  cy.get('.success').should('be.visible')
})

//Comando que recebe um objeto como argumento, com valores padrão
it('envia o formuário com sucesso usando um comando customizado',()=> {
  const data = {
    firstName: 'Nildo',
    lastName: 'Martins',
    email:'nildomartins@gmail.com',
    text:'Teste'
  }
  cy.fillMandatoryFieldsAndSubmit2(data)

  cy.get('.success').should('be.visible')
})

it('envia o formuário com sucesso usando um comando customizado', ()=>{ //Aqui usando o comando com os valores padrões.
 
  cy.PreencheLogin()
  
  cy.get('.success').should('be.visible')
})


it('envia o formuário com sucesso usando um comando customizado', ()=>{ ///Aqui usando o comando mas passando valores diferentes.
 
  cy.PreencheLogin({
    firstName:'Manu', //Posso mudar só um campo ou todos, se eu mudar só um, os outros campos serão preenchidos com o padrão.
    lastName:'Oliver',
    email:'manu@gmail.com'
  })
  
  cy.get('.success').should('be.visible')
})
    
it('Preencher formulário', ()=>{ //Aqui usando o comando mas passando valores diferentes.
  cy.FillForm({
    firstName: 'Dalida',
    lastName: 'Gigliotti',
    phone:'111222333'
  })

   cy.get('.success').should('be.visible')
})

it.only('Login com sucesso', ()=>{ //Aqui usando o comando com os valores padrões.
  cy.LonginSucesso()

  cy.get('.success').should('be.visible')
})




})


