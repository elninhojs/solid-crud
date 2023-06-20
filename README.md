## solid crud

This is a crud written using solid js for demonstration proposes

It uses also Playwright to run e2e tests and json-server to up a restful api (GET, POST, PUT, DELETE)

You should be able to run it with zero config.

### Pre defined commands

Before start
```bash
$ npm i
```

Starting a dev server. It will be using a file dev-db.json as database
```bash
$ npm run dev
```

Running e2e tests. It will be running e2e tests agains a test-db.json (autocreated) using chromium and firefox headless browsers.
```bash
$ npx playwright test
```

To show test reports:
```bash
$ npx playwright show-report
```
If you wish to see the tests running
```bash
$ npx playwright test --ui
```
