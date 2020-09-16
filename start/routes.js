'use strict'
const Route = use('Route')

Route.group(() => {
  Route.get('/', 'AuthController.loginView').as('index')

  Route.post('/', 'AuthController.postLogin').as('login.store')

  /*
  Route.get('/', 'QuoteController.index').as('index')
  Route.get('/register', 'AuthController.registrationView').as(
    'register.create'
  )
  Route.post('/register-store', 'AuthController.postRegister')
    .as('register.store')
    .validator('Register')
  Route.get('/login', 'AuthController.loginView').as('login.create')

  Route.post('/login-store', 'AuthController.postLogin').as('login.store')
  Route.get('/view-quote/:id', 'QuoteController.show').as('view.quote')
  */
}).prefix('admin')

Route.group(() => {
  Route.get('/schedule', 'ScheduleController.index').as('schedule.index')

  Route.get('/edit-schedule/:id', 'ScheduleController.edit').as('edit.quote')

  Route.post('/update-schedule/:id', 'ScheduleController.update').as(
    'update.quote'
  )
  Route.get('/delete-schedule/:id', 'ScheduleController.destroy').as(
    'delete.quote'
  )

  Route.get('/logout', 'AuthController.logout').as('logout')
  /*
  Route.get('/create-quote', 'QuoteController.create').as('create.quote')
  Route.post('/store-quote', 'QuoteController.store').as('store.quote')
  Route.get('/edit-quote/:id', 'QuoteController.edit').as('edit.quote')
  Route.post('/update-quote/:id', 'QuoteController.update').as('update.quote')
  Route.get('/delete-quote/:id', 'QuoteController.destroy').as('delete.quote')
  Route.post('/logout', 'AuthController.logout').as('logout')
  */
})
  .prefix('admin')
  .middleware(['auth'])
