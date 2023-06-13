# Recipe Sharing

Recipe sharing app is a full stack application, where people can post their recipes, rate them, like them and comment to them.

## Why did i make this app?

The main reason why i decided to make Recipe sharing app is to practice my MERN stack and gain more experience through complicated projects

## Am i trying to build Recipe sharing app to become a successful app?

No. not at all, like i said before, my main plan is to learn and improve my full stack skills by implementing multiple features.

## Sharing app features

### Auth

 - Register
 - Login
 - Logout
 - Verify Email
 - Forget Password (send a reset password link to email)
 - Reset Password

### User

 - Current User Profile
 - Show Someone Else Profile
 - Update User Profile
 - Display All Favourite Recipes Related To This User

### Recipes

 - Display All Recipes
 - Display One Specific Recipe
 - Create A Recipe
 - Update Your Recipe
 - Delete Your Recipe
 - Rate A Recipe (cannot rate your own recipe)
 - Add A Recipe To Favourites

### Comments

 - Display All Comments Related To A Specific Recipe (sorted by most liked by default or recent ones)
 - Add a New Comment
 - Update Your Comment
 - Delete Your Comment
 - Like A Comment


## What went wrong?

1. The design: i didn't have a prepared design for this app, since im not a designer i tought i would find something online. Well did i? yes and no, i only found landing pages, or a home page with posts as i wanted but that's it, i couldn't find a complete design for all my pages obviously, then i learned how much time it can consume when you just design from your head while writing code.

2. Call requests using React-router-dom loaders/actions functions: I used to fetch data using loader provided by react router dom, and post requests using actions, it was fine at first as usual, but the moment http requests was sent from nested paths then something interesting shows up. For example you have `/profile` path that fetch profile data, and then you have another path that is `/profile/edit` where you make a patch request, when calling that patch request you gonna end up waiting for the profile data request first then patch request, even if you dont need that request anyways, this using the ID method (useRouteLoaderData(routeId)) is using this aproach to fetch/request data is bad idea? absolutely not, it works fine, and actually have some advantages, but from my experience it just didnt work well for me. Instead i used React Query, my first time using it, their documentation is amazing. I had no where to look up beside their docs.

3. Database: I found out that this type of projects is really not that good for non-relational database, there is just so much documents connected to each other in this project.

## Built with

### Client side

- [React](https://reactjs.org/) - JS library
- [TypeScript](https://www.typescriptlang.org/) -  Typed programming language that builds on JavaScript
- [React Router](https://reactrouter.com/en/main) - JavaScript framework that lets us handle client and server-side routing in React applications
- [React Query](https://tanstack.com/query/latest/docs/react/overview) - TanStack Query (FKA React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your web applications a breeze
- [TailwindCSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Tool to quickly start a project
- Mobile-first workflow


### Server side

- [NodeJS](https://nodejs.org/en) - Node.js is an open-source, cross-platform JavaScript runtime environment
- [TypeScript](https://www.typescriptlang.org/) -  Typed programming language that builds on JavaScript
- [ExpressJS](https://expressjs.com/) - Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications
- [MongoDB](https://www.mongodb.com/) - MongoDB is a document database used to build highly available and scalable internet applications
- [Mongoose](https://mongoosejs.com/) - Mongoose is an Object Data Modeling (ODM) library for MongoDB
- [Cloudinary](https://cloudinary.com/) - A complete media-management solution, Cloudinary can serve all file types as is, including images, videos, as well as audio, text and document files
- [Brevo](https://www.brevo.com/) - Brevo provides a marketing automation creator that lets you build workflows based on your contacts' website behavior, purchase/store behaviors, and email opens/clicks, (in this project used as SMTP)
 

## Author

- GitHub - [@RedouaneAjgagal](https://github.com/RedouaneAjgagal)