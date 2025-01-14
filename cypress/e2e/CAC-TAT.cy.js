describe('Central de Atendimento ao Cliente TAT', () => {// Suite de Teste: Agrupa todos os casos de teste relacionados.
  
  beforeEach(() => { //Executa antes de cada caso de teste, garantindo que a página inicial seja carregada antes do início do teste.
    cy.visit('./src/index.html'); // Acessa o arquivo HTML da aplicação.
  });

// Caso de Teste 0 
  it('verifica o título da aplicação', () => {
    cy.title() // Obtém o título da página.
      .should('be.equal', 'Central de Atendimento ao Cliente TAT'); // Valida que o título é exatamente o esperado.
  });

// Caso de Teste 1 
  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10); // Cria um texto longo repetindo o alfabeto 10 vezes.

    cy.get('#firstName').type('Nildo'); // Preenche o campo "Primeiro Nome".
    cy.get('#lastName').type('Martins'); // Preenche o campo "Sobrenome".
    cy.get('#email').type('nildomartinsjr@gmail.com'); // Preenche o campo "Email" com um valor válido.
    cy.get('#open-text-area').type(longText, { delay: 0 }); // Preenche o campo de texto com o texto longo, sem atraso entre os caracteres.
    cy.contains('.button[type="submit"]', 'Enviar').click(); // Clica no botão de enviar formulário.

    cy.get('.success').should('be.visible'); // Valida que a mensagem de sucesso está visível após o envio.
  });

// Caso de Teste 2 
  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Nildo'); // Preenche o campo "Primeiro Nome".
    cy.get('#lastName').type('Martins'); // Preenche o campo "Sobrenome".
    cy.get('#email').type('nildomartinsjr.com'); // Preenche o campo "Email" com um valor inválido (sem o '@').
    cy.get('#open-text-area').type('djfhlasjkhdflk'); // Preenche o campo de texto obrigatório com um valor qualquer.
    cy.contains('.button[type="submit"]', 'Enviar').click(); // Clica no botão de enviar formulário.

    cy.get('.error').should('be.visible'); // Valida que a mensagem de erro está visível após o envio do formulário inválido.
  });

// Caso de Teste 3 
  it('Campo telefone permanece vazio ao digitar um valor não numérico', () => {
    cy.get('#phone') // Seleciona o campo de telefone.
      .type('hfsjdhf') // Tenta preencher com caracteres não numéricos.
      .should('have.value', ''); // Valida que o valor do campo permanece vazio.
  });

// Caso de Teste 4 
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Nildo'); // Preenche o campo "Primeiro Nome".
    cy.get('#lastName').type('Júnior'); // Preenche o campo "Sobrenome".
    cy.get('#email').type('nildomartinsjr@gmail.com'); // Preenche o campo "Email" com um valor válido.
    cy.get('#phone-checkbox').click(); // Marca a caixa de seleção que torna o campo "Telefone" obrigatório.
    cy.get('#open-text-area').type('Obrigado!'); // Preenche o campo de mensagem com um texto qualquer.
    cy.contains('.button[type="submit"]', 'Enviar').click();  // Tenta enviar o formulário sem preencher o campo "Telefone".

    cy.get('.error').should('be.visible'); // Verifica se a mensagem de erro está visível no formulário.
  });
  
// Caso de Teste 5 (Comando aprendido .clear())
  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
  
  cy.get('#firstName')  // Seleciona o campo "Nome"
    .type('Nildo')      // Digita o valor "Nildo"
    .should('have.value', 'Nildo') // Verifica se o campo tem o valor "Nildo"
    .clear()            // Limpa o campo
    .should('have.value', '')  // Verifica se o campo está vazio após limpar
  
  cy.get('#lastName')   // Seleciona o campo "Sobrenome"
    .type('Júnior')     // Digita o valor "Júnior"
    .should('have.value', 'Júnior') // Verifica se o campo tem o valor "Júnior"
    .clear()            // Limpa o campo
    .should('have.value', '')  // Verifica se o campo está vazio após limpar
  
  cy.get('#email')      // Seleciona o campo "Email"
    .type('nildomartinsjr@gmail.com')  // Digita o valor do e-mail
    .should('have.value', 'nildomartinsjr@gmail.com') // Verifica se o campo tem o valor correto
    .clear()            // Limpa o campo
    .should('have.value', '')  // Verifica se o campo está vazio após limpar

  cy.get('#phone')      // Seleciona o campo "Telefone"
    .type('934238999')     // Digita o número de telefone
    .should('have.value', '934238999')  // Verifica se o campo tem o número digitado
    .clear()            // Limpa o campo
    .should('have.value', '')  // Verifica se o campo está vazio após limpar
});

// Caso de Teste 6
  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  
  cy.contains('.button[type="submit"]', 'Enviar').click()  // Localiza o botão de envio do formulário e clica nele
  
  cy.get('.error').should('be.visible')  // Verifica se o elemento com a classe 'error' está visível (indica que houve erro na submissão)
});

// Caso de Teste 7.0 (Argumentos individuais) Se os campos são fixos e há poucos parâmetros, pois é mais simples e direto.
  it('Envia o formuário com sucesso usando um comando customizado.', () => {
    cy.fillMandatoryFieldsAndSubmit('Nildo', 'Júnior', 'nildomartinsjr@gmail.com', 'Obrigado!');// Usa o comando customizado para preencher e enviar o formulário.

    cy.get('.success').should('be.visible'); 
 
  });

// Caso de Teste 7.1 (Objeto como argumento) 
// se os campos podem variar, o número de argumentos é alto, ou você deseja maior flexibilidade e legibilidade no código.
// Para projetos maiores ou mais complexos, a abordagem do objeto (7.1) geralmente é preferida por sua manutenibilidade e escalabilidade.
  it('Envia o formuário com sucesso usando um comando customizado.', () => {
    const data = {
      firstName:'Nildo',
      lastName:'Júnior',
      email:'nildomartinsjr@gmail.com',
      text: 'Obrigado!'
    } 

    cy.fillMandatoryFieldsAndSubmit1(data)

    cy.get('.success').should('be.visible'); 
    
  });

// Caso de Teste 7.2 (Objeto como argumento - Default) 

  it('Envia o formuário com sucesso usando um comando customizado.', () => {
    cy.fillMandatoryFieldsAndSubmit2()

    cy.get('.success').should('be.visible'); 
  
  });
// Caso de Teste 8
  it('Seleciona um produto (YouTube) por seu texto.', () => {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
  });

// Caso de Teste 9
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
  });

// Caso de Teste 9
  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
  });

// Caso de Teste 10
  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  });

// Caso de Teste 11 
  it('Marca cada tipo de atendimento', () => {

    cy.get('input[type="radio"]')
      .each(typeOfService => {
        cy.wrap(typeOfService)
        .check()
        .should('be.checked')
      })
    });
// Caso de Teste 12
  it('marca ambos checkboxes, depois desmarca o último', () => {

    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  });

// Caso de Teste 13
  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=> {
    cy.get('#firstName').type('Nildo')
    cy.get('#lastName').type('Júnior')
    cy.get('#email').type('nildo@gmail.com')
    cy.get('#open-text-area').type('Obrigado!')
    cy.get('#phone-checkbox').check()
    cy.contains('.button[type="submit"]', 'Enviar').click()

    cy.get('.error').should('be.visible')
  });

// Caso de Teste 14
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .then(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
    });

// Caso de Teste 15
  it('seleciona um arquivo simulando um drag-and-drop', ()=> {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json',{action:'drag-drop'})
      .then(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
    });
    
// Caso de Teste 16
  it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', ()=>{
    cy.fixture('example.json', {encoding: null}).as('exampleFile')
    cy.get('#file-upload')
      .selectFile('@exampleFile')
      .then(input => {
        console.log(input)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  });

// Caso de Teste 18
  it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique.', ()=>{
    cy.contains('a', 'Política de Privacidade')

      .should('have.attr', 'href', 'privacy.html') 
      .and('have.attr','target','_blank')
  });

  // Caso de Teste 19
  it('Acessa a página da política de privacidade removendo o target e então clicando no link.', ()=>{
    cy.contains('a', 'Política de Privacidade') 
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  });

//Caso de teste 20
//Testei a página de política de privacidade de forma independente, criei uma nova suite de teste com arquivo separado da página principal. Arquivo se chama: privacyPolicy.cy.je que está dentro da pasta (e2e).

//Caso de teste 21




})

// it('Marca o tipo de atendimento "Elogio"', () => {
//   cy.get('input[type="radio"][value="elogio"]')
//     .check()
//     .should('be.checked')
// });

// it('Marca cada tipo de atendimento', ()=> {
//   cy.get('input[type="radio"')
//   .each(TiposDeAtendimento => {
//     cy.wrap(TiposDeAtendimento)
//       .check()
//       .should('be.checked')
//   })
// });
//   it('Marca e desmarca o primeiro checkbox', ()=>{
//     cy.get('input[type="checkbox"]')
//       .first()
//       .check()
//       .should('be.checked')
//       .uncheck()
//       .should('not.be.checked')
//   });

//   it('Verifica o estado inicial dos checkboxes', ()=> {
//     cy.get('input[type="checkbox"]')
//       .should('not.be.checked')
//   });

//   it('Não permite envio sem telefone quando obrigatório.', ()=>{
//     cy.get('#firstName').type('Nildo')
//     cy.get('#lastName').type('Júnior')
//     cy.get('#email').type('nildo@gmail.com')
//     cy.get('#phone-checkbox').check()
//     cy.get('#open-text-area').type('Obrigado!')
//     cy.contains('.button[type="submit"]', 'Enviar').click()
//     cy.get('.error').should('be.visible')
//   });

//   it('Permite envio com telefone preenchido.',()=>{
//     cy.get('#firstName').type('Nildo')
//     cy.get('#lastName').type('Júnior')
//     cy.get('#email').type('nildo@gmail.com')
//     cy.get('#phone').type('999888777')
//     cy.get('#phone-checkbox').check()
//     cy.get('#open-text-area').type('Obrigado!')
//     cy.contains('.button[type="submit"]', 'Enviar').click()
//     cy.get('.success').should('be.visible')
//   });

//   it.only('Marca múltiplos checkboxes', ()=> {
//     cy.get('input[type="checkbox"]')
//       .check()
//       .should('be.checked')
//       .uncheck()
//       .should('not.be.checked')
//   });



