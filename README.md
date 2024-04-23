```
// it will help you omit the process you compile index.ts file but reduce the process.
npx ts-node src/index.ts
```

```

Taking an extra step for a more refined setup, you may consider a nodemon.json file in the project root, which serves as a configuration file for nodemon. This file lets you specify directories and extensions to watch and define commands to execute, while nodemon manages the reloading of the application upon changes:

/nodemon.json
{

  "watch": ["src"],
  "ext": "ts",
  "exec": "concurrently \"npx tsc --watch\" \"ts-node src/index.ts\""
}

```

to use top level await, have to set "target" property over 2018 and
in the package.json file, should set "type" property as "module"

```
? how can i take the schema file to the dist foler
```
