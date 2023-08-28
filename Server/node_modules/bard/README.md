# bard
League of Legends API interface

[![NPM](https://nodei.co/npm/bard.png)](https://nodei.co/npm/bard/)

## Usage
```javascript
const bard = require('bard')
let bardInstance = bard('YOUR-RIOT-API-KEY', 'API-KEY-REGION')
bardInstance.statusAll().then((resp) => console.log(resp)) // Each bard method is a promise!
```
