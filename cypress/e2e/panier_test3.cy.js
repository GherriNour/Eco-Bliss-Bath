const { clearCart } = require("../fixtures/clearCart.js");
const { login } = require("../fixtures/login.js");
const variabl = require("../fixtures/variables.json");

// Déclaration du contexte de Verification des limites
describe('Verification des limites', () => {
    // Entrer un entrez un chiffre supérieur à 20
    it('Entrer entrez un chiffre supérieur à 20', () => {
        // Avant chaque test, connexion avec les infos données
        clearCart();
        login();
        cy.wait(2000);

        // On navigue vers le produit
        cy.get('[data-cy="nav-link-products"]').click();
        // On clique sur le bouton d'index= 2  qui contient le produit "Poussière de lune" Qtite=23
        cy.get('button').eq(2).should('contain', 'Consulter').click();
        cy.wait(2000);
        // Récupération du nom du produit sélectionné
        cy.get('[data-cy="detail-product-name"]').invoke('text').then((productName) => {
            cy.log(`Produit sélectionné : ${productName}`);
            //Cliquer dans le champ quantite et ajouter la quantite
            cy.get('[data-cy="detail-product-quantity"]').click().clear().type('25');
            // Ajouter le produit 
            cy.get('[data-cy="detail-product-add"]').click();
            cy.wait(2000);

            //Vérifié que le produit est dans le panier
            cy.get('[data-cy="nav-link-cart"]').click();
            cy.wait(2000); // Attendre que le panier se charge
            // Vérification que le produit n'est pas ajouté dans le panier
            cy.contains(productName).should('exist');
            cy.log('Le produit a été ajouté au panier');
        });
    });
});
