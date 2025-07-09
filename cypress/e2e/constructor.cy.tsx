/// <reference types="cypress" />

describe('Конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    // Подставляем токены (авторизация)
    window.localStorage.setItem('accessToken', 'fake-access-token');
    cy.setCookie('refreshToken', 'fake-refresh-token');
    // Перехват создания заказа
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'makeOrder'
    );
    // Добавляем булку и начинку
    cy.contains('li', 'Краторная булка N-200i')
      .find('button')
      .contains('Добавить')
      .click();
    cy.contains('li', 'Биокотлета из марсианской Магнолии')
      .find('button')
      .contains('Добавить')
      .click();
    // Оформляем заказ
    cy.get('button').contains('Оформить заказ').click();
    cy.wait('@makeOrder');
    // Проверяем, что модалка открылась
    cy.get('#modals').find('h2').should('contain', '83755');
  });

  it('закрывает модалку по крестику', () => {
    // Кликаем по кнопке закрытия (крестику)
    cy.get('#modals button').first().click();
    cy.get('#modals').should('be.empty');
    // Проверяем, что конструктор очищен
    cy.contains('button', 'Оформить заказ')
      .closest('section')
      .should('contain', 'Выберите булки')
      .and('contain', 'Выберите начинку');
  });

  it('закрывает модалку по клику на оверлей', () => {
    cy.get('#modals').children().eq(1).click({ force: true }); // Кликаем по оверлею (он второй div в #modals)
    cy.get('#modals').should('be.empty');
    cy.contains('button', 'Оформить заказ') // Проверяем, что конструктор очищен
      .closest('section')
      .should('contain', 'Выберите булки')
      .and('contain', 'Выберите начинку');
  });

  afterEach(() => {
    window.localStorage.removeItem('accessToken');
    cy.clearCookie('refreshToken');
  });
});
