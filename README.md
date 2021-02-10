# weapon-shop

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Introduction
This is a basic example of an online store selling in game merchandise

## How to use
1. The login will display if no user is stored in the local storage
2. Enter a username and choose the preferred currency, click Login
3. The front page displays listing the current available packages for sale
4. Click on details to view the details of the package or Add to cart
5. Click on cart to view the items in the cart
6. To manage the packages click on admin
7. The search packages will be listed
8. To edit click the ID column of the package.
9. To create a new package click on the Create New Package 


## To meet time restriction
To meet the time restriction I avoided the following features
1. Discounts
2. Sorting of search results
3. Deletion of packages
4. Appealing user interface

## What I used to save time
1. Nuxtjs framework and tool
2. Minimal object orientated design
3. Minimal Unit testing and TTD
4. Non-caching of data from external API
5. Minimal error handling
6. Turned of linting. Can be turned on in file nuxt.config.js line 36

## What I would like to add or improve
1. Add a proper object orientated business layer instead of using tools
2. User Interface
3. Unit testing
4. Caching of the products and exchange rates
5. Use the vuex store to better store session data
6. Improve the user management, example user name display and log out 
7. Authentication for the user
8. Better error handling
9. Clean code
10. Hide the credentials for external product API

## Other Technologies
I could also used C# and MVC Razor or NodeJs and React