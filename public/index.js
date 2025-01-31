document.getElementById("contactForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    // Get form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value, // Optional field
      mobile: document.getElementById("mobile").value, // Optional field
      message: document.getElementById("message").value,
    };

    // Validate required fields
    if (!formData.name || !formData.message) {
      alert("Please enter your Name and Message.");
      return; 
    }

    console.log("Sending form data:", formData);

    // Send data to Netlify function
    const response = await fetch("/.netlify/functions/hello-world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(formData), 
    });

    const result = await response.json(); // Declare result once

    if (response.ok && result.success) {
      alert("Email sent successfully!");
    } else {
      alert(`Failed to send email: ${result.error || "Unknown error occurred."}`);
    }

  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while sending the email. Please try again later.");
  }
});
