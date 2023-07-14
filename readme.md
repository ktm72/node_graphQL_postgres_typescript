## How to create starter setup

> Follow instructions
> `npm init -y` for package.json

> `npx tsconfig.json` for tsconfig. select node(default)

> Add typescript and nodemon dev dependecies. `yarn add -D typescript nodemone`

> Add `yarn add nexus graphql @apollo/server` packages

> Change scripts in packages.json

1. "watch": "tsc -w" for realtime typescript changes
2. "dev": "nodemon dist/index.js" for realtime node js file update

"""
Note: dist is the output folder at tsconfig.json
"""

> Create "src" folder and index.ts, schema.ts inside it. Write code.

## Run Dev mode

`yarn watch`
Then
`yarn dev`
At the same time.

You will see -> 🚀 Server ready at http://localhost:5000/

Thanks. You have successfully created the starter setup.
