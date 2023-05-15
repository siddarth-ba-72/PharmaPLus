# PHARMA PLUS

We have created this website to help the medical shop retailers where they can have a look at all the remaining stocks and sales at one place.

## Tools used

- Frontend
  - Reactjs
  - Redux
  - Material u icons
- Backend
  - Nodejs
  - Expressjs
- Database
  - MongoDB

## To run this Project:-
```bash

# Install Node modules for frontend
cd frontend
npm i
cd ..

# Install Node modules for frontend
cd backend
npm i
cd ..

# To run server
node backend/server.js

# To run frontend
cd frontend
npm start
```

## Layout

### Login Page:

User(manager) can only access the further pages only once he is properly authenticated

### Register Page:

If the user is new then he has to newly register himself to the protal.

### Home Page:

The main landing page after legal authentication. Contains many fields such as:

- Adding top medicines to the cart directly
- Filter the medicines by their brands
- Filtering the medicines by their health issue used for
- Filtering the medicines by their name using the search box present in the navigation bar

### Medicines Page:

Contains the list of all the medicines with thrie present stock number on the Left hand side.
Per page display of medicines is 8. Pagination is enabled to search or access all the medicines

### Dashboard:

This page is only accessed by admins of the shop.
Contains the list of all medicines with additional functionalities.

- Adding the medicines through the medicines page
- Update the medicine
- Add/Update the stock of the medicine
- Delete the medicine
- Can view all the invoices made in past(exclusively)

### Cart:

- While the customer is buying the medicines the manager goes to the cart page to add those medicnes.
- Further after adding the medicines manager can proceed to seek the customer's information like name and mobile number.
- After this the customer can preview his/her order before the payment(made in cash).
- By these steps the invoice is created.

## Reference

- [Youtube](https://www.youtube.com)
- [Github](https://github.com)
- [Udemy](https://www.udemy.com)
- [Traversy Media](https://www.traversymedia.com)
