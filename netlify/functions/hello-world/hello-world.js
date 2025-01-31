const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  console.log("Function triggered!"); // Debugging log

  try {
    // 1. Get form data from the request body
    const formData = JSON.parse(event.body);

    // 2. Validate form data
if (!formData.name || !formData.message ) {
  console.log("Validation failed - missing fields.");
  return {
    statusCode: 400, // Bad Request
    body: JSON.stringify({ error: "Missing required form fields." }),
  };
}

// 3. Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});
console.log("Transporter created successfully!",transporter);
    // console.log("Received formData:", formData);

    // 4. Send Email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "scholarsinsight1618@gmail.com", // Replace with the recipient email
      subject: "New Message from Scholar's Insight",
      text: `Name: ${formData.name}\nEmail: ${formData.mail}\n Mobile: ${formData.mobile}\nMessage: ${formData.message}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId); 
    // Return here for testing this step in isolation
    return {
      statusCode: 200,
      body: JSON.stringify({sucess: true, message: "Email sent successfully!" }),
    };
  } catch (error) {
    console.error("Error:", error); // Log error for debugging
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process form data.", details: error.message }),
    };
  }
};