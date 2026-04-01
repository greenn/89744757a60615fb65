# Portfolio Auth (Next.js + PostgreSQL + JWT)

Простая и масштабируемая реализация авторизации для портфолио продуктового дизайнера.

## Роли и доступ
- **Гость**: доступ к `/`, `/projects`, `/services`, `/process`, `/contacts`; в хедере кнопки Войти/Регистрация.
- **Авторизованный**: доступ к публичным страницам + `/account`; в хедере аватар и logout.

## Реализованные страницы
- `/login`
- `/register`
- `/account`
- `/forgot-password`

## Безопасность
- Пароли хранятся только как `bcrypt` hash (`password_hash`)
- Логин: проверка email/пароля через `bcrypt.compare`
- Сессия: JWT в `HttpOnly` cookie
- Приватные маршруты: middleware-редирект на `/login`
- Forgot password: одинаковый ответ для защиты от user enumeration

## Логика авторизации (flow)
1. **Register**: validate -> unique email -> hash password -> insert user -> set JWT cookie -> redirect `/account`.
2. **Login**: find user -> compare hash -> set JWT cookie -> redirect `/account`.
3. **Protected route**: middleware проверяет JWT; без него редиректит на `/login?next=/account`.
4. **Logout**: endpoint очищает cookie.

## База данных
Схема в `db/schema.sql`:
- `users`
- `password_reset_tokens`

## Запуск
```bash
npm install
cp .env.example .env.local
# применить db/schema.sql в PostgreSQL
npm run dev
```
