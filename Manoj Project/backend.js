const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const https = require('https');
require("dotenv").config(); // Load environment variables from .env

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*',  // Replace with your frontend's actual URL
  methods: ['GET', 'POST','PUT','DELETE'],
  credentials: true
}));

 // Allow requests from all origins

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submissions
app.post("/api/send-email", async (req, res) => {
  const { name, email, mobile, message} = req.body;

  // Nodemailer configuration using environment variables
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use another service like Outlook, Yahoo, etc.
    auth: {
      user: process.env.EMAIL_USER, // Use email from .env
      pass: process.env.EMAIL_PASS, // Use app password from .env
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.OWNER_EMAIL, // Use owner's email from .env
    subject: "New Contact Form Submission",
    text: `Name: ${name}\nEmail: ${email}\nMobile:${mobile}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

// Start the server
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
