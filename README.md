### **Step 1: Project Setup**

#### **Backend Setup with Node.js and TypeScript**

1. **Initialize the Project:**
   - Create a new Node.js project with TypeScript.

   ```bash
   mkdir appointment-scheduler
   cd appointment-scheduler
   npm init -y
   npx tsc --init
   ```

2. **Install Dependencies:**

   - Install necessary backend packages.

   ```bash
   npm install express pg typeorm bcryptjs jsonwebtoken reflect-metadata
   npm install -D typescript ts-node @types/express @types/bcryptjs @types/jsonwebtoken
   ```
