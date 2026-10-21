Wanderlust 🌍
Wanderlust is a full-stack vacation rental platform that allows users to explore, list, review, and book travel accommodations worldwide. Built with a robust MVC architecture, it provides a seamless user experience with secure authentication, interactive maps, cloud-based image hosting, and integrated payment processing.

🚀 Features
User Authentication: Secure signup, login, and session management using Passport.js and MongoDB Atlas.

Interactive Maps: Real-time property location rendering using Mapbox API.

Image Management: Cloud-based upload and delivery for property photos via Cloudinary.

Booking & Payments: End-to-end checkout experience with dynamic price calculation using Stripe API.

Review System: Authenticated users can leave ratings and comments on properties.

Responsive UI: Dynamic frontend rendered with EJS and styled for modern devices.

💻 Tech Stack
Backend: Node.js, Express.js

Database: MongoDB Atlas, Mongoose

Frontend: EJS (Embedded JavaScript), EJS-Mate, HTML, CSS

Session Management: express-session, connect-mongo

APIs & Integrations: Mapbox, Cloudinary, Stripe

🛠️ Installation & Setup
Follow these steps to run the project locally on your machine.

1. Clone the repository

Bash
git clone https://github.com/your-username/wanderlust.git
cd wanderlust
2. Install dependencies

Bash
npm install
3. Set up Environment Variables
Create a .env file in the root directory of the project and add the following keys with your own credentials:

Code snippet
# Database & Sessions
ATLASDB_URL="your-mongodb-atlas-connection-string"
SECRET="your-super-secret-session-key"

# Cloudinary (Image Hosting)
CLOUD_NAME="your-cloudinary-cloud-name"
CLOUD_API_KEY="your-cloudinary-api-key"
CLOUD_API_SECRET="your-cloudinary-api-secret"

# Mapbox (Geocoding & Maps)
MAPBOX_TOKEN="your-mapbox-public-token"

# Stripe (Payments)
STRIPE_SECRET_KEY="your-stripe-secret-key"
4. Initialize the Database (Optional)
If you want to populate your local database with sample listings:

Bash
node init/data.js
5. Start the server

Bash
node app.js
The application will start running on http://localhost:8080.
