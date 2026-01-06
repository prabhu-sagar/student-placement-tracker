# student-placement-tracker

#Problem Statement & Project Scope:
The Student Placement Tracker aims to provide a centralized platform for managing training and placement activities in an educational institution. It allows students to view placement drives, check eligibility, and apply for jobs, while administrators can post job opportunities and track student application statuses. The project focuses on improving transparency, efficiency, and accessibility in the placement process.

# Requirement Analysis & Module Identification:
Based on the problem statement, the following core modules were identified:
•	Job Posting Module (Admin): Admin can add, update, and manage placement drives with eligibility criteria.
•	Student Registration Module: Students can register and maintain academic and personal details.
•	Eligibility Filtering Module: Automatically filters students based on eligibility rules defined for each job.
•	Status Update Module: Displays application status such as applied, shortlisted, rejected, or selected.

# System Architecture (MERN Stack Flow):
The system follows the MERN stack architecture:
•	Frontend (React.js): Provides user interface for students and admins.
•	Backend (Node.js & Express.js): Handles API requests, business logic, and eligibility checks.
•	Database (MongoDB): Stores student details, job postings, and application data.
•	Flow: React → Express/Node APIs → MongoDB → Response to Frontend.

# Database Design (MongoDB Schema / ER Diagram):
The database is designed using MongoDB collections such as:
•	Student Collection: Stores student profile and academic details.
•	Job Collection: Contains job information and eligibility criteria.
•	Application Collection: Maintains application status and job–student mapping.
This design ensures efficient data storage and retrieval.

