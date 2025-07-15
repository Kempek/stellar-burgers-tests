/// <reference types="cypress" />

const MODAL_SELECTOR = '#modals';
const ORDER_BUTTON_TEXT = 'Оформить заказ';
const BUN_NAME = 'Краторная булка N-200i';
const FILLING_NAME = 'Биокотлета из марсианской Магнолии';

describe('Проверка модалки ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открывает модалку с описанием ингредиента', () => {
    cy.get('li').contains(BUN_NAME).click();
    cy.get(MODAL_SELECTOR).should('exist');
    cy.get(`${MODAL_SELECTOR} h3`, { timeout: 5000 }).should(
      'contain',
      BUN_NAME
    );

    cy.get(MODAL_SELECTOR).within(() => {
      cy.contains('Калории');
      cy.contains('Белки');
      cy.contains('Жиры');
      cy.contains('Углеводы');
    });
  });
});

describe('Конструктор бургера — заказ и закрытие модалки', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as(
      'makeOrder'
    );

    cy.visit('/');
    cy.wait('@getIngredients');

    // Фейковая авторизация
    window.localStorage.setItem('accessToken', 'fake-access-token');
    cy.setCookie('refreshToken', 'fake-refresh-token');

    // Добавляем ингредиенты и оформляем заказ
    cy.contains('li', BUN_NAME).find('button').contains('Добавить').click();
    cy.contains('li', FILLING_NAME).find('button').contains('Добавить').click();
    cy.get('button').contains(ORDER_BUTTON_TEXT).click();
    cy.wait('@makeOrder');
    cy.get(MODAL_SELECTOR).find('h2').should('contain', '83755');
  });

  it('закрывает модалку по крестику', () => {
    cy.get(MODAL_SELECTOR).find('button').first().click();
    cy.get(MODAL_SELECTOR).should('be.empty');
    cy.contains('button', ORDER_BUTTON_TEXT)
      .closest('section')
      .should('contain', 'Выберите булки')
      .and('contain', 'Выберите начинку');
  });

  it('закрывает модалку по клику на оверлей', () => {
    cy.get(MODAL_SELECTOR).children().eq(1).click({ force: true });
    cy.get(MODAL_SELECTOR).should('be.empty');
    cy.contains('button', ORDER_BUTTON_TEXT)
      .closest('section')
      .should('contain', 'Выберите булки')
      .and('contain', 'Выберите начинку');
  });

  afterEach(() => {
    window.localStorage.removeItem('accessToken');
    cy.clearCookie('refreshToken');
  });
});
