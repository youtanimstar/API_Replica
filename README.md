# 🚀 API Replica

<div align="center">
  <img src="./images/image.png" alt="API Replica Logo">
  <br>
  <img src="https://img.shields.io/badge/React-19.1.0-61dafb?style=flat&logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Database-MySQL-4479a1?style=flat&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Styling-TailwindCSS-06b6d4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</div>

## 📖 Overview

**API Replica** is a powerful, user-friendly platform that allows developers to create, manage, and test custom APIs with ease. Built with modern web technologies, it provides a seamless experience for API development and testing with real-time JSON editing capabilities.

### ✨ Key Features

- 🎯 **Custom API Creation** - Build and configure your own REST APIs
- 🛠️ **Real-time JSON Editor** - Edit API responses with live preview
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- 🔄 **Live Testing** - Test your APIs instantly with built-in tools
- 💾 **Data Persistence** - Store and manage your API configurations
- 🎨 **Modern UI** - Clean, intuitive interface built with React & Tailwind CSS

## 🖼️ Gallery

### 📸 Application Screenshots

<div align="center">

#### 🏠 Home Dashboard
<img src="./images/1.png" alt="API Replica Dashboard" width="800">
*Main dashboard showing available APIs and quick actions*

#### ⚙️ API Configuration
<img src="./images/2.png" alt="API Configuration" width="800">
*Detailed API configuration interface with JSON editor*

#### 🧪 Live API Testing
<img src="./images/3.png" alt="Live API Testing" width="800">
*Real-time API testing with response preview*

</div>

## 🏗️ Architecture

```
```plaintext
API_Replica/
├── frontend/                # 💻 React + Vite frontend
│   ├── public/              # 🖼️ Static assets (images, favicon, etc.)
│   ├── src/
│   │   ├── assets/          # 🗂️ Images, icons, etc.
│   │   ├── components/      # 🧩 Reusable UI components (Navbar, Cards, Editors)
│   │   ├── pages/           # 📄 Page components (Home, EditApi, etc.)
│   │   ├── styles/          # 🎨 Tailwind CSS and custom styles
│   │   └── main.jsx         # 🚪 App entry point
│   └── vite.config.js       # ⚙️ Vite configuration
├── backend/                 # 🖥️ Node.js + Express backend
│   ├── controllers/         # 🧠 API logic controllers
│   ├── models/              # 🗃️ Sequelize models (database schemas)
│   ├── routes/              # 🛣️ API & custom route definitions
│   ├── config/              # 🔧 Database and environment config
│   ├── migrations/          # ⬆️ Database migrations (if any)
│   ├── seeders/             # 🌱 Database seeders (if any)
│   ├── app.js               # 🚦 Express app entry point
│   └── .env                 # 🗝️ Environment variables
├── images/                  # 🖼️ Project images for documentation
├── README.md                # 📘 Project documentation
├── package.json             # 📦 Project metadata and scripts (root or per workspace)
└── LICENSE                  # 📄 Project license
```


## 🚀 Quick Start

### Prerequisites

- ![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=flat&logo=node.js&logoColor=white)
- ![MySQL](https://img.shields.io/badge/MySQL-8.0+-4479a1?style=flat&logo=mysql&logoColor=white)
- ![npm](https://img.shields.io/badge/npm-v8+-cb3837?style=flat&logo=npm&logoColor=white)

### 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/youtanimstar/API_Replica.git
   cd API_Replica
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Configure Environment**
   ```bash
   # Create .env file in backend directory
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_NAME=mag
   PORT=5000
   ```

### 🌐 Access the Application

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:5000`

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | ![React](https://img.shields.io/badge/React-19.1.0-61dafb?style=flat&logo=react) ![Vite](https://img.shields.io/badge/Vite-7.0.0-646cff?style=flat&logo=vite) |
| **Styling** | ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06b6d4?style=flat&logo=tailwindcss) |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js) |
| **Database** | ![MySQL](https://img.shields.io/badge/MySQL-Sequelize-4479a1?style=flat&logo=mysql) |
| **Tools** | ![Axios](https://img.shields.io/badge/Axios-HTTP_Client-5a29e4?style=flat) ![UUID](https://img.shields.io/badge/UUID-Generator-orange?style=flat) |

## 📚 API Documentation

### 🔗 Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/custom/:id` | Retrieve custom API data |
| `POST` | `/api/custom` | Create new custom API |
| `PUT` | `/api/custom/:id` | Update existing API |
| `DELETE` | `/api/custom/:id` | Delete custom API |

### 📝 Sample Request
```javascript
// GET /api/custom/employee
{
  "id": 1,
  "name": "Deep Das",
  "email": "deep.das@example.com",
  "phone": "+91-9876543210",
  "username": "deepdas",
  "location": "Howrah, West Bengal, India",
  "about": "Full Stack Developer and Designer"
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Developer

<div align="center">
  <img src="https://avatars.githubusercontent.com/u/107903218?v=4" alt="Deep Das" width="150" height="150" style="border-radius: 50% !important;">
  
  ### **Deep Das**
  *Full Stack Developer & Designer*
  
  [![GitHub](https://img.shields.io/badge/GitHub-youtanimstar-181717?style=flat&logo=github)](https://github.com/youtanimstar)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-thedeepdas-0077b5?style=flat&logo=linkedin)](https://www.linkedin.com/in/thedeepdas/)
  [![Email](https://img.shields.io/badge/Email-deepdas.it34@gmail.com-d14836?style=flat&logo=gmail)](mailto:deepdas.it34@gmail.com)
  [![Portfolio](https://img.shields.io/badge/Portfolio-deepdas-6366f1?style=flat&logo=netlify)](https://deepdas-portfolio.netlify.app/)
  
  **📍 Location:** Howrah, West Bengal, India  
  **💼 Expertise:** React, Node.js, Full Stack Development, API Design  
  **🎯 Passion:** Building scalable web applications and beautiful user interfaces
</div>

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js community for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Express.js for the robust backend framework
- MySQL for reliable data storage
- All contributors who helped make this project better



---

<div align="center">
  <p>Made with ❤️ by <strong>Deep Das</strong></p>
  <p>⭐ If you found this project helpful, please give it a star!</p>
</div>