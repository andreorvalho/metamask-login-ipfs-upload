# SETUP

1. install and update brew: ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" && brew update
2. install nvm: brew install nvm
3. install node: nvm install 16.10.0
4. use nvm
5. install yarn: npm install --global yarn
6. run yarn to install modules: yarn install
7. setup an infura account: https://app.infura.io/ and create a project
8. setup a .env file with 3 variables with the values from infura:

REACT_APP_PROJECT_ID="<project_id>"
REACT_APP_PROJECT_SECRET="<project_secret>"
REACT_APP_PROJECT_DEDICATED_URL="<project_url>"

9. run application: yarn start

### notes

when seeing a node error:
export NODE_OPTIONS=--openssl-legacy-provider

to remove when node options not allowed
unset NODE_OPTIONS
