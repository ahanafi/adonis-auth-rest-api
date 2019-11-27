'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
  //Aspek Penilaian
  Route.get('/aspek-penilaian', 'AspekPenilaianController.index').as('aspek-penilaian.index')
  Route.post('/aspek-penilaian', 'AspekPenilaianController.store').as('aspek-penilaian.store')
  Route.get('/aspek-penilaian/:kode', 'AspekPenilaianController.show').as('aspek-penilaian.show')
  Route.put('/aspek-penilaian/:kode', 'AspekPenilaianController.update').as('aspek-penilaian.update')
  Route.delete('/aspek-penilaian/:kode', 'AspekPenilaianController.destroy').as('aspek-penilaian.destroy')

  //Kelas
  Route.get('/kelas', 'KelasController.index').as('kelas.index')
  Route.post('/kelas', 'KelasController.store').as('kelas.store')
  Route.get('/kelas/:kode', 'KelasController.show').as('kelas.show')
  Route.put('/kelas/:kode', 'KelasController.update').as('kelas.update')
  Route.delete('/kelas/:kode', 'KelasController.destroy').as('kelas.destroy')
  Route.post('/kelas/:kode/set-mapel', 'KelasController.setMataPelajaran').as('kelas.set-mapel')

  //Mata Pelajaran
  Route.get('/mata-pelajaran', 'MataPelajaranController.index').as('mapel.index')
  Route.post('/mata-pelajaran', 'MataPelajaranController.store').as('mapel.store')
  Route.get('/mata-pelajaran/:kode', 'MataPelajaranController.show').as('mapel.show')
  Route.put('/mata-pelajaran/:kode', 'MataPelajaranController.update').as('mapel.update')
  Route.delete('/mata-pelajaran/:kode', 'MataPelajaranController.destroy').as('mapel.destroy')

  //Guru
  Route.get('/guru', 'GuruController.index').as('guru.index')
  Route.post('/guru', 'GuruController.store').as('guru.store')
  Route.get('/guru/with-mapel/:kode?', 'GuruController.getWithMataPelajaran').as('guru.with-mapel')
  Route.get('/guru/:kode', 'GuruController.show').as('guru.show')
  Route.put('/guru/:kode', 'GuruController.update').as('guru.update')
  Route.delete('/guru/:kode', 'GuruController.destroy').as('guru.destroy')
}).prefix('api/v1') //.middleware('auth')

Route.group(() => {
  Route.post('/register', 'AuthController.register').as('auth.register')
}).prefix('auth')
