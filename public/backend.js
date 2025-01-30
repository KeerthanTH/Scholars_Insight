
const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  try {
    // 1. Get form data from the request body
    const formData = JSON.parse(event.body); // Important: Parse JSON

    // 2. Validate form data (important to prevent errors and spam)
    if (!formData.name || !formData.email || !formData.message) {
      return {
        statusCode: 400, // Bad Request
        body: JSON.stringify({ error: "Missing required form fields." }),
      };
    }

    // 3. Create Nodemailer transporter (configure with environment variables)
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or your preferred email service
      auth: {
        user: process.env.EMAIL_USER,  // Get from Netlify environment variables
        pass: process.env.EMAIL_PASS,  // Use an app password!
      },
    });

    // 4. Set up email options
    const mailOptions = {
      from: formData.email,
      to: process.env.OWNER_EMAIL, // Get from Netlify environment variables
      subject: "New Contact Form Submission",
      html: `
        <p>Name: ${formData.name}</p>
        <p>Email: ${formData.email}</p>
        <p>Message: ${formData.message}</p>
      `,
    };

    // 5. Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId); // Log for debugging

    // 6. Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully!" }),
    };

  } catch (error) {
    console.error("Error sending email:", error); // Log the error for debugging

    // 7. Return an error response
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to send email." }), // Don't reveal too much detail in production
    };
  }
};