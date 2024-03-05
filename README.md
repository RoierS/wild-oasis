#<center>Wild Oasis Management App 🌴</center>

<center>
Wild Oasis Management App is a web application tailored for hotel employees to manage cabins, bookings, and guest information efficiently. The application ensures that only authorized hotel employees can access its functionalities, providing a secure environment for hotel management tasks.
</center>



## 🛠️ Tech Stack

**⚛️ React**
**🛣️ React Router**
**🔍 React Query**
**🎨 Styled Components**
**📝 Typescript**
**📋 React Hook Form**
**🔣 React Icons**
**🔥 React Hot Toast**
**📊 Recharts**
**📅 date-fns**
**🛢️ Supabase**
**🧹 ESlint**
**💅 Prettier**
**🚀 Vite**

## ✨ Features

**🔐 User Authentication:** Users need to log in to access the application, ensuring only hotel employees can utilize its features.
**🙎‍♂️ Avatar Management:** Users can upload avatars and update their name and password within the application.
**🏠 Cabin Management:** A table view displays all cabins with their details, allowing users to update, delete, or create new cabins with uploaded photos.
**📅 Booking Management:** A table view showcases all bookings with essential details like arrival and departure dates, status, and paid amount. Bookings can be filtered by status for easier management.
**💵 Payment Handling:** Users can accept payment for bookings on guest arrival, confirming payment receipt within the application.
**🥞 Breakfast Addition:** User can add breakfast for gest for entire stay during check-in if not already included.
**🧳 Guest Information:** Detailed guest data including full name, email, national ID, nationality, and country flag for quick identification.
**📊 Dashboard:** The initial screen presents a dashboard with vital information for the last 7, 30, or 90 days, including guest check-ins and check-outs, sales statistics, and occupancy rates.
**⚙️ Application-wide Settings:** Users can define application-wide settings such as breakfast price, min/max nights per booking, and max guests per booking.
**🌙 Dark Mode:** The application offers a dark mode for enhanced user experience.


# 📁 Project Structure

The project follows a structured organization for better maintainability and scalability:

***src/App.tsx:*** The main application component that sets up the router and defines the main structure of the app.

***src/features/:*** This folder contains various features of the application: authentication, bookings, cabins, check-in, check-out, dashboard and settings.

***src/pages/:*** This folder contains individual pages of the application, each corresponding to a specific route or view.

***src/hooks/:*** Custom React hooks used throughout the application for managing state, handling side effects, or encapsulating common functionality.

***src/constants/:***  Constants and configuration values used across the application, such as regex for email, validation errors massages and _yup_ validation schemas.

***src/context/:*** Context for managing dark mode settings across the application.

***src/ui/:*** UI reusable components and layouts used throughout the application, such as the AppLayout, buttons, inputs, spinners etc.

***src/services/:*** Functions for interacting with the external API, including fetching the bookings, cabins, settings and also API for user auth.

***src/utils/:*** Contains helpers functions.

***src/types/:*** Includes TypeScript interfaces for: booking, guests, forms etc.

***src/styles/:*** Global styles are stored here.


## 📜 Scripts

***dev:*** Run the development server using Vite.
```bash
npm run dev
```

***build:*** Build the project using TypeScript (tsc) and Vite.
```bash
npm run build
```

***lint:*** Lint the project using ESLint.
```bash
npm run lint
```

***preview:*** Preview the production build using Vite.
```bash
npm run preview
```

***lint:fix:*** Fix linting issues automatically using ESLint.
```bash
npm run lint:fix
```

***format:*** Format the code using Prettier.

```bash
npm run format
```


## 🚀 Getting Started

Clone the repository:

```bash
git clone https://github.com/RoierS/wild-oasis.git
cd wild-oasis
```

Install dependencies:
```bash
npm install
```

Run the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Or simply visit [Wild Oasis | Management App 🌴](https://wild-osasis-management-app.netlify.app/dashboard)


## 🤝 Contributing
Feel free to contribute to the project by submitting issues, feature requests, or pull requests. Please follow the established coding conventions and guidelines.


## 👥 Contributors
👨‍💼 [RoierS](https://github.com/RoierS) - [iermoliuk.roman@gmail.com](mailto:iermoliuk.roman@gmail.com)


## 📄 License
This project is licensed under the MIT License.
