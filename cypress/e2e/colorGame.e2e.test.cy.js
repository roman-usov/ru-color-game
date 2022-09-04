/// <reference types="cypress" />

import '../support/commands';
import {
  rgbColors,
  hexColors,
  hslColors,
  rgbColorsMedium,
} from './testHelpers';

import { colorFormat } from '../../src/utilities';

describe('Game start', () => {
  beforeEach(() => {
    cy.visitApp(rgbColors);
  });

  describe('Given the game page is open', () => {
    describe('When I look at the color to guess', () => {
      it('Then I see that the color is in the RGB format', () => {
        cy.get('.color-string').should(
          'have.text',
          `${rgbColors.colorToGuess}`
        );
      });

      it('Then I see that the color format by default in the format selector is RGB', () => {
        cy.get('#rgb').should('have.class', 'format-radio-btn checked');
      });

      it('Then I see that the color format for the color slates is set in RGB', () => {
        // cy.get(`[data-color="${rgbColors.colors[0]}"]`).should('exist');
        rgbColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('exist');
        });
        rgbColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('not.have.class', 'wrong');
        });
      });
    });
  });
});

describe('Playing a game round', () => {
  beforeEach(() => {
    cy.visitApp(rgbColors);
  });

  describe('Given I see the color to guess', () => {
    describe('When I click on the color slate matching the color to guess', () => {
      it('Then I see the message that my guess is correct', () => {
        cy.getColorSlate(rgbColors.colorToGuess).click();
        cy.get('.result').should('be.visible');
        cy.get('.result').should('have.text', 'Correct');
      });

      it('Then I see the button to proceed to the next round', () => {
        cy.getColorSlate(rgbColors.colorToGuess).click();
        cy.get('.next-game').should('be.visible');
      });

      it('Then I see that all the slates except the correct one are dimmed and the slates are disabled', () => {
        cy.getColorSlate(rgbColors.colorToGuess).click();
        rgbColors.colors.slice(1).forEach((color) => {
          cy.getColorSlate(color).should('have.class', 'wrong');
        });

        rgbColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('have.attr', 'disabled');
        });
      });

      it('Then I see that the Format radio buttons are disabled', () => {
        cy.getColorSlate(rgbColors.colorToGuess).click();

        cy.get('[data-color-format-set]').should('have.attr', 'disabled');
      });
    });

    describe('When I click on the color slate not matching the color to guess', () => {
      it('Then I see the message that my guess is wrong', () => {
        cy.getColorSlate(rgbColors.colors[1]).click();
        cy.get('.result').should('be.visible');
        cy.get('.result').should('have.text', 'Wrong');
      });

      it('Then I see the button to proceed to the next round', () => {
        cy.getColorSlate(rgbColors.colors[1]).click();
        cy.get('.next-game').should('be.visible');
      });

      it('Then I see that all the slates except the correct one are dimmed and the slates are disabled', () => {
        cy.getColorSlate(rgbColors.colors[1]).click();
        rgbColors.colors.slice(1).forEach((color) => {
          cy.getColorSlate(color).should('have.class', 'wrong');
        });

        rgbColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('have.attr', 'disabled');
        });
      });

      it('Then I see that the Format radio buttons are disabled', () => {
        cy.getColorSlate(rgbColors.colors[1]).click();

        cy.get('[data-color-format-set]').should('have.attr', 'disabled');
      });
    });

    describe('When I click on the selected color format', () => {
      it('Then I see that the colors for the game remained the same', () => {
        cy.get('#rgb').click();
        cy.get('.color-string').should(
          'have.text',
          `${rgbColors.colorToGuess}`
        );
        cy.get('#rgb').should('have.class', 'format-radio-btn checked');
        rgbColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('exist');
        });
        rgbColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('not.have.class', 'wrong');
        });
      });
    });
  });
});

describe('Proceeding to the next game round', () => {
  beforeEach(() => {
    cy.visitApp(rgbColors);
  });

  describe('Given that a round is completed', () => {
    describe('When I click on the Next round', () => {
      it('Then I see the colors of the next round', () => {
        cy.getColorSlate(rgbColors.colorToGuess).click();
        cy.get('.next-game').should('be.visible');
        cy.get('.next-game').click();
        cy.get('.color-string').should(
          'have.text',
          `${rgbColors.colorToGuess}`
        );
        cy.get('#rgb').should('have.class', 'format-radio-btn checked');
        rgbColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('exist');
        });
        rgbColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('not.have.class', 'wrong');
        });
      });
    });
  });
});

describe('Color format change', () => {
  describe('Given the game page is open for Hex format', () => {
    beforeEach(() => {
      cy.visitApp(hexColors);
    });
    describe('When the game is for the Hex Format', () => {
      it('Then I see that the color is in the Hex format', () => {
        cy.get('.color-string').should(
          'have.text',
          `${hexColors.colorToGuess}`
        );
      });

      it('Then I see that the color format by default in the format selector is Hex', () => {
        cy.get('#hex').should('have.class', 'format-radio-btn checked');
      });

      it('Then I see that the color format for the color slates is set in Hex', () => {
        hexColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('exist');
        });
        hexColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('not.have.class', 'wrong');
        });
      });
    });
  });

  describe('Given the game page is open for HSL format', () => {
    beforeEach(() => {
      cy.visitApp(hslColors);
    });

    describe('When the game is for the HSL Format', () => {
      it('Then I see that the color is in the HSL format', () => {
        cy.get('.color-string').should(
          'have.text',
          `${hslColors.colorToGuess}`
        );
      });

      it('Then I see that the color format by default in the format selector is HSL', () => {
        cy.get('#hsl').should('have.class', 'format-radio-btn checked');
      });

      it('Then I see that the color format for the color slates is set in HSL', () => {
        hslColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('exist');
        });
        hslColors.colors.forEach((color) => {
          cy.getColorSlate(color).should('not.have.class', 'wrong');
        });
      });
    });
  });
});
