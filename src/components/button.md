# UI Button

HTML кнопка с дополнительными возможностями.

## Properties

`link` `[string | object]` – Объект в таком же виде, как принимается в компоненте `router-link`.

Либо строка в формате `name:id`, например, `users.editing:22345`, сокращение от записи `{ name: 'users.editing', params: { id: 22345 } }`.

При использовании данного атрибута HTML-элемент `button` заменяется на компонент `router-link`.

---

`href` `[string]` – обычный URL.

---

`loading` `[boolean]`
