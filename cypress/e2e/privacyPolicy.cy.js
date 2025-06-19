//exercício extra 2 
it.only('testa a página da política de privacidade de forma independente', ()=>{
  
    cy.visit('./src/privacy.html')

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    cy.contains('p', 'Talking About Testing').should('be.visible')
  })
 


//Case test 02
Cypress._.times(3, ()=>{ // Uso do Lodash _.times repetindo o teste 5x para garantir que ele é determinístico e não um teste flaky. 
  
})  