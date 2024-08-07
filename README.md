### appointments demo dev

`"dev": "ts-node-dev --respawn --transpile-only src/server.ts",`

## todo
1. add customer models to interact with user endpoints
2. so basically the customer access should be "corsed"

## now
1. cors works
2. supabase design is ok.
3. when custom domain test - change later, so a default value modification can't break the whole app. default
4. currently needs manual db change back to localhost
5. reset button could be added for settings to default
6. base widget works and shows state

endpoints:

http://localhost:3000/api/auth/register
http://localhost:3000/api/auth/login

secured with middleware auth cors
think if globals needed or local middleware is ok.

CORS preference needs an auth from user
CUSTOMER should be limited by cors preference.

/api/cors/cors-preferences
/api/checkbox/checkbox-state
