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

    // Send data to Netlify function
    const response = await fetch("/.netlify/functions/hello-world", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData), 
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.success) {
      alert("Email sent successfully!");
    } else {
      alert(`Failed to send email: ${result.message}`); 
    }

  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while sending the email. Please try again later.");
  }
});
