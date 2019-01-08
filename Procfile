web: cd frontend && yarn build && yarn start
api: backend/vendor/bin/heroku-php-apache2 public/
worker: cd backend && php artisan queue:work redis --sleep=3 --tries=3
release: cd backend && php artisan migrate --force
