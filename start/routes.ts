/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
|
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import router from '@adonisjs/core/services/router'

/**
 * All params named ":id" should be valid numbers.
 */
router.where('id', router.matchers.number())

/**
 * Signup, login and logout routes
 */
router.get('signup', 'SignupController.create').middleware('guest')
router.post('signup', 'SignupController.store').middleware('guest')
router.get('login', 'LoginController.create').middleware('guest')
router.post('login', 'LoginController.store').middleware('guest')

router.post('logout', 'LoginController.destroy').middleware('auth')

/**
 * Home page to list all polls
 */
router.get('/', 'PollsController.index')

/**
 * View self profile. "/me" is a convention to show details
 * for the currently logged-in user
 */
router.get('/me', 'ProfileController.index').middleware('auth')
router.post('/me/avatar', 'ProfileController.updateAvatar').middleware('auth')

/**
 * Polls resource management. One should be logged-in to interact
 * with polls, except viewing a poll.
 */
router.get('polls/create', 'PollsController.create').middleware('auth')
router.post('polls', 'PollsController.store').middleware('auth')
router.get('polls/:slug', 'PollsController.show')
router.post('polls/:id/vote', 'PollsController.submitVote').middleware('auth')
router.delete('polls/:id', 'PollsController.destroy').middleware('auth')
