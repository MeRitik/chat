# 💬 Real-Time Chat Application

A full-stack real-time chat application built with Spring Boot (backend) and React (frontend), featuring JWT authentication, WebSocket communication, and group messaging capabilities.

## 🏗️ Architecture Overview

```
┌─────────────────┐    WebSocket/HTTP    ┌──────────────────┐
│                 │◄────────────────────►│                  │
│  React Frontend │                      │  Spring Boot     │
│  (Vite + React) │                      │  Backend         │
│                 │                      │                  │
└─────────────────┘                      └──────────────────┘
                                                   │
                                                   │ JPA/Hibernate
                                                   ▼
                                         ┌──────────────────┐
                                         │                  │
                                         │  MySQL Database  │
                                         │                  │
                                         └──────────────────┘
```

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based Authentication**: Secure token-based authentication system
- **Spring Security Integration**: Role-based access control
- **Password Encryption**: Secure password hashing with BCrypt
- **CORS Configuration**: Cross-origin resource sharing setup

### 💬 Real-Time Messaging
- **WebSocket Communication**: Real-time bidirectional communication using STOMP over WebSocket
- **Group Messaging**: Create and join chat groups
- **Message Persistence**: All messages are stored in the database
- **Live Updates**: Real-time message delivery without page refresh

### 👥 User Management
- **User Registration & Login**: Complete user authentication flow
- **Profile Management**: User profile viewing and management
- **Group Creation**: Users can create new chat groups
- **Group Membership**: Join existing groups with group codes

### 🎨 Frontend Features
- **Modern React UI**: Built with React 19 and modern hooks
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- **Real-time Updates**: Live chat interface with message notifications
- **State Management**: Context API for global state management
- **Routing**: React Router for navigation

## 🛠️ Technology Stack

### Backend
- **Framework**: Spring Boot 3.5.4
- **Language**: Java 21
- **Database**: MySQL
- **ORM**: Spring Data JPA with Hibernate
- **Security**: Spring Security with JWT
- **WebSocket**: Spring WebSocket with STOMP
- **Build Tool**: Maven
- **Additional Libraries**:
  - ModelMapper for DTO mapping
  - Lombok for boilerplate reduction
  - JJWT for JWT handling

### Frontend
- **Framework**: React 19.1.0
- **Build Tool**: Vite 7.0.4
- **Styling**: Tailwind CSS 4.1.11
- **HTTP Client**: Axios
- **WebSocket**: @stomp/stompjs + SockJS
- **Routing**: React Router DOM
- **UI Components**: Lucide React icons
- **Notifications**: React Hot Toast

## 📁 Project Structure

```
chat-backend/
├── src/main/java/com/ritik/chatbackend/
│   ├── configurations/          # Spring configurations
│   │   ├── AppConfig.java
│   │   ├── JpaConfiguration.java
│   │   ├── ModelMapperConfig.java
│   │   └── WebSocketConfig.java
│   ├── controllers/             # REST controllers
│   │   ├── AuthController.java
│   │   ├── ChatController.java
│   │   ├── GroupController.java
│   │   └── ProfileController.java
│   ├── dtos/                    # Data Transfer Objects
│   ├── entities/                # JPA entities
│   │   ├── AppUser.java
│   │   ├── Group.java
│   │   └── Message.java
│   ├── exceptions/              # Custom exceptions
│   ├── repositories/            # JPA repositories
│   ├── security/                # Security configurations
│   └── services/                # Business logic services
├── frontend/chat-frontend/
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── context/             # React context providers
│   │   ├── hooks/               # Custom React hooks
│   │   ├── pages/               # Page components
│   │   ├── routes/              # Route protection components
│   │   ├── services/            # API service layer
│   │   └── utils/               # Utility functions
│   └── public/                  # Static assets
└── pom.xml                      # Maven configuration
```

## 🚀 Getting Started

### Prerequisites
- Java 21 or higher
- Node.js 18+ and npm
- MySQL 8.0+
- Maven 3.6+

### 🗄️ Database Setup
1. Install MySQL and create a database:
```sql
CREATE DATABASE chat;
```

2. Update database credentials in `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/chat
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 🔧 Backend Setup
1. Clone the repository:
```bash
git clone <repository-url>
cd chat-backend
```

2. Build and run the Spring Boot application:
```bash
mvn clean install
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 🎨 Frontend Setup
1. Navigate to the frontend directory:
```bash
cd frontend/chat-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 🔧 Configuration

### JWT Configuration
Update JWT settings in `application.properties`:
```properties
jwt.secret=your-secret-key
jwt.expiration=36000000  # 10 hours in milliseconds
```

### WebSocket Configuration
The WebSocket endpoint is configured at `/chat` with SockJS fallback. Frontend connects to this endpoint for real-time communication.

### CORS Configuration
CORS is configured to allow requests from `http://localhost:5173` (frontend development server).

## 📡 API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login

### Groups
- `GET /groups` - Get user's groups
- `POST /groups` - Create new group
- `POST /groups/{groupId}/join` - Join group
- `POST /groups/{groupId}/add-user` - Add user to group

### Profile
- `GET /profile` - Get user profile

### Chat (WebSocket)
- `/app/sendMessage` - Send message to group
- `/topic/group/{groupId}` - Subscribe to group messages

## 🧪 Testing

Run backend tests:
```bash
mvn test
```

Run frontend tests:
```bash
cd frontend/chat-frontend
npm run test
```

## 📦 Building for Production

### Backend
```bash
mvn clean package
java -jar target/chat-backend-0.0.1-SNAPSHOT.jar
```

### Frontend
```bash
cd frontend/chat-frontend
npm run build
```

## 🔮 Future Improvements

### 🚀 Scalability & Performance
- **Apache Kafka Integration**: 
  - Implement Kafka for handling high-volume message queuing
  - Enable horizontal scaling across multiple server instances
  - Provide fault-tolerant message delivery with persistent storage
  - Support for event sourcing and message replay capabilities

- **Elasticsearch Integration**:
  - Add full-text search capabilities for message history
  - Implement advanced search filters (date range, user, group)
  - Enable real-time message indexing for instant search results
  - Support for fuzzy search and auto-completion

### 🎯 Additional Features
- **File Sharing**: Support for image, document, and media sharing
- **Message Reactions**: Emoji reactions and message threading
- **Push Notifications**: Real-time notifications for offline users
- **Voice/Video Calls**: WebRTC integration for audio/video communication
- **Message Encryption**: End-to-end encryption for secure communication
- **Admin Dashboard**: Administrative interface for user and group management

### 🏗️ Infrastructure
- **Redis Caching**: Implement caching for frequently accessed data
- **Docker Containerization**: Package application with Docker for easy deployment
- **Kubernetes Orchestration**: Enable container orchestration for production deployment
- **Monitoring & Observability**: Integration with Prometheus, Grafana, and ELK stack
- **API Rate Limiting**: Implement rate limiting to prevent abuse
- **Load Balancing**: Configure load balancers for high availability

### 🔒 Security Enhancements
- **OAuth2 Integration**: Support for Google, GitHub, and other OAuth providers
- **Two-Factor Authentication**: Enhanced security with 2FA
- **Message Moderation**: Automated content filtering and moderation tools
- **Audit Logging**: Comprehensive logging for security and compliance

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ritik** - [MeRitik](https://github.com/MeRitik)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the amazing frontend library
- All contributors who helped improve this project

---

⭐ If you found this project helpful, please give it a star!
