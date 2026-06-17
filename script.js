const form = document.getElementById("bookingForm");
const mainService = document.getElementById("mainService");
const dreadOptions = document.getElementById("dreadOptions");

// show dread options
mainService.addEventListener("change", function () {
  if (this.value === "Dreadlocks") {
    dreadOptions.style.display = "block";
  } else {
    dreadOptions.style.display = "none";
    dreadOptions.value = "";
  }
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = form.querySelector("input[type='text']").value;
  const phone = form.querySelector("input[type='tel']").value;
  const date = form.querySelector("input[type='date']").value;

  let service = mainService.value;

  if (service === "Dreadlocks") {
    if (!dreadOptions.value) {
      alert("Select dreadlocks service");
      return;
    }
    service = "Dreadlocks - " + dreadOptions.value;
  }

  const booking = {
    name,
    phone,
    service,
    date,
    time: new Date().toLocaleString()
  };

  try {
    await db.collection("bookings").add(booking);
    alert("Booking saved successfully!");
    form.reset();
    dreadOptions.style.display = "none";
  } catch (error) {
    alert("Error saving booking");
  }
});