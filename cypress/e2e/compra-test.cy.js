describe('funcionalidade:validação do processo de compra', () => {
  
  //login efetuado com sucesso
  it('login efetuado com sucesso', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
  })

  //login efetuado com falha (usuario inválido)
  it('usuário inválido', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standfsfs')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
  })

  //login efetuado com falha (senha inválida)
  it('senha inválida', () => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_saucfse')
    cy.get('[data-test="login-button"]').click()
    cy.get('[data-test="error"]').should('contain', 'Epic sadface: Username and password do not match any user in this service')
})

  //adicionar produto ao carrinho
  it('adicionar produto ao carrinho', () => {
    //processo de login
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    //processo de adicionar produto ao carrinho
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').should('contain', '1')
  })

  //remover produto do carrinho
  it('remover produto do carrinho', () => {
    //processo de login
    cy.visit('https://www.saucedemo.com/')  
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    //processo de remover produto do carrinho
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').should('contain', '1')
    cy.get('[data-test="remove-sauce-labs-backpack"]').click()
    cy.get('[data-test="shopping-cart-link"]').should('not.contain', '1')
  })

  //ir para a finalização da  compra
  it('ir para a finalizacao da compra', () => {
    //processo de login
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    //processo de adicionar produto ao carrinho
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    //processo de ir para a finalização da compra
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="title"]').should('contain', 'Your Cart')
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="title"]').should('contain', 'Checkout: Your Information')
    
  })

  //continuar compra
  it('continuar compra', () => {
    //processo de login
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    //processo de adicionar produto ao carrinho
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    //processo de ir para a finalização da compra
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="title"]').should('contain', 'Your Cart')
    //processo de continuar compra
   cy.get('[data-test="continue-shopping"]').click()
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
  })

  //adicionar informaçoes do cliente sucesso
  it('adicionar informações do cliente', () => {
    //processo de login
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    //processo de adicionar produto ao carrinho
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    //processo de ir para a finalização da compra
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="title"]').should('contain', 'Your Cart')
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="title"]').should('contain', 'Checkout: Your Information')
    //processo de adicionar informações do cliente
    cy.get('[data-test="firstName"]').type('João')
    cy.get('[data-test="lastName"]').type('Silva')
    cy.get('[data-test="postalCode"]').type('12345-678')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="title"]').should('contain', 'Checkout: Overview')
  })

  //nao adicionar informaçoes do cliente (campos obrigatórios)
  it('não adicionar informações do cliente', () => {
    //processo de login
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    //processo de adicionar produto ao carrinho
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    //processo de ir para a finalização da compra
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="title"]').should('contain', 'Your Cart')
    //processo de não adicionar informações do cliente e dar erro
    cy.get('[data-test="checkout"]').click()
    cy.get('[data-test="title"]').should('contain', 'Checkout: Your Information')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="error"]').should('contain', 'Error: First Name is required')
  })

  //finalizar compra com sucesso

  it('finalizar compra com sucesso', () => {
    //processo de login
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    //processo de adicionar produto ao carrinho
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    //processo de ir para a finalização da compra
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="title"]').should('contain', 'Your Cart')
    cy.get('[data-test="checkout"]').click()
    //processo de adicionar informações do cliente
    cy.get('[data-test="title"]').should('contain', 'Checkout: Your Information')
    cy.get('[data-test="firstName"]').type('João')
    cy.get('[data-test="lastName"]').type('Silva')
    cy.get('[data-test="postalCode"]').type('12345-678')
    cy.get('[data-test="continue"]').click()
    //processo de finalização da compra
    cy.get('[data-test="title"]').should('contain', 'Checkout: Overview')
    cy.get('[data-test="finish"]').click()
    cy.get('[data-test="title"]').should('contain', 'Checkout: Complete!')
    //processo de retorno ao loja
    cy.get('[data-test="back-to-products"]').click()
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
  })

  //cancelar compra
  it('cancelar compra', () => {
    //processo de login
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
    //processo de adicionar produto ao carrinho
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    //processo de ir para a finalização da compra
    cy.get('[data-test="shopping-cart-link"]').click()
    cy.get('[data-test="title"]').should('contain', 'Your Cart')
    cy.get('[data-test="checkout"]').click()
    //processo de adicionar informações do cliente
    cy.get('[data-test="title"]').should('contain', 'Checkout: Your Information') 
    cy.get('[data-test="firstName"]').type('João')
    cy.get('[data-test="lastName"]').type('Silva')
    cy.get('[data-test="postalCode"]').type('12345-678')
    cy.get('[data-test="continue"]').click()
    cy.get('[data-test="title"]').should('contain', 'Checkout: Overview')
    //processo de cancelamento da compra
    cy.get('[data-test="cancel"]').click()
    cy.get('[data-test="secondary-header"]').should('contain', 'Products')
  })


})
