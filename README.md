### **Step 1: Project Setup**

`"dev": "ts-node-dev --respawn --transpile-only src/server.ts",`

npm run dev

testing supabase

http://localhost:3000/api/auth/register
http://localhost:3000/api/auth/login

extending user entity later

needs 2nd user model.
- one provider and consumer
- one provider can have many consumers
- one consumer can have many providers
- one provider can have many appointments
- one appointment can have many providers
- one appointment can have many consumers
