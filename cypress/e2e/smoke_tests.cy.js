const { login } = require("../fixtures/login.js");


// Contexte pour vérifier les champs de connexion et le bouton
context("Vérification des champs de connexion et du bouton", () => {

    // Avant chaque test de ce contexte, on visite la page de connexion
    beforeEach(() => {
        cy.visit('http://localhost:8080/#/login'); // Changez l'URL si nécessaire
    });

    describe("Vérification des champs de connexion", () => {

        // Test pour vérifier que les champs de connexion existent
        it("Les champs de connexion sont présents", () => {
            // Vérification de la présence du champ utilisateur
            cy.get('[data-cy="login-input-username"]').should('exist').and('be.visible');
            
            // Vérification de la présence du champ mot de passe
            cy.get('[data-cy="login-input-password"]').should('exist').and('be.visible');

            // Vérification de la présence du bouton de connexion
            cy.get('[data-cy="login-submit"]').should('exist').and('be.visible');
        });
    });
});

// Contexte pour la vérification des boutons ajout au panier après la connexion
context("Vérification des boutons d'ajout au panier", () => {

    // Avant chaque test, on effectue la connexion
    beforeEach(() => {
        login(); 
    });

    describe("Ajout au panier après connexion", () => {

        // Test pour s'assurer que le client est connecté et que l'ajout au panier est disponible
        it("Le bouton d'ajout au panier est disponible après connexion", () => {

            // Vérifie que l'utilisateur est bien connecté en vérifiant la présence du bouton de déconnexion
            cy.get('[data-cy=nav-link-logout]').should('exist').and('be.visible');

            // Navigue vers la page des produits
            cy.visit('http://localhost:8080/#/products');

            // Sélectionne et clique sur le premier produit de la liste
            cy.get('[data-cy=product-link]').first().click();

            // Vérifie la présence du bouton d'ajout au panier
            cy.get('[data-cy=detail-product-add]').should('exist').and('be.visible');
        });
    });
});

// Contexte pour la vérification de la disponibilité des produits
context("Vérification de la présence du champ de disponibilité du produit", () => {

    describe("Vérification du champ de disponibilité du produit", () => {

        // Test pour s'assurer que le champ de disponibilité du produit est visible
        it("Le champ de disponibilité du produit est présent", () => {

            // Navigue vers la page des produits
            cy.visit('http://localhost:8080/#/products');

            // Sélectionne et clique sur le premier produit de la liste
            cy.get('[data-cy="product-link"]').first().click();

            // Vérifie la présence du champ de stock ou disponibilité du produit
            cy.get('[data-cy="detail-product-stock"]').should('exist').and('be.visible');
        });
    });
});
