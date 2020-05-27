### React App

#### Build
```
$ cd client && npm run build
```

#### Run
```
$ node client/dist/server.js
```

### Docker

#### Requirements
1. Docker
2. Docker Compose

```
$ docker-compose -f docker/docker-compose.yml up --build -d
```

### VS Code Settings

#### workspace.json
```
{
  "eslint.alwaysShowStatus": true,
  "eslint.format.enable": true,
  "eslint.nodePath": "app/node_modules/eslint/bin/eslint.js",
  "eslint.probe": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact",
    "html"
  ],
  "eslint.run": "onSave",
  "eslint.workingDirectories": [
    "client",
    "server"
  ]
}
```