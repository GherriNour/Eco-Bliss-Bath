export  function  login () {
    cy.visit('http://localhost:8080/#/login'); 
      // Attendre que le formulaire de connexion soit visible
    cy.get('[data-cy="login-form"]').should('be.visible');
    // Saisir l'email valide
    cy.get('input[data-cy="login-input-username"]').type('test2@test.fr'); 
    // Saisir le mot de passe valide
    cy.get('input[data-cy="login-input-password"]').type('testtest'); 
    // Cliquer sur le bouton de connexion
    cy.get('[data-cy="login-submit"]').click();
    // Vérifier que la connexion a réussi en vérifiant la présence du lien de déconnexion
    cy.get('[data-cy="nav-link-logout"]').should('be.visible');
   
}