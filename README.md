## Description
Custom chatGPT interface. Client: React + TypesScript + Tailwind, Back: Node.js

## Environment Variables Setup Guide
1) Create a .env.local file in the server root directory of the project if it doesn't already exist.

2) In the .env.local file, define the following environment variables and assign them the required values:

    ### MongoDB's connection string
    DB_URL=mongodb+srv://your-username:your-password@cluster0.mongodb.net/your-database-name
    
    ### Secret keys for JWT token generation
    <ol>
    <li>JWT_ACCESS_SECRET=your-access-secret-key</li>
    <li>JWT_REFRESH_SECRET=your-refresh-secret-key</li>
    </ol>
   
    ### SMTP server settings (for sending email)
    <ol>
    <li>SMTP_HOST=smtp.your-email-provider.com</li>
    <li>SMTP_PORT=587</li>
    <li>SMTP_USER=your-email@example.com</li>
    <li>SMTP_PASSWORD=your-email-password</li>
    </ol>
    
    ### API key for accessing the OpenAI service
    OPENAI_API_KEY=your-openai-api-key

3) Save the .env.local file.
