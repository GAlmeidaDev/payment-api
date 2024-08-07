/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const PaymentsController = () => import('#controllers/payments_controller')
import router from '@adonisjs/core/services/router'

router.get('/', [PaymentsController, 'method1'])
