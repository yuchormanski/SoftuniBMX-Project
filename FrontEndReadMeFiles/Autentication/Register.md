###### [Back to content](/README.md)

## Регистрация на потребители

Потребителите се регистрират със задължителните изисквани лични данни:

- валидна електронна поща, която в последствие служи за влизане в системата
- телефонен номер
- създава личен финансов профил в приложението, като добавя IBAN (според световните възможности трябва да е между 5 и 34 символа)
- захранва сметката си с определен от него баланс
- адрес, на който след завършване на поръчката да бъде изпратен продукта
- парола за профила, като тя трябва да включва:
  - Минимум 6 символа
  - Поне една главна и една малка буква
  - Поне една цифра
- повторение на паролата

![Clipboard03](https://github.com/airfanBG/SoftuniBMX/assets/693307/45736f53-c2b7-42e3-b2af-5f2893285d47)

Формата е изпълнена от контролирани React инпут полета, динамично извеждащи информация за грешка при попълване.

Електронната поща и паролите се проверяват с REGEXP

При невалидно попълнена форма не е възможно да се изпълни заявката за регистрация

```regexp
EMAIL = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;
```

![Clipboard04](https://github.com/airfanBG/SoftuniBMX/assets/693307/f11918ff-b011-46f6-9720-3e3638a8d127)

При правилно попълнена форма, системата изпраща връзка за потвърждение на посоченият имейл адрес

След успешна регистрация, потребителя се прехвърля към стартовата страница.

Заявката е със следната структура:

```json
{
    "firstName": "string",
    "lastName": "string",
    "email": "string@string.bg",
    "password": "string",
    "repass": "string",
    "iban": "AAAAAAAAAAA",
    "balance": number,
    "phone": "+359 123456789",
    "city": "string",
    "role": "user",
    "address": {
        "country": "string",
        "postCode": "number",
        "district": "string",
        "block": "string",
        "floor": number,
        "apartment": "string",
        "street": "string",
        "strNumber": "string"
    }
}
```
