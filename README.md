Inventory Tracker to keep track of various user's items

Installation Steps:
1. cd into the frontend folder and commandline: npm install
2. commandline: npm start
3. cd into the backend folder and commandline: npm install
4. create a postgres database names 'postgres'
5. commandline: npx knex migrate:latest
6. commandline: npx knex seed:run

How to Use:
- Upon entering the site, it will prompt the user to proceed as a visitor, create an account, or login
- a visitor can view all inventories, view the individual items, but can NOT edit or delete or add items
- to create an account, press the button and fill in the user's first, last, username, and password
- after logging in, the user will be brought to their personal inventory showing the items connected to their account. the logged in user can view all inventories, and the individual items for full details, with the ability to edit, delete, and add items