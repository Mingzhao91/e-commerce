<div id="top"></div>

# E-Commerce

This project follows the implemenation on an [online course](https://www.udemy.com/course/mean-stack-ecommerce-app-angular-nx-primeng/) to build an e-commerce shop, as well as an admin panel for content management.

Customers can go onto the ngshop application to browse products, add products to the basket and make an online payment throught Stripe. Adminstrators can manage products and users, look into user's orders, and keep track on sales in admin panel.

This project is purely for myself learning and getting better in developing web applications in MEAN stack. All credits go to the course instructor, [Fadi Nouh](https://www.udemy.com/user/fadi-nouh/).

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<br>

### Built With

**Frontend**

- [Angular](https://angular.io/)
- [NX Monorepo](https://nx.dev/)
- [PrimeNg Material Library](https://www.primefaces.org/primeng/#/)
- [PrimeFlex](https://www.primefaces.org/primeflex/)
- [RXJS](https://rxjs.dev/)
- [NGRX For User Session](https://ngrx.io/docs)
- [SCSS](https://sass-lang.com/)

**Backend**

- [NodeJs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)

<p align="right">(<a href="#top">back to top</a>)</p>

## Getting Started

This ngshop and admin applications are grouped by [Nx](https://nx.dev/) inside apps-workspace folder. The server-side code is inside backend folder.

### Prerequisites

- Database to store data
- [Stripe](https://stripe.com/gb) developer account for processing customer payment

### Installation

Clone the repository

```sh
git clone https://github.com/Mingzhao91/e-commerce.git
```

There are couple of configuration files you need to create in order to run the ngshop and admin applications in local machine.

1. create and environment folder that contains environment.prod.ts and environment.ts in apps-workspace folder.<br><br>
   **Folder Structure**

   - [apps-workspace](./apps-workspace)
     - [environments]()
       - [environment.prod.ts]()
       - [environment.ts]()

   <br><br>
   environment.prod.ts

   ```js
   export const environment = {
     production: true,
     apiURL: "database_url/api/v1/",
     stripePublicKey: "stripe_public_key"
   };
   ```

   <br><br>
   environment.ts

   ```js
   export const environment = {
     production: false,
     apiURL: "database_url/api/v1/",
     stripePublicKey: "stripe_public_key"
   };
   ```

2. Create .env file in backend folder.
   <br><br>
   **Folder Structure**

   - [backend](./backend)
     - [.env]()

   <br><br>
   .env file

   ```sh
    API_URL = /api/v1
    BCRYPT_SALT = bcrypt_salt_for_passowrd_hashing
    JWT_SECRET = JWT_secret_key
    STRIPE_SECRET_KEY = stripe_secret_key
    CONNECTION_STRING = database_url
    DB_NAME = database_name
    PORT = local_port
   ```

Navigate to the apps-workspace folder and install NPM packages.

```sh
npm install
```

Navigate to the backend folder and install NPM packages.

```sh
npm install
```

To run the local server, navigate to the backend folder and run

```sh
npm run start
```

To build and serve the admin panel application, navigate to the apps-workspace folder and run

```sh
nx serve admin
```

To build and serve the ngshop application, navigate to the apps-workspace folder and run

```sh
nx serve ngshop
```

<p align="right">(<a href="#top">back to top</a>)</p>

## Acknowledgments

- [MEAN Stack E-Commerce App: Angular 13,NX, PrimeNg [2022]](https://www.udemy.com/course/mean-stack-ecommerce-app-angular-nx-primeng/)

<p align="right">(<a href="#top">back to top</a>)</p>
