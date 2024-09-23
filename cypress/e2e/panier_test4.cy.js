const { clearCart } = require("../fixtures/clearCart.js");
const { login } = require("../fixtures/login.js");
const variabl = require("../fixtures/variables.json");

describe('Vérification du nombre dans le panier avec l\'API', () => {

  it("Ajout d'un produit dans le panier et vérification via l'API", () => {
    let loginToken;
    clearCart();
    login();
    cy.wait(2000);

    // Navigation vers la page du produit
    cy.get('[data-cy="nav-link-products"]').click();

    // On clique sur le bouton d'index= 2 qui contient le produit "Poussière de lune" Qtite=23
    cy.get('button').eq(2).should('contain', 'Consulter').click();
    cy.wait(2000);

    // Récupération du nom du produit sélectionné
    cy.get('[data-cy="detail-product-name"]').invoke('text').then((productName) => {
      cy.log(`Produit sélectionné : ${productName}`);

      // Vérification que le stock est supérieur à 1
      cy.get('[data-cy="detail-product-stock"]').invoke('text').then((text) => {
        const firstWord = text.split(' ')[0]; // Sépare le texte et prend le premier mot
        const number = parseInt(firstWord, 10); // Convertit le premier mot en un nombre
        expect(number).to.be.greaterThan(1); // Vérifie que le stock est > 1
      });

      // Ajout du produit au panier
      cy.get('[data-cy="detail-product-add"]').click();

      // Connexion via l'API pour obtenir le token
      cy.request({
        method: 'POST',
        url: 'http://localhost:8081/login',
        body: {
          username: variabl.email,
          password: variabl.password,
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('token');
        loginToken = response.body.token;

        // Vérification du contenu du panier via l'API
        cy.request({
          method: 'GET',
          url: 'http://localhost:8081/orders',
          headers: {
            Authorization: `Bearer ${loginToken}`
          }
        }).then((response) => {
          expect(response.status).to.eq(200);

          // Vérification de la quantité du produit spécifique
          const productId = 5; // ID du produit "Poussière de lune"
          const expectedQuantity = 1;
          const orderLine = response.body.orderLines.find(line => line.product.id === productId);

          if (orderLine) {
            expect(orderLine.quantity).to.be.equal(expectedQuantity);
            cy.log(`Produit avec l'ID ${productId} "Poussière de lune" est trouvé dans le panier`);
          } else {
            cy.log(`Produit avec l'ID ${productId} "Poussière de lune" non trouvé dans le panier`);
          }
        });
      });
    });
  });
});
