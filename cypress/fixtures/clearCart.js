const variabl = require("../fixtures/variables.json");

export function clearCart() {
    let loginToken;

    // Effectuer la connexion pour récupérer le token
    return cy.request({
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

        // Récupérer les lignes de commande du panier
        return cy.request({
            method: 'GET',
            url: 'http://localhost:8081/orders',
            headers: {
                Authorization: `Bearer ${loginToken}`
            }
        });
    }).then((response) => {
        expect(response.status).to.eq(200);
        const orderLines = response.body.orderLines;

        // Supprimer chaque ligne du panier
        orderLines.forEach((line) => {
            cy.request({
                method: 'DELETE',
                url: `http://localhost:8081/orders/${line.id}/delete`,
                headers: {
                    Authorization: `Bearer ${loginToken}`
                }
            }).then((deleteResponse) => {
                expect(deleteResponse.status).to.eq(200);
            });
        });
    });
}
