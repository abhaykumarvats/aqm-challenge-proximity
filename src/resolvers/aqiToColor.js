export const aqiToColor = (aqi) => {
    if (aqi > 400) return 'darkread';
    else if (aqi > 300) return 'red';
    else if (aqi > 200) return 'darkorange';
    else if (aqi > 100) return 'gold';
    else if (aqi > 50) return 'yellowgreen';
    else return 'darkgreen';
};
