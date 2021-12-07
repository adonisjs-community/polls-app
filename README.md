# Adonis Poll
> A [majestic monolith](https://m.signalvnoise.com/the-majestic-monolith/) application built using AdonisJS

The repo contains the source code for a demo application built using AdonisJS. Since, AdonisJS is a fully featured framework it contains everything you need to develop and deploy this application.

The application is architectured as a [majestic monolith](https://m.signalvnoise.com/the-majestic-monolith-can-become-the-citadel/) and contains all the source code from **database to design**. 

- It uses [AdonisJS](http://adonisjs.com/) as a backend framework to manage the routing, database and the templates layer.
- It uses [TailwindCSS](https://tailwindcss.com/) for design.
- [Alpine.js](https://alpinejs.dev/) for small interactive frontend widgets.
- And [unpoly](https://unpoly.com/navigation) for sleek page navigation.

The codebase serves two main purposes.

- One is to showcase the functionality and elegance of AdonisJS as a backend framework.
- Other is the simplicity of monolith architecture.

## What will I learn from this app?

- You will learn about the basic CRUD operations and how to use the AdonisJS ORM to interact with the database.
- Paginate database records.
- Learn how to validate the user input using [Request validators](./app/Validators).
- Work with [file uploads](./app/Controllers/Http/ProfileController.ts#55-60) (including validations) and AdonisJS drive.
- Using the Edge template engine and its [components layer](./resources/views/components).
- Using Lucid [schema migrations](./database/migrations) for creating/alterting database tables. 
- Using Unpoly for faster page navigation.
- Using Alpine.js for dialog modals, toggling notifications and interactive dropdowns.

## FAQs

#### When to use edge components?
I create edge components when I want to abstract some functionality or logic. 

For example: I have created a component for showing toast notifications. This allows we keep the markup (including icons) and its auto hide logic in one place.

Whereas, I do not created components for stuff like buttons. Instead, I just create CSS classes like `button-primary`, `button-secondary` and so on.

I know these are subjective topics. But I do not create components for something that CSS can achieve easily.
 
#### Why not create an SPA using Vue or React?
Since, this is a public app creating a pure SPA will suffer from SEO. Instead, I will have to create a server rendered Vue or React app.

It means, I will be creating two servers. One for the API and other one for the Vue or React app. All this adds unncessary complexity and slows me down as an solo developer.

Also, I think most of the apps I work on are not highly reactive like Notion or Google docs and hence opting for a simpler development workflow pays off really well.

#### How to modify database tables after the app is running in production?
You just create a new migration to alter the table and add a new column. Think of schema migrations as individual actions. Each action describes the new state of the database.

Never roll back your migrations in production. Otherwise it will lead to data loss.

#### Where is this app deployed?
This app is deployed on Digital ocean using [Cleavr](http://cleavr.io/).

- The app and the database runs on the same machine. It is a $5 droplet from Digital ocean.
- The database backup is done by Cleavr itself. The backup is saved inside Digital ocean spaces as well.
- The user uploaded files are stored inside Digital ocean spaces.

## Demo
You can view the application demo at https://polls.adonisjs.dev.

## Share and love
If you like this application, then please share it with your co-workers and friends or maybe tweet it to the universe :)
