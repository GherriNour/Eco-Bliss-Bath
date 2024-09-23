
const { clearCart } = require("../fixtures/clearCart.js");
const { login } = require("../fixtures/login.js");
const variabl = require("../fixtures/variables.json");

// Déclaration du contexte de tests pour regrouper les scénarios
describe('Panier', () => {

  // Avant chaque test, connexion avec les infos données
  beforeEach(() => {
    clearCart();
    login();
  });

  // Vérification que le produit a été ajouté au panier et que le stock est mis à jour
  it("Ajout d'un produit dans le panier", () => {
    cy.wait(2000);

    // Navigation vers la page du produit
    cy.get('[data-cy="nav-link-products"]').click();

    // On clique sur le bouton d'index= 2  qui contient le produit "Poussière de lune" Qtite=23
    cy.get('button').eq(2).should('contain', 'Consulter').click();
    cy.wait(2000);
    // Récupération du nom du produit sélectionné
    cy.get('[data-cy="detail-product-name"]').invoke('text').then((productName) => {
      cy.log(`Produit sélectionné : ${productName}`);
      let iniStock;
      // Vérification que le stock est supérieur à 1
      cy.get('[data-cy="detail-product-stock"]')
        .invoke('text')
        .then((text) => {
         // const firstWord = text.split(' ')[0]; // Sépare le texte et prend le premier mot
         iniStock = parseInt(text, 10); // Convertit le premier mot en un nombre
          expect(iniStock).to.be.greaterThan(1); // Assertion pour vérifier que le nombre est supérieur à 1
        });

      // Ajout au panier du produit
      cy.get('[data-cy="detail-product-add"]').click();

      // Vérification que le produit est bien dans le panier
      cy.get('[data-cy="nav-link-cart"]').click();
      cy.wait(2000); // Attendre que le panier se charge
      cy.contains(productName).should('exist'); // Vérifie que le produit est bien dans le panier

      // Vérification de la quantité dans le panier (devrait être 1)
      cy.get('[data-cy="cart-line-quantity"]').should('have.value', '1');

      // Revenir aux produits pour vérifier que le stock a diminué
      cy.get('[data-cy="nav-link-products"]').click();
      cy.get('button').eq(2).should('contain', 'Consulter').click();
      cy.wait(2000);

      // Vérification que le stock a diminué (par exemple, 1 produit en moins)
      cy.get('[data-cy="detail-product-stock"]').invoke('text').then((text) => {
        const firstWord = text.split(' ')[0]; // Extraire le nombre
        const newStock = parseInt(firstWord, 10);
        expect(newStock).to.be.equal(iniStock-1); // Vérifie si le stock est maintenant à 22
        cy.log(`Le stock a bien diminué`);
      });
    });
  });
});