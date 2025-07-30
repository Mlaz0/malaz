export const calculateEndTime = (startTime, duration) => {
  if (!startTime || !duration) return "";

  const [hours, minutes] = startTime.split(":").map(Number);
  const durationMinutes = duration === "30m" ? 30 : 60;

  const totalMinutes = hours * 60 + minutes + durationMinutes;
  const endHours = Math.floor(totalMinutes / 60);
  const endMinutes = totalMinutes % 60;

  return `${endHours.toString().padStart(2, "0")}:${endMinutes
    .toString()
    .padStart(2, "0")}`;
};
