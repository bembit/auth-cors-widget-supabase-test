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

class dynamicCorsMiddleware {
    +/middleware/corsMiddleware.ts
    +dynamicCorsMiddleware
    +CORS
}

class checkboxController {
    +/checkboxController.ts
    +GET /checkbox-state
    +POST /checkbox-state
}

class User {
    +/entities/User.ts
    +has domains as cors preferences
}

class CorsPreferenceController {
    +/entities/UserCorsPreference.ts
    +from where can customer access user data
    +http://localhost:3000
}

class Customer {
    +Can read data, needs auth to write data
    +/entities/Customer.ts
    +can see user data if accessing the correct domain
    +http://localhost:3000
}

class userPreferenceController {
    +Ideally this should be a set calendar, available appointments, etc.
    +/userPreferenceController.ts
    +GET /user-preferences
    +POST /user-preferences
}

class Widget {
    +/public/appointmentWidget.js
    +widget to show user preferences
}


App --> Server
App --> indexRoutes
indexRoutes --> authRoutes
authRoutes --> authController
indexRoutes --> checkboxRoutes
indexRoutes --> authMiddleware
indexRoutes --> dynamicCorsMiddleware
' checkboxRoutes --> authMiddleware
checkboxRoutes --> checkboxController
Server --> Database
Server --> Public
Database --> User
User --> CorsPreferenceController
User --> userPreferenceController
CorsPreferenceController --> Customer
Public --> Widget
Customer --> Widget
' Widget --> User
Widget --> Database

@enduml
