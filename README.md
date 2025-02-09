# DirectoryManagement
Overview
DirectoryManagement is a business listing management system with search, pagination, sorting, and CRUD operations. The project follows clean coding standards and is structured into two main folders:

DirectoryManagementAPI/ – .NET Core backend for managing business listings.
DirectoryManagementFrontend/ – Angular frontend for user interaction.

To view project: https://drive.google.com/file/d/1Sek9DiYcoZ60DH2WJspP0zHzAZoRnMeU/view?usp=sharing
![image](https://github.com/user-attachments/assets/351b4df2-e795-4098-a13c-9a6a81cc7f91)


Setup Instructions
Backend (DirectoryManagementAPI)
dotnet restore
dotnet run

Frontend (DirectoryManagementFrontend)
npm install
ng serve --open


Features
Business Management: Add, update, delete and view businesses.
Components:
1. business-add: Adds new businesses.
2. business-form: Updates existing businesses.
3. business-list: Displays all businesses with search and sorting.

Performance Enhancements:
Optimized API calls for faster data retrieval.
Angular reactive forms for real-time validation.

Challenges & Solutions
Learning .NET Core as a Fresher: Initially, integrating the backend was challenging. This was overcome through study and project experience of different tech stacks.
Port Mismatch Between .NET & Angular: The default ports for both frameworks differed, causing integration issues. Resolved by configuring CORS in .NET and updating the API base URL in Angular.
