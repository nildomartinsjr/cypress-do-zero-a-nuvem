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
    cy.clock()

    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartins@gmail.com')  
    cy.get('#open-text-area').type('Agradeço a atenção.')
    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  })

//Exercício extra 1
  it('preenche os campos obrigatórios e envia o formulário', ()=> { 
    cy.clock()

    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwyz', 10)
    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartins@gmail.com')  
    cy.get('#open-text-area').type(longText,{delay:0})
    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')

  })

//Exercício extra 2
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
    cy.clock()

    cy.get('#firstName').type('nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartins%com')
    cy.get('#open-text-area').type('Obrigado pela atenção!')
    cy.contains('button','Enviar').click()

    cy.get(".error").should('be.visible')

    cy.tick(3000)

    cy.get(".error").should('not.be.visible')

  }) 
//Exercício extra 3
it('se um valor não-numérico for digitado no campo telefone, seu valor continuará vazio', ()=>{
  cy.get('#phone')
    .type('abcdef')
    .should('have.value', '')
})

//Exercício extra 4
it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
    cy.clock()

    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Martins')
    cy.get('#email').type('nildomartins@gmail.com')
    cy.get('#open-text-area').type('Obrigado pela atenção.')
    cy.get('#phone-checkbox').check()
    cy.contains('button','Enviar').click()

    cy.get(".error").should('be.visible')

     cy.tick(3000)

    cy.get(".error").should('not.be.visible')
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
  cy.clock()
  
  cy.contains('button','Enviar').click()
  cy.get(".error").should('be.visible')

  cy.tick(3000)

  cy.get(".error").should('not.be.visible')
})

//Exercício extra 7 - Comando customizado que não recebe nenhum argumento.
it('envia o formuário com sucesso usando um comando customizado 1',()=> {
  cy.clock()
  
  cy.fillMandatoryFieldsAndSubmit()

  cy.get('.success').should('be.visible')

  cy.tick(3000)

  cy.get('.success').should('not.be.visible')
})

//Comando customizado que recebe um objeto como argumento.
it('envia o formuário com sucesso usando um comando customizado 2',()=> {
  cy.clock()
  
  const data = {
    firstName: 'Nildo',
    lastName: 'Martins',
    email:'nildomartins@gmail.com',
    text:'Test'
  }
  cy.fillMandatoryFieldsAndSubmit1(data)

  cy.get('.success').should('be.visible')

  cy.tick(3000)

  cy.get('.success').should('not.be.visible')


})

//Comando que recebe um objeto como argumento, com valores padrão
it('envia o formuário com sucesso usando um comando customizado 3',()=> {
  cy.clock()

  const data = {
    firstName: 'Nildo',
    lastName: 'Martins',
    email:'nildomartins@gmail.com',
    text:'Teste'
  }
  cy.fillMandatoryFieldsAndSubmit2(data)

  cy.get('.success').should('be.visible')

  cy.tick(3000)

  cy.get('.success').should('not.be.visible')
})

it('envia o formuário com sucesso usando um comando customizado 4', ()=>{ //Aqui usando o comando com os valores padrões.
  cy.clock()
 
  cy.PreencheLogin()
  
  cy.get('.success').should('be.visible')

  cy.tick(3000)

  cy.get('.success').should('not.be.visible')
})


it('envia o formuário com sucesso usando um comando customizado 5', ()=>{ ///Aqui usando o comando mas passando valores diferentes.
  cy.clock()
 
  cy.PreencheLogin({
    firstName:'Manu', //Posso mudar só um campo ou todos, se eu mudar só um, os outros campos serão preenchidos com o padrão.
    lastName:'Oliver',
    email:'manu@gmail.com'
  })
  
  cy.get('.success').should('be.visible')

  cy.tick(3000)

  cy.get('.success').should('not.be.visible')
})
    
it('envia o formuário com sucesso usando um comando customizado 6', ()=>{ //Aqui usando o comando mas passando valores diferentes.
  cy.clock()

  cy.FillForm({
    firstName: 'Dalida',
    lastName: 'Gigliotti',
    phone:'111222333'
  })

   cy.get('.success').should('be.visible')

   cy.tick(3000)

  cy.get('.success').should('not.be.visible')
})

it('envia o formuário com sucesso usando um comando customizado 7', ()=>{ //Aqui usando o comando com os valores padrões.
  cy.clock()

  cy.LonginSucesso()

  cy.get('.success').should('be.visible')

  cy.tick(3000)

  cy.get('.success').should('not.be.visible')
})

it('envia o formuário com sucesso usando um comando customizado 8', () =>{
  cy.clock()

  cy.meucomando()

  cy.get('.success').should('be.visible')

  cy.tick(3000)

  cy.get('.success').should('not.be.visible')
})

//Selecionando opções em campos de seleção suspensa

//Exercício - selencionando pelo texto
it('seleciona um produto (YouTube) por seu texto', ()=>{
  cy.get('#product').select('YouTube')
  .should('have.value','youtube')
})

//Exercício extra 1 - selencionando pelo valor
it('seleciona um produto (mentoria) por seu valor (value)',() => {
  cy.get('#product').select('mentoria')
  .should('have.value', 'mentoria')
})

//Exercício extra 2 selencionando pelo índice
it('seleciona um produto (Blog) por seu índice', ()=>{
 cy.get('#product').select(1)
 .should('have.value', 'blog')
})

//Marcando inputs do tipo radio

//exercício 
it('marca o tipo de atendimento "Feedback"', ()=>{
 cy.get('input[value="feedback"]').check()
    .should('have.value', 'feedback')
})

//exercício extra 1
it('marca cada tipo de atendimento', ()=>{
  cy.get('input[type="radio"]')
  .each(TypeofService => {
    cy.wrap(TypeofService)
    .check()
    .should('be.checked')
  })
})

//Marcando (e desmarcando) inputs do tipo checkbox

//exercício
it('marca ambos checkboxes, depois desmarca o último', ()=>{
  cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('be.not.checked')
})

//Fazendo upload de arquivos com Cypress

//exercício

it('seleciona um arquivo da pasta fixtures',()=>{
  cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json')
    .should(input => {
     expect(input[0].files[0].name).to.equal('example.json')
  })
})

//exercício extra 1

it('seleciona um arquivo simulando um drag-and-drop', ()=>{
  cy.get('#file-upload')
    .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
    .should(input => {
     expect(input[0].files[0].name).to.equal('example.json')
  })
})

//exercício extra 2

it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
  cy.fixture('example.json').as('sampleFile')
  cy.get('#file-upload')
    .selectFile('@sampleFile')
    .should(input => {
     expect(input[0].files[0].name).to.equal('example.json')
  })
 })

 //Lidando com links que abrem em outra aba

 //exercício

 it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=>{
  cy.contains('a', 'Política de Privacidade')
  .should('have.attr', 'href', 'privacy.html')
  .and('have.attr','target', '_blank')
 })

 //exercício extra 1

 it('acessa a página da política de privacidade removendo o target e então clicando no link', ()=>{
  cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
 })

 //lodash (Cypress._)
  Cypress._.times (2, () =>
   {it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', ()=>{ //utilizando a funcionalidade Cypress._.times()

    cy.clock()
  
    cy.contains('button','Enviar').click()
    cy.get(".error").should('be.visible')

    cy.tick(3000)

    cy.get(".error").should('not.be.visible')
    })
  })

  it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})

it('preenche o campo da área de texto usando o comando invoke', ()=>{
  cy.get('#open-text-area').invoke('val', 'obrigado')
    .should('have.value', 'obrigado')
})

it('preenche o campo telefone usando o comando invoke', ()=>{
  cy.get('#phone').invoke('val', '999888777')
  .should('have.value', '999888777')
})

it('verifica tamanho da fonte do botão enviar usando o comando invoke', ()=>{
  cy.get('.button').invoke('css','font-size')
  .should('equal', '19.2px')
})
it('faz uma requisição HTTP', ()=>{
  cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
    .as('getRequest')
    .its('status')
    .should('be.equal', 200)
  cy.get('@getRequest')
    .its('statusText')
    .should('be.equal', 'OK')
  cy.get('@getRequest')
    .its('body')
    .should('include', 'CAC TAT')
})

  it('desafio: encontre o gato na aplicação',()=>{
    cy.get('#cat')
      .invoke('show')
      .should('be.visible')
    cy.get('#title')
      .invoke('text', 'CAT TAT')
      .should('contain', 'CAT TAT')
    cy.get('#subtitle')
      .invoke('text', 'Eu amo gatos!')
  })

})

 



