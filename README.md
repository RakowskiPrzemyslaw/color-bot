okay so to run this you have to run

`npm run dev` which will start dev server

and 

`npm run dev:https` which will proxy localhost:3000 to https on localhost:3001

Im aware that this has some bugs, eg. timeouts happening, and coule be improved in some cases eg. auth state could be persisted better but to make it on time I decided to store auth details in memory (So each time you have to login)

