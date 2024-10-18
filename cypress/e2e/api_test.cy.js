// *********************Test 1 : Les Tests d’API ********************************
const variable = require("../fixtures/variables.json");

context("Panier d'un utilisateur avant connexion pour vérifier que je reçois une erreur", () => {
    it("Vérification du panier sans être connecté", () => {
        cy.request({
            method: "GET",
            url: variable.apiUrlOrders,
            failOnStatusCode: false, // Eviter l'échec automatique sur erreur
        }).then((response) => {
            expect(response.status).to.eq(401); // Vérifier le statut d'erreur
            cy.log(`401 : Utilisateur pas authentifié`);
        });
    });
});

context("Vérification du panier en étant connecté", () => {
    let loginToken;

    it('Connexion avec succès', () => {
        cy.request({
            method: 'POST',
            url: variable.apiUrlLogin,
            body: {
                username: variable.email, // Email depuis les variables
                password: variable.password, // Mot de passe depuis les variables
            }
        }).then((response) => {
            expect(response.status).to.eq(200); // Vérifier la réussite de la connexion
            expect(response.body).to.have.property('token'); // Vérifier la présence du token
            loginToken = response.body.token; // Stocker le token pour les tests suivants
        });
    });

    it('Vérification du panier en étant connecté', () => {
        cy.request({
            method: 'GET',
            url: variable.apiUrlOrders,
            headers: {
                Authorization: `Bearer ${loginToken}`, // Utiliser le token pour l'accès
            }
        }).then((response) => {
            expect(response.status).to.eq(200); // Vérifier que l'accès est réussi
            cy.log(`Panier récupéré avec succès`);
        });
    });
});

context("Requête d'une fiche produit spécifique", () => {

    let productsId;

    it("Récupérer toutes les catégories et extraire un ID", () => {
        cy.request("Get", variable["apiProducts "]).then((response) => {
			// Extraction d'un produit aléatoire de la liste de produits
            productsId = response.body[Math.floor(Math.random() * response.body.length)].id;
        });
    });

    it("Récupérer les détails d'une catégorie par ID", () => {
        expect(productsId).to.be.a("number"); // Vérifie que l'ID récupéré est bien un nombre

        cy.request(variable["apiProducts "] + `/${productsId}`)
            .then((response)=> { 
                expect(response.status).to.eq(200) // Vérifie que la requête a réussi
                expect(response.body).to.have.property("id",productsId) // Vérifie que l'ID correspond à celui demandé
				cy.log(`Requête réussie`)
            })
    
    });
});

//Déclaration du contexte de tests pour regrouper les scénarios Test 1 : Les Tests d’API POST
context("Les Tests d’API,  POST", () => {

    let loginToken;

    it('Login, Connexion utilisateur inconnu', () => {
        cy.request({
            method: 'POST',
            url: variable.apiUrlLogin,
            body: {
                username: variable.emailFalse, // Email incorrect
                password: variable.passwordFalse, // Mot de passe incorrect
            },
            failOnStatusCode: false // Empêche l'échec automatique si un statut d'erreur est renvoyé
        }).then((response) => {
            expect(response.status).to.eq(401); // Vérification du statut 401
            cy.log(`401 : Utilisateur pas authentifié`);
        });
    });
    
    it('Login, Connexion utilisateur connu', () => {
        cy.request({
            method: 'POST',
            url: variable.apiUrlLogin,
            body: {
                username: variable.email, // Email correct
                password: variable.password // Mot de passe correct
            },
        }).then((response) => {
            expect(response.status).to.eq(200); // Vérification du statut 200
            expect(response.body).to.have.property('token'); // Vérification de la présence du token
            loginToken = response.body.token; // Stockage du token pour les futures requêtes
        });
    });


    it('Ajouter un avis avec tentative de faille XSS', () => {
        const xssPayload = "<script>alert('XSS')</script>"; // Payload XSS classique
        
        cy.request({
            method: 'POST',
            url: variable.apiUrlReviews,
            headers: {
                Authorization: `Bearer ${loginToken}`, // Utilisation du token pour l'authentification
            },
            body: {
                title: xssPayload, // Titre contenant le script malveillant
                comment: xssPayload, // Commentaire contenant le script malveillant
                rating: "4", // Note attribuée
            },
            failOnStatusCode: false // Ne pas échouer immédiatement si un code de statut d'erreur est renvoyé
        }).then((response) => {
            // Vérifier que la requête s'est bien exécutée
            expect(response.status).to.eq(200); 
            
            // Ajout d'un console.log pour voir le contenu de la réponse
            console.log(response.body);
    
            // Vérifier si le body est une chaîne de caractères ou si vous devez vérifier un champ spécifique
            if (typeof response.body === 'string') {
                expect(response.body).to.not.contain('<script>'); 
                expect(response.body).to.not.contain('alert');
            } else {
                // Si le body est un objet, accédez aux champs pertinents (par exemple, response.body.comment ou response.body.title)
                expect(response.body.comment).to.not.contain('<script>'); 
                expect(response.body.comment).to.not.contain('alert');
            }
        });
    });
    
    
    
});   