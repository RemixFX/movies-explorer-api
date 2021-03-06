 # Проект: Myfilm

 Репозиторий для серверной части дипломного проекта `Myfilm`.   
  ### Имеет следующие возможности API:
* регистрация нового пользователя - эндпоинт: /signup, метод: POST
* авторизация пользователя - эндпоинт: /signin, метод: POST
* выход из профиля - эндпоинт: /signout, метод: POST
* получение данных профиля (name, email) - эндпоинт: /users/me, метод: GET
* обновление данных текущего профиля (name, email) - эндпоинт: /users/me, метод: PATCH
* получение коллекции фильмов - эндпоинт: /movies, метод: GET
* Добавление нового фильма в коллекцию - эндпоинт: /movies, метод: POST
* Удаление фильма из коллекции текущего пользователя - эндпоинт: /movies/id-фильма, метод: DELETE
***
### Технологии:
* Проект написан на `Express.js`   
* Реализована валидация входящих данных, которые проводятся на уровне схемы (не заходя в контроллеры). `celebrate Joi, validator`   
* Установлен ratelimiter - не более 100 запросов в 5 минут с одного IP. `"express-rate-limit`  
* Использование cookie для авторизации `cookie-parser`
* Использование данных из переменной окружения `dotenv`
* Ведение логов `winston`

### Сервер расположен на IP-адресе: 84.252.131.20
### Домен: https://api.myfilm.nomoredomains.work
***
Для запуска проекта необходимо:

>установить зависимости `npm install`   
>запустить проект `npm run start`   
>или запуск в режиме отладки `npm run dev`

![express js-4](https://user-images.githubusercontent.com/86429443/168585910-61c08493-5236-463e-897e-bf8ba9aa768c.svg)
