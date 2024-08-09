import router from '@adonisjs/core/services/router'

const PixController = () => import('#controllers/pix_controller')
const EfiPayController = () => import('#controllers/efipay_controller')
const AuthController = () => import('#controllers/efi_auth_controller')

router.post('/auth/efi/pix', [AuthController, 'getAuthTokenPix'])
router.post('/auth/efi', [AuthController, 'getAuthTokenEfi'])

router.post('/pix/loc', [PixController, 'createCob'])
router.get('/pix/qrcode/:id', [PixController, 'getQrCode'])
router.patch('/pix/imediate', [PixController, 'create'])

router.post('/efipay/charge', [EfiPayController, 'createCharge'])
router.post('/efipay/charge/:id/pay', [EfiPayController, 'processPayment'])
