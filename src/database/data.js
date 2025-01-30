import bcrypt from "bcrypt";

export const users = [
  {
    name: "Joan",
    last_name: "Doe",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "admin",
    isAdmin: true,
  },
  {
    name: "John",
    last_name: "Smith",
    email: "user@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "employee",
    isAdmin: false,
  },
];

export const tasks = [
  {
    id: "1",
    company: "TechCorp",
    project: "Website Redesign",
    task_type: "Development",
    task_description: "Refactor homepage layout",
    entry_time: "09:00:00",
    exit_time: "17:00:00",
    lunch_hours: 1,
    status: false,
  },
  {
    id: "2",
    company: "SoftSolutions",
    project: "Mobile App",
    task_type: "Testing",
    task_description: "Perform UI testing on new feature",
    entry_time: "10:00:00",
    exit_time: "18:00:00",
    lunch_hours: 1,
    status: true,
  },
];
