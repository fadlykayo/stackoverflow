# stackoverflow

## Information

Mini version of stackoverflow using MongoDB


## Models

| Models    |    Field   | Description                     |
|-----------|:----------:|---------------------------------|
| Users     |   UserId   | ID (auto increment)             |
|           |  username  | User's display name             |
|           |  password  | User's password                 |
| Questions | QuestionId | ID (auto increment)             |
|           |   userid   | User's ID who post the question |
|           |    title   | Question's title                |
|           |   content  | Question's content              |
|           |    vote    | Question's vote (up/down)       |
|           |   answer   | Fields:                         |
|           |            | AnswerId                        |
|           |            | userid                          |
|           |            | content                         |
|           |            | vote                            |

## Routes

| Routes              | HTTP   | Description          |
|---------------------|--------|----------------------|
| /auth/users          | GET    | GET All Users        |
| /auth/users/register | POST   | Create new User      |
| /api/users/         | POST   | Login Users          |
| /api/question/      | GET    | GET list of Question |
| /api/question/      | POST   | Create new Question  |
| /api/question/:id   | DELETE | DELETE Question      |
| /api/question/:id   | PUT    | Edit Question        |
| /api/question/:id   | POST   | Create new Answer    |
