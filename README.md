# Automatisez des tests pour une boutique en ligne

La boutique Eco Bliss Bath une start-up spécialisée dans la vente de produits de beauté écoresponsables prépare un site de vente en ligne, dont la première version vient d’être testée manuellement ;
L’objectif de ce projet est l’automatisation des tests pour la nouvelle appli de vente.

## Objectifs pédagogiques

* Analyser les besoins en automatisation de tests
* Automatiser des tests via des scripts
* Rédiger un bilan de campagne de tests automatisés

## Prérequis:

Pour mener à bien ce projet, vous avez besoin des outils suivants :
* Docker
* Node.js
* NPM
* Cypress
* Plugin Mochawesome (pour les rapports de tests)hawesome.

## Installation 
Étape 1 : Installer Docker
* Assurez-vous que Docker est installé sur votre machine. Si ce n'est pas le cas, téléchargez-le et installez-le depuis le site officiel de Docker.
* Étape 2 : Télécharger le projet
* Clonez le projet à partir du dépôt GitHub suivant :

* [Téléchargé le projet](https://github.com/OpenClassrooms-Student-Center/TesteurLogiciel_Automatisez_des_tests_pour_une_boutique_en_ligne)
* Étape 3 : Lancer le projet
* Ouvrez un terminal dans le dossier du projet et exécutez la commande suivante pour démarrer le projet avec Docker :
```bash
  	sudo docker-compose up
```
* Une fois le projet lancé, vous pouvez accéder à l'application à l'adresse suivante : 
* [http://localhost:8080](http://localhost:8080).
* Étape 4 : Installer Cypress
* Installez Cypress dans le projet en exécutant la commande suivante dans le terminal :
```bash
  	npm install cypress --save-dev
```
## Utilisation 

1.  Lancer le projet

 ```bash
   npm run serve
```

2.Exécution des tests avec Cypress
* Pour exécuter tous les tests via la ligne de commande, utilisez la commande suivante :

```bash
        npx cypress run
```
* Pour ouvrir l'interface utilisateur de Cypress, exécutez la commande suivante :

```bash
        npx cypress open
  ```

 
* Puis cliquer sur e2e testing et enfin choisir le navigateur désiré. Une page va s'ouvrir avec différents fichiers de tests. Cliquer sur le fichier souhaité pour voir le test se dérouler.