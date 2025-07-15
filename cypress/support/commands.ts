declare global {
  namespace Cypress {
    interface Chainable {
      login(): Chainable<void>;
      addIngredient(name: string): Chainable<void>;
      fillConstructor(bunName: string, fillingName: string): Chainable<void>;
      checkOrderModal(orderNumber: string): Chainable<void>;
    }
  }
}

// Авторизация
Cypress.Commands.add('login', () => {
  window.localStorage.setItem('accessToken', 'fake-access-token');
  cy.setCookie('refreshToken', 'fake-refresh-token');
});

// Добавление ингредиента по имени
Cypress.Commands.add('addIngredient', (name: string) => {
  cy.contains('li', name).find('button').contains('Добавить').click();
});

// Добавление булки + начинки + клик по кнопке
Cypress.Commands.add(
  'fillConstructor',
  (bunName: string, fillingName: string) => {
    cy.addIngredient(bunName);
    cy.addIngredient(fillingName);
    cy.get('button').contains('Оформить заказ').click();
  }
);

// Проверка модалки с заказом
Cypress.Commands.add('checkOrderModal', (orderNumber: string) => {
  cy.get('#modals').find('h2').should('contain', orderNumber);
});

export {};
