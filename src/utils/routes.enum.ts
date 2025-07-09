export enum ROUTES {
  HOME = '/',
  FEED = '/feed',
  INGREDIENTS = '/ingredients/:id',
  PROFILE = '/profile',
  PROFILE_ORDERS = '/profile/orders',
  PROFILE_ORDERS_NUMBER = '/profile/orders/:number',
  LOGIN = '/login',
  REGISTER = '/register',
  FORGOT_PASSWORD = '/forgot-password',
  RESET_PASSWORD = '/reset-password/:token',
  NOT_FOUND = '*'
}
