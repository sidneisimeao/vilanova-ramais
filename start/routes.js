'use strict'
const Route = use('Route')

Route.get('/', 'FrontController.index').as('index.front')

Route.group(() => {
  Route.get('/', 'AuthController.loginView').as('index')
  Route.post('/', 'AuthController.postLogin').as('login.store')
}).prefix('admin')

Route.group(() => {
  Route.get('/schedule/:search?', 'ScheduleController.index').as(
    'index.schedule'
  )

  Route.get('/edit-schedule/:id', 'ScheduleController.edit').as('edit.schedule')

  Route.post('/update-schedule/:id', 'ScheduleController.update').as(
    'update.schedule'
  )
  Route.get('/delete-schedule/:id', 'ScheduleController.destroy').as(
    'destroy.schedule'
  )
  Route.get('/create-schedule', 'ScheduleController.create').as(
    'create.schedule'
  )
  Route.post('/store-schedule', 'ScheduleController.store').as('store.schedule')

  Route.get('/department', 'DepartmentController.index').as('index.department')

  Route.get('/edit-department/:id', 'DepartmentController.edit').as(
    'edit.department'
  )

  Route.post('/update-department/:id', 'DepartmentController.update').as(
    'update.department'
  )
  Route.get('/delete-department/:id', 'DepartmentController.destroy').as(
    'destroy.department'
  )
  Route.get('/create-department', 'DepartmentController.create').as(
    'create.department'
  )
  Route.post('/store-department', 'DepartmentController.store').as(
    'store.department'
  )
  Route.get('/logout', 'AuthController.logout').as('logout')
})
  .prefix('admin')
  .middleware(['auth'])

Route.group(() => {
  Route.get('/schedule', 'ApiController.index')
}).prefix('api')
