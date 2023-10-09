

![Smart Pocket Logo](/public/headerReadme.png) <!-- Add your logo here -->

Smart Pocket is a user-friendly web application designed to help you effortlessly track your expenses and income. Keep your finances in check with ease, whether you're managing personal finances or business expenses.


<br />

## Features

- **Expense Tracking:** Create or update your daily expenses and categorize them for better organization.
- **Expense Categories:** Organize expenses into categories for easy tracking and analysis.
- **Income Tracking:** Log your income sources to maintain a complete financial overview.
- **Firebase Database:** Expenses and income tracked securely with Firebase database storage.
- **Transaction History:** View list of expense and income history.
- **Google Authentication:** Securely log in with your Google account for easy access to your financial data.
- **Data Visualization:** Visualize your financial data with easy-to-read chart
- **User-Friendly Interface:** Intuitive and responsive design for a seamless user experience.

## Technologies and Tools

- **Javascript** 
- **Next.js** 
- **React** 
- **Firebase** 
- **React Firebase Hooks** 
- **Chart.js** 
- **React Toastify** 
- **Tailwind CSS** 
- **PostCSS** 

## Demo

- **Login on with Google Authentication to add income and expense** 
public/Demo_authentication.mov


- **Creating new expense category** 
- **Transaction History**
 - **Chart graph visualization of expenses in categories and amount**

## Getting Started

1. Clone this repository to your local machine.

2. Install the required dependencies using `npm install` or `yarn install`.

3. Set up your Firebase project and configure authentication settings for Google Authentication.

4. Create a `.env.local` file and add your Firebase configuration and other environment variables as needed:

   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_STORAGE_BUCKET=your-storage-bucket
   FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   FIREBASE_APP_ID=your-app-id
   FIREBASE_MEASUREMENT_ID=your-measurement-id

5. Start the development server using `npm run dev` or `yarn dev`.

6. Access the app in your web browser at http://localhost:3000.

## Contributing 

Contributions are welcome! Feel free to open issues or submit pull requests to help improve this app.