## Connenction branch setup

> Install `yarn add typeorm pg dotenv`

> Add "rootDir": "./src", above "outDir": "./dist" in tsconfig.json. Unless sometimes ts compiler causes disturbance.

> Change package.json -> scripts -> "dev": "nodemon dist/index.js"

> Create typeorm.config.ts in "src" folder and configure it.

""""
Note: synchronise: true directly affect database. Not good for production.
""""

> Create "entities" folder where we put our db schema

> Product depend on User. Many product belongs to one User. So, Product has ManyToOne relationship with User

""""
Note: Before User, Product couldn't be created that's why creatorId is not null.
""""

> User could have many product. So, User has OneToMany relationship with Product.

> Some changes happen across the src, graphql folder also. Try to follow.
