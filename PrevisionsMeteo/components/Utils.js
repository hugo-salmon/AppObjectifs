export const getBackgroundImage = (iconCode) => {
    if (iconCode.includes("01")) {
      return require("../assets/clear_sky.jpeg");
    } else if (iconCode.includes("02")) {
      return require("../assets/few_clouds.webp");
    } else if (iconCode.includes("03")) {
      return require("../assets/scattered_clouds.jpeg");
    } else if (iconCode.includes("04")) {
      return require("../assets/broken_clouds.jpeg");
    } else if (iconCode.includes("09") || iconCode.includes("10")) {
      return require("../assets/rain.jpeg");
    } else if (iconCode.includes("11")) {
      return require("../assets/thunderstrom.jpeg");
    } else if (iconCode.includes("13")) {
      return require("../assets/snow.jpeg");
    } else {
      return require("../assets/mist.jpeg");
    }
  };
  
  export const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  
  export const getDayOfWeek = (day) => {
    const date = new Date(day);
    const options = { weekday: "long" };
    const dayOfWeek = date.toLocaleDateString("fr-FR", options).split(" ")[0];
    return capitalizeFirstLetter(dayOfWeek);
  };
  
  export const getHour = (hour) => {
    const date = new Date(hour);
    const options = { hour: "numeric", minute: "numeric", hour12: false };
    return date.toLocaleTimeString("fr-FR", options);
  };