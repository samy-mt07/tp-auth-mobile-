# TP Auth Mobile (API Express + NativeScript)

 Équipe
- AISSI Samy
- AININE Ghiles
- BAHMED Abdelrezak

lien github : https://github.com/samy-mt07/tp-auth-mobile-

## 1. Structure du projet

tp-auth-mobile/
│
├── api/ → API Express + MySQL + JWT
│ ├── server.js
│ ├── package.json
│ ├── .env
│ │
│ ├── src/
│ │ ├── config/
│ │ │ └── db.js
│ │ │
│ │ ├── middlewares/
│ │ │ ├── authMiddleware.js
│ │ │ └── errorHandler.js
│ │ │
│ │ ├── models/
│ │ │ └── userModel.js
│ │ │
│ │ ├── services/
│ │ │ └── authService.js
│ │ │
│ │ ├── controllers/
│ │ │ └── authController.js
│ │ │
│ │ ├── routes/
│ │ │ ├── authRoutes.js
│ │ │ └── userRoutes.js
│ │ │
│ │ └── utils/
│ │ └── generateToken.js
│ │
│ └── sql/
│ └── schema.sql
│
└── mobile/ → Application mobile NativeScript
└── tpApp/
├── app/
├── App_Resources/
└── package.json


3. Installation - API

mkdir tp-auth-mobile/api
cd tp-aith-mobile/api
npm install
npm  intit -y 
npm install msql12
npm install cors 
npm install Express
npm install dotenv
npm install nodmon 
nom install jsonwebtoken
cp .env.example .env

Créer la base de données

Ouvrir MySQL

Exécuter :

CREATE DATABASE IF NOT EXISTS tp_auth_mobile;
USE tp_auth_mobile;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


ou simplement :