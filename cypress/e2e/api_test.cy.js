// *********************Test 1 : Les Tests d’API ********************************
const variable = require("../fixtures/variables.json");

//Déclaration du contexte de tests pour regrouper les scénarios Test 1 : Les Tests d’API  POST

context("Panier d'un utilisateur avant connexion pour vérifier que je reçois une erreur", () => {

    it("Vérification du panier sans être connecté", () => {
        cy.request({
            method: "GET",
            url: variable.apiUrlOrders,
            failOnStatusCode: false,
        }).then((response) => {
            expect(response.status).to.eq(401)
            cy.log(`401 : Utilisateur pas authentifié`)
        })
    })
});
let loginToken;
context("Vérification du panier en étant connecté", () => {


    it('login test true', () => {
        cy.request({
            method: 'POST',
            url: variable.apiUrlLogin,
            body: {
                username: variable.email,
                password: variable.password,
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            loginToken = response.body.token;
        })
    });

    it('Vérification du panier en étant connecté', () => {
        cy.request({
            method: 'GET',
            url: variable.apiUrlOrders,
            headers: {
                Authorization: `Bearer ${loginToken}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        })
    })
});

context("Requête d'une fiche produit spécifique", () => {

    let productsId;

    it("Récupérer toutes les catégories et extraire un ID", () => {
        cy.request("Get", variable["apiProducts "]).then((response) => {
            productsId = response.body[Math.floor(Math.random() * response.body.length)].id;
        });
    });

    it("Récupérer les détails d'une catégorie par ID", () => {
        expect(productsId).to.be.a("number");

        cy.request(variable["apiProducts "] + `/${productsId}`)
            .then((response)=> { 
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property("id",productsId)
            })
    
    });
});

//Déclaration du contexte de tests pour regrouper les scénarios Test 1 : Les Tests d’API GET
context("Les Tests d’API,  GET", () => {

    let loginToken;

    it('Login, Connexion utilisateur inconnu', () => {

        cy.request({
            method: 'POST',
            url: variable.apiUrlLogin,
            body: {
                username: variable.emailFalse,
                password: variable.passwordFalse,
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(401);
            cy.log(`401 : Utilisateur pas authentifié`)
        });
    });
    it('Login, Connexion utilisateur connu', () => {
        cy.request({
            method: 'POST',
            url: variable.apiUrlLogin,
            body: {
                username: variable.email,
                password: variable.password
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');

            loginToken = response.body.token;
        });
    });



    it('Ajouter un produit disponible au panier', () => {
        cy.request({
            method: 'PUT',
            url: variable.apiUrlAddCart,
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            body: {
                product: '7',
                quantity: '1'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Ajouter un produit en rupture de stock', () => {
        cy.request({
            method: 'PUT',
            url: variable.apiUrlAddCart,
            headers: {
                Authorization: `Bearer ${loginToken}`
            },
            body: {
                product: '3',
                quantity: '1'
            }
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    // Ajouter un avis
    it('Ajouter un avis', () => {
        cy.request({
            method: 'POST',
            url: variable.apiUrlReviews,
            headers: {
                Authorization: `Bearer ${loginToken}`,
            },
            body: {
                title: "Test titre du commentaire",
                comment: "Test du commentaire",
                rating: "4",
            }
        }).then((response) => {
            expect(response.status).to.eq(200);

        });
    });

});