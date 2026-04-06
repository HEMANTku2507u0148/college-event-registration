const form = document.getElementById("registrationForm");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const inputs = document.querySelectorAll("input");
  const selects = document.querySelectorAll("select");
  const textarea = document.querySelector("textarea");

  const data = {
    fullName: inputs[0].value,
    email: inputs[1].value,
    department: inputs[2].value,
    eventName: selects[0].value,
    notes: textarea.value
  };

  try {
    const res = await fetch("https://your-backend-url.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
    form.reset();
  } catch (error) {
    alert("Server connection error");
    console.log(error);
  }
});