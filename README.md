# A simple TO-DO API

## Steps to install

- Clone the repository
- Install all packages using `npm i`
-

## Endpoints

- Create Task
- Get All Tasks
- Get All Unfinished Tasks
- Get All Completed Tasks
- Get Single Task
- Update Task
- Delete All Completed Tasks
- Delete Single Task
- Delete All Tasks

# 📝 Tasks API

A simple Tasks Management API built with express.js and MySQL to create, update, and delete tasks.

---

## 📌 Features

- Create Task
- Get All Tasks
- Get All Unfinished Tasks
- Get All Completed Tasks
- Get Single Task
- Update Task
- Delete All Completed Tasks
- Delete Single Task
- Delete All Tasks

---

## 🚀 Getting Started

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/Learn-NodeJS-with-Stephen/TO-DO-API.git
cd TO-DO-API
```

### 2️⃣ **Install Dependencies**

```sh
npm i
```

### 3️⃣ **Set Up Environment Variables**

Create a `.env` file in the root directory and add your database credentials. Refer to `env.example` for required variables.

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=tasks_db
PORT= 3500
```

### 4️⃣ **Run Database Migrations (if applicable)**

Ensure your database is set up and run the migrations (if needed).

```sh
node database/migrations.js
```

### 5️⃣ **Start the Server**

```sh
nodemon index.js
```

### 6️⃣ **API Endpoints Documentation**

Use **Postman** or any API testing tool to test the endpoints.

---

## 📖 API Documentation

### 📌 Base URL: `http://localhost:3500`

### 🔹 Create a Task

- **Endpoint:** `POST /tasks`
- **Request Body:**
  ```json
  {
    "title": "Read up about MVC",
    "description": "Sample description"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "message": "Task created successfully",
    "data": [
      {
        "id": 1,
        "title": "Read up about MVC",
        "description": "Sample description",
        "completed": 0,
        "created_at": "2025-02-16T16:36:45.000Z"
      }
    ]
  }
  ```

### 🔹 Get All Tasks

- **Endpoint:** `GET /tasks`
- **Response:**
  ```json
  {
    "success": true,
    "message": "All Tasks",
    "data": [
      {
        "id": 1,
        "title": "Read up about MVC",
        "description": "Sample description",
        "completed": 0,
        "created_at": "2025-02-16T16:36:45.000Z"
      }
    ]
  }
  ```

### 🔹 Get a Single Task

- **Endpoint:** `http://localhost:3500/tasks/1`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Single Task",
    "data": [
      {
        "id": 1,
        "title": "Read up about MVC",
        "description": "Sample description",
        "completed": 0,
        "created_at": "2025-02-16T15:30:03.000Z"
      }
    ]
  }
  ```

### 🔹 Update a Task

- **Endpoint:** `http://localhost:3500/tasks/1`
- **Request Body:**
  ```json
  {
    "title": "Updated Task",
    "description": "Updated Description",
    "completed": true
  }
  ```
- **Response:**
  ```json
  "success": true,
    "message": "Task updated successfully",
    "data": [
        {
            "id": 3,
            "title": "Updated title",
            "description": "updated describtion",
            "completed": 1,
            "created_at": "2025-02-16T15:24:02.000Z"
        }
    ]
  }
  ```

### 🔹 Delete a Task

- **Endpoint:** `DELETE /tasks/:taskId`
- **Response:**
  ```json
  {
    "success": true,
    "message": "All Completed Tasks",
    "data": [
      {
        "id": 3,
        "title": "Read up about MVC updated",
        "description": "Sample description updated",
        "completed": 1,
        "created_at": "2025-02-16T15:24:02.000Z"
      }
    ]
  }
  ```

### 🔹 Delete All Tasks

- **Endpoint:** `DELETE /tasks`
- **Response:**
  ```json
  {
    "success": true,
    "message": "1 task(s) deleted successfully"
  }
  ```

---

## 🛠 Technologies Used

- **Express.js**
- **MySQL**
- **dotenv** (Environment variables management)
- **Postman** (For API testing)

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request

---

## 📝 License

This project is licensed under the **MIT License**.

---

## 📩 Contact

For any questions or issues, feel free to reach out.

🔹 **GitHub:** https://github.com/Osalumense

## Postman Documentation

- https://documenter.getpostman.com/view/40124402/2sAYQWLuC1
