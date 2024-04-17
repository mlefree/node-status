# Node status

> simple server to send OS metrics

## Running && Testing

After install of the app ``npm i``, from the Terminal:

1. edit your `.env` file (ex: NODE_ENV)
2. launch your app `node app.js` or `npm start`
3. => Visit node app http://localhost:3210/v1/status

### Advanced testing

```bash
# easy :
npm run test-mocha-unit 

# needs a running DB :
npm run test-mocha-integration
```



