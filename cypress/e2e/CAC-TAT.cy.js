//***LIÇÃO 01*** - Seu primeiro teste automatizado escrito com Cypress

//Case test 00
describe('Central de Atendimento ao Cliente TAT', () => { //Define a suíte de testes.
  beforeEach(() => { // Ação que será executada antes de cada teste
    cy.visit('./src/index.html'); // Visita o site antes de cada teste
  });
   
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  }),

//***LIÇÃO 02*** - Digitando em campos e clicando em elementos
//Case test 00
  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').invoke('val','Nildo') // Usei o comando invoke() para mudar o valor ao invés de usar o .type()
    cy.get('#lastName').type('Júnior')
    cy.get('#email').type('nildo@gmail.com')
    cy.get('#open-text-area').type('teste teste teste')
    cy.contains('button', 'Enviar').invoke('click') // Usei o comando invoke() passando o 'click' dentro dele ao invés do .click()

    cy.get('.success').should('be.visible')
  }),

//Case test 01 (Extra)
  it('preenche os campos obrigatórios e envia o formulário - texto longo', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10) //Usar textos longos (Módulo Cypress, Lodash, função .repeat)
    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Júnior')
    cy.get('#email').type('nildo@gmail.com')
    cy.get('#open-text-area').type(longText, {delay:0})
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  }),

//Case test 02 (Extra)
  it.only('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Júnior')
    cy.get('#email').type('nildomartins.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button', 'Enviar').click()
    
    cy.get('.error').should('be.visible')
  }),

//Case test 03 (Extra)
it('Se um valor não-numérico for digitado no campo telefone, seu valor continuará vazio', () => {
  cy.get('#phone')
    .type('teste')

    .should('have.value', '')
}),

//Case test 04 (Extra)
it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
  cy.get('#firstName').type('Nildo')  
  cy.get('#lastName').type('Júnior')
  cy.get('#email').type('nildojunior@gmail.com')
  cy.get('#open-text-area').type('teste')
  cy.get('#phone-checkbox').check()
  cy.contains('button', 'Enviar').click()
  cy.get('.error').should('be.visible')
}),

//Case test 05 (Extra)
it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
  cy.get('#firstName')
    .type('Nildo')
    .should('have.value', 'Nildo')
    .clear()
    .should('have.value', '')

  cy.get('#lastName')
    .type('Júnior')
    .should('have.value', 'Júnior')
    .clear()
    .should('have.value', '')

  cy.get('#email')
    .type('nildomartins@gmail.com')
    .should('have.value', 'nildomartins@gmail.com')
    .clear()
    .should('have.value', '')

  cy.get('#phone')
    .type(12345678)
    .should('have.value', 12345678)
    .clear()
    .should('have.value', '')
})

//Case test 06 (Extra)
it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  cy.get('button').click() //Pega a tag button [que te a propriedade type="submit"]

  cy.get('.error').should('be.visible')
}),

//Case test 07 (Extra)
it('Envia o formuário com sucesso usando um comando customizado',()=>{

  const data = {
    firstName:'Maria',
    lastName:'Elizabete',
    email: 'beth@gmail.com',
    text:'testing'
  }
   cy.fillMandatoryFieldsAndSubmit(data) // Aqui estou chamando a variável 'data' passando valores diferentes, mas este meu comando customizado possui valores padrão, se eu NÃO passar a variavel 'data' e os valores de default são trazidos.
   cy.get('.success').should('be.visible')

}),

//***LIÇÃO 03*** - Selecionando opções em campos de seleção suspensa
//Case test 00
it('seleciona um produto (YouTube) por seu texto', () => {
  cy.get('#product')
  .select('YouTube')
  .should('have.value', 'youtube')
})

//Case test 01
it('seleciona um produto (Mentoria) por seu valor (value)', () => {
  cy.get('#product')
  .select('mentoria')
  .should('have.value', 'mentoria')
})

//Case test 02
it('seleciona um produto (Blog) por seu índice', () => {
  cy.get('#product')
  .select(1)
  .should('have.value', 'blog')
})

//*** LIÇÃO 04 - Marcando inputs do tipo radio ***

//Case test 00
it('marca o tipo de atendimento "Feedback"',() => {
  cy.get('input[type="radio"][value="feedback"]')
  .check()
  .should('be.checked')
})


//Case test 01
  it('marca cada tipo de atendimento', ()=>{
    
   cy.get('input[type="radio"]') //Pega o elemento radio
     .each((typeOfService) => { //funçao each para pega cada elemento dentro do radio, porém ela recebe como argumento uma função, que  nesse caso nomeamos como: typeOfService (Tipo de Serviço).
      cy.wrap(typeOfService) // O comando .wrap() empacota cada elemento, mas para isso passamos o TypeOfService dentro dele.
        .check() // Marca cada checkbox encontrado.
        .should('be.checked') //Faz a vericação se cada elemento foi marcado.
     })

 })

//*** LIÇÃO 05 - Marcando (e desmarcando) inputs do tipo checkbox ***

//Case test 00

it('marca ambos checkboxes, depois desmarca o último', ()=>{
  cy.get('input[type="checkbox"]') //O cy.get() retorna um ou mais elementos, nesse caso, pegamos pegamos um seletor mais generico e pegamos todos.
    .check() // Aqui o .check() marcou todos os elementos.
    .should('be.checked') // Validou que todos os elementos foram marcados.
    .last() // Pegou o último elemento do checkbox.
    .uncheck() // Desmarcou o último elemento do checkbox.
    .should('not.be.checked') //Validou que o último elemento foi desmarcado.
 })

 //Case test 01
 it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
   cy.get('#firstName').type('Nildo')
   cy.get('#lastName').type('Júnior')
   cy.get('#email').type('nj@gmail.com')
   cy.get('#phone-checkbox').check()
   cy.get('#open-text-area').type('teste')
   cy.get('button[type="submit"')
      .click()
   cy.get(".error")
      .should('be.visible')
 })

//*** LIÇÃO 06 - Fazendo upload de arquivos com Cypress ***

//Case test 00

it('seleciona um arquivo da pasta fixtures', ()=>{
  cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json')
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')
        
      })   
})
//Case test 01
it('seleciona um arquivo simulando um drag-and-drop', ()=>{
  cy.get('input[type="file"]')
    .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')

      })
      
})
//Case test 02
it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
  cy.fixture('example.json').as('sampleFile')
  cy.get('input[type="file"]')
  .selectFile('@sampleFile')
  .should(input => {
     expect(input[0].files[0].name).to.equal('example.json')
      
    })   
})
//*** LIÇÃO 07 - Lidando com links que abrem em outra aba. ***

//Case test 00
it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{
  cy.contains('a', 'Política de Privacidade') //Usamos o contains para deixar mais seguro, pois o cy.get() trouxe um seletor muito genérico.
    .should('have.attr', 'href', 'privacy.html')// Valida que o elemento <a> possui o atributo 'href' com o valor 'privacy.html
    .and('have.attr', 'target', '_blank') //Valida que o elemento <a> possui o atributo 'target' com o valor '_blank'.
})


//Case test 01
it('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{
  cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()
    
    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
})
//Case test 02


 
})
