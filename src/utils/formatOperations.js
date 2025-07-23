export const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("ar-EG", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
};

export const formatTime = (timeString) => {
  if (!timeString) return "";
  try {
    const time = timeString.split("T")[1].split(".")[0];
    const [hours, minutes] = time.split(":");
    const hour = Number.parseInt(hours) % 12 || 12;
    const ampm = Number.parseInt(hours) >= 12 ? "مساءً" : "صباحاً";
    return `${hour.toString().padStart(2, "0")}:${minutes} ${ampm}`;
  } catch (error) {
    console.error("Error formatting time:", error);
    return "";
  }
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat("ar-EG", {
    style: "currency",
    currency: "EGP",
  }).format(price);
};
