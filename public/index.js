document.getElementById("contactForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value,
      message: document.getElementById("message").value,
    };
    
    console.log("Form Data:", formData);
    console.log("Submitting form...");

    try {
      const response = await fetch("/.netlify/functions/backend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (result.success) {
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email. Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  });