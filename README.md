### Initial setup

After cloning, just run `npm install`

### Development

Run `npm run start-dev` and navigate to http://localhost:3000/

### CI / Deployment

Travis is set up to build all feature branches on push as well as master on merge/push. Only the master branch is deployed.
URL: https://pixalive.herokuapp.com/

To view the server log, do `heroku logs --tail -a pixalive`
