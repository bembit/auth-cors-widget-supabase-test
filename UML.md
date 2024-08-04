# UML Diagram

```plantuml
@startuml

class App {
    +/app.ts
    +/api, ROUTES
}

class Server {
    +/server.ts
    +init AppDataSource
}

class Public {
    +/public
    +HTML, CSS, JS
}

class Database {
    +/config/database.ts
    +DataSource, Typeorm
    +User
    +UserPreference
    +AppDataSource, Supabase
}

class indexRoutes {
    +/index.ts
    +authRoutes
}

class authRoutes {
    +/authRoutes.ts
    +POST /login
    +POST /register
}

class checkboxRoutes {
    +SHIT NAME, TB implemented
    +GET /checkbox-state
    +POST /checkbox-state
}

class authController {
    +/authController.ts
    +POST /login
    +POST /register
}

class authMiddleware {
    +/authMiddleware.ts
    +authMiddleware
    +JWT
}

class checkboxController {
    +/checkboxController.ts
    +GET /checkbox-state
    +POST /checkbox-state
}

App --> Server
App --> indexRoutes
indexRoutes --> authRoutes
authRoutes --> authController
indexRoutes --> checkboxRoutes
checkboxRoutes --> authMiddleware
checkboxRoutes --> checkboxController
Server --> Database
Server --> Public
Database --> User
Database --> UserPreference

@enduml
