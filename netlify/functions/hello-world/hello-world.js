const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  console.log("Function triggered!");

  try {
    const formData = event.body ? JSON.parse(event.body) : null;

    if (!formData) {
      console.log("Request body is empty");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Empty request body received." }),
      };
    }

    if (!formData.name || !formData.message) {
      console.log("Validation failed - missing fields.");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing required form fields." }),
      };
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
    });

    console.log("Transporter created successfully!");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "scholarsinsight1618@gmail.com",
      subject: "New Message from Scholar's Insight",
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nMobile: ${formData.mobile}\nMessage: ${formData.message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process form data.", details: error.message }),
    };
  }
};
