# 🚀 Stage 0 — HNG13 Internship Project

A **NestJS** application built for the **HNG13 Internship (Stage 0)**. This backend project exposes a single REST endpoint `/api/profile` that returns developer details along with a dynamic cat fact fetched from an external API. It demonstrates:

- REST API design
- External API integration
- Error handling
- Rate limiting
- Logging
- Configuration management

---

## 🧰 Tech Stack

- ⚡ **NestJS** — Backend framework  
- 🌐 **Axios** — HTTP client for API calls  
- 🧱 **@nestjs/throttler** — Rate limiting  
- ⚙️ **@nestjs/config** — Environment management  
- 🔒 **CORS** — Cross-Origin Resource Sharing  
- 🪵 **Nest Logger** — Request/response logging  
- 🧩 **pnpm** — Package manager  

---

## 🧾 Description

This project serves as the Stage 0 submission for the **HNG13 internship**. The goal is to create an endpoint that returns:  

- Developer name, email, and tech stack  
- Timestamp  
- A random cat fact from [catfact.ninja](https://catfact.ninja/fact)  

---

## ⚙️ Project Setup

### 1️⃣ Clone the Repository
git clone https://github.com/Maxima24/stage-0-Hng13.git
cd stage-0-Hng13


### 2️⃣ Install Dependencies

pnpm install
### 3️⃣ Configure Environment Variables

Create a `.env` file in the root directory and add any required environment variables. For example:
API_VERSION = "V1"
CATS_FACTS= https://catfact.ninja/fact?max_length=24;
RATE_LIMIT=10
RATE_LIMIT_MS=60000


### 4️⃣ Start the Application
-To run in dev mode: pnpm  start:dev
-To run in prod mode: pnpm  start
---
## 📬 Example API Response

A successful response from the `/api/profile` endpoint will be in JSON format like this:
{
"status": "success",
"user": {
"email": "steelmaxima27@gmail.com",
"name": "steelmaxima"
"stack": "Node.js/NestJS"
},
"timeStamp": "2025-10-17T16:44:33.128Z",
"fact": "A cat sees about 6 times better than a human at night, and needs 1/6 the amount of light that a human does - it has a layer of extra reflecting cells which absorb light."
}


