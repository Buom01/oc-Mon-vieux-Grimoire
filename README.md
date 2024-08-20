# Mon-vieux-Grimoire
## Installation
`npm i`
## Lancement
`npm run start`
## Usage
L'application ne nécéssite que la définition de la variable d'environnement `MONGO_URI` qui n'est pas préconfigurée pour des raisons de sécurité.
Son bon lancement est testable dans le navigateur : `http://localhost:4000/api/books`.
### Avec front-end
Le backend est préconfiguré pour être utilisé avec la configuration par défaut du front-end.
### Sans front-end
Le backend écoute par défaut sur le port `4000` et est donc accessible directement sur `http://localhost:4000/api/`.

## Configuration
L'application prend en compte les variables d'environnement suivantes :
- `MONGO_URI` (requis)
- `JWT_SECRET_KEY`
- `BACKEND_HOSTNAME` (à mettre à jour en coïncidence avec le port)
- `FRONTEND_HOSTNAME`
- `PORT`
