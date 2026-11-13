// @ts-nocheck
// src/squads_and_weather.ts
var CLIMATE_DATA = {
  "\u041C\u043E\u0441\u043A\u0432\u0430": {
    city: "\u041C\u043E\u0441\u043A\u0432\u0430",
    region: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0424\u041E",
    lat: 55.75,
    lon: 37.62,
    elevationM: 156,
    months: [
      { tDay: -4, tNight: -9.1, tMax: 3, tMin: -25, precipProb: 0.65, snowProb: 0.95, avgWind: 3.8, humidity: 85, windDir: "\u042E\u0417" },
      { tDay: -3.7, tNight: -9.8, tMax: 4, tMin: -24, precipProb: 0.6, snowProb: 0.9, avgWind: 3.9, humidity: 81, windDir: "\u042E\u0417" },
      { tDay: 2.6, tNight: -4.4, tMax: 14, tMin: -15, precipProb: 0.5, snowProb: 0.6, avgWind: 3.7, humidity: 74, windDir: "\u042E" },
      { tDay: 11.3, tNight: 2.1, tMax: 24, tMin: -5, precipProb: 0.45, snowProb: 0.1, avgWind: 3.4, humidity: 65, windDir: "\u0421\u0417" },
      { tDay: 18.6, tNight: 8.1, tMax: 29, tMin: 0, precipProb: 0.42, snowProb: 0, avgWind: 3.1, humidity: 62, windDir: "\u0421" },
      { tDay: 22.1, tNight: 12.3, tMax: 32, tMin: 5, precipProb: 0.48, snowProb: 0, avgWind: 2.8, humidity: 68, windDir: "\u0421\u0417" },
      { tDay: 24.3, tNight: 14.8, tMax: 34, tMin: 8, precipProb: 0.47, snowProb: 0, avgWind: 2.6, humidity: 71, windDir: "\u0417" },
      { tDay: 22, tNight: 13, tMax: 32, tMin: 5, precipProb: 0.44, snowProb: 0, avgWind: 2.7, humidity: 74, windDir: "\u0417" },
      { tDay: 15.7, tNight: 8.2, tMax: 25, tMin: -1, precipProb: 0.5, snowProb: 0.02, avgWind: 3, humidity: 80, windDir: "\u042E\u0417" },
      { tDay: 8.7, tNight: 3, tMax: 18, tMin: -6, precipProb: 0.55, snowProb: 0.25, avgWind: 3.4, humidity: 83, windDir: "\u042E\u0417" },
      { tDay: 1.2, tNight: -2.9, tMax: 10, tMin: -14, precipProb: 0.62, snowProb: 0.7, avgWind: 3.8, humidity: 86, windDir: "\u042E\u0417" },
      { tDay: -3, tNight: -7.5, tMax: 4, tMin: -21, precipProb: 0.68, snowProb: 0.92, avgWind: 3.9, humidity: 87, windDir: "\u042E\u0417" }
    ]
  },
  "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433": {
    city: "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433",
    region: "\u0421\u0435\u0432\u0435\u0440\u043E-\u0417\u0430\u043F\u0430\u0434\u043D\u044B\u0439 \u0424\u041E",
    lat: 59.95,
    lon: 30.32,
    elevationM: 5,
    months: [
      { tDay: -3, tNight: -8, tMax: 4, tMin: -22, precipProb: 0.7, snowProb: 0.9, avgWind: 4.5, humidity: 86, windDir: "\u042E" },
      { tDay: -3, tNight: -8.5, tMax: 5, tMin: -23, precipProb: 0.65, snowProb: 0.85, avgWind: 4.3, humidity: 84, windDir: "\u042E\u0417" },
      { tDay: 1.8, tNight: -4.5, tMax: 12, tMin: -16, precipProb: 0.55, snowProb: 0.55, avgWind: 4.1, humidity: 78, windDir: "\u042E" },
      { tDay: 9.2, tNight: 1.5, tMax: 21, tMin: -6, precipProb: 0.48, snowProb: 0.15, avgWind: 3.8, humidity: 69, windDir: "\u0417" },
      { tDay: 16.3, tNight: 7.2, tMax: 28, tMin: 0, precipProb: 0.44, snowProb: 0.01, avgWind: 3.5, humidity: 66, windDir: "\u0417" },
      { tDay: 20.4, tNight: 12.1, tMax: 31, tMin: 6, precipProb: 0.5, snowProb: 0, avgWind: 3.3, humidity: 71, windDir: "\u0417" },
      { tDay: 23.2, tNight: 15, tMax: 33, tMin: 9, precipProb: 0.52, snowProb: 0, avgWind: 3.1, humidity: 76, windDir: "\u0417" },
      { tDay: 21, tNight: 13.5, tMax: 31, tMin: 6, precipProb: 0.55, snowProb: 0, avgWind: 3.3, humidity: 80, windDir: "\u0417" },
      { tDay: 15.1, tNight: 8.8, tMax: 23, tMin: 0, precipProb: 0.6, snowProb: 0.02, avgWind: 3.8, humidity: 83, windDir: "\u042E\u0417" },
      { tDay: 8.4, tNight: 3.6, tMax: 16, tMin: -5, precipProb: 0.65, snowProb: 0.2, avgWind: 4.1, humidity: 85, windDir: "\u042E" },
      { tDay: 2.3, tNight: -1.7, tMax: 9, tMin: -12, precipProb: 0.7, snowProb: 0.65, avgWind: 4.4, humidity: 87, windDir: "\u042E" },
      { tDay: -1.6, tNight: -6.1, tMax: 5, tMin: -19, precipProb: 0.72, snowProb: 0.88, avgWind: 4.6, humidity: 88, windDir: "\u042E" }
    ]
  },
  "\u041A\u0430\u0437\u0430\u043D\u044C": {
    city: "\u041A\u0430\u0437\u0430\u043D\u044C",
    region: "\u041F\u0440\u0438\u0432\u043E\u043B\u0436\u0441\u043A\u0438\u0439 \u0424\u041E",
    lat: 55.79,
    lon: 49.12,
    elevationM: 60,
    months: [
      { tDay: -7.2, tNight: -13.1, tMax: 2, tMin: -28, precipProb: 0.65, snowProb: 0.98, avgWind: 4.2, humidity: 84, windDir: "\u042E" },
      { tDay: -6.7, tNight: -13, tMax: 3, tMin: -27, precipProb: 0.58, snowProb: 0.95, avgWind: 4.1, humidity: 81, windDir: "\u042E" },
      { tDay: -0.2, tNight: -7, tMax: 12, tMin: -20, precipProb: 0.5, snowProb: 0.7, avgWind: 4, humidity: 76, windDir: "\u042E" },
      { tDay: 10.4, tNight: 1.5, tMax: 24, tMin: -8, precipProb: 0.46, snowProb: 0.15, avgWind: 3.8, humidity: 64, windDir: "\u0421" },
      { tDay: 19.4, tNight: 8.6, tMax: 30, tMin: -2, precipProb: 0.4, snowProb: 0.01, avgWind: 3.4, humidity: 57, windDir: "\u0421" },
      { tDay: 23.6, tNight: 13.3, tMax: 33, tMin: 5, precipProb: 0.45, snowProb: 0, avgWind: 3.1, humidity: 63, windDir: "\u0421\u0417" },
      { tDay: 25.5, tNight: 15.5, tMax: 35, tMin: 8, precipProb: 0.45, snowProb: 0, avgWind: 2.9, humidity: 66, windDir: "\u0421" },
      { tDay: 23, tNight: 13.2, tMax: 33, tMin: 4, precipProb: 0.43, snowProb: 0, avgWind: 3, humidity: 70, windDir: "\u0421" },
      { tDay: 16.3, tNight: 8.2, tMax: 26, tMin: -2, precipProb: 0.48, snowProb: 0.02, avgWind: 3.4, humidity: 77, windDir: "\u042E" },
      { tDay: 8.1, tNight: 1.9, tMax: 18, tMin: -8, precipProb: 0.56, snowProb: 0.3, avgWind: 3.9, humidity: 82, windDir: "\u042E" },
      { tDay: -0.5, tNight: -5, tMax: 8, tMin: -18, precipProb: 0.65, snowProb: 0.75, avgWind: 4.2, humidity: 86, windDir: "\u042E" },
      { tDay: -5.6, tNight: -11, tMax: 3, tMin: -25, precipProb: 0.68, snowProb: 0.95, avgWind: 4.3, humidity: 85, windDir: "\u042E" }
    ]
  },
  "\u041A\u0440\u0430\u0441\u043D\u043E\u0434\u0430\u0440": {
    city: "\u041A\u0440\u0430\u0441\u043D\u043E\u0434\u0430\u0440",
    region: "\u042E\u0436\u043D\u044B\u0439 \u0424\u041E",
    lat: 45.03,
    lon: 38.98,
    elevationM: 30,
    months: [
      { tDay: 4.6, tNight: -1.7, tMax: 15, tMin: -14, precipProb: 0.55, snowProb: 0.3, avgWind: 3.3, humidity: 82, windDir: "\u0421\u0412" },
      { tDay: 6.7, tNight: -1, tMax: 18, tMin: -12, precipProb: 0.5, snowProb: 0.25, avgWind: 3.4, humidity: 77, windDir: "\u0421\u0412" },
      { tDay: 12, tNight: 2.8, tMax: 24, tMin: -7, precipProb: 0.45, snowProb: 0.1, avgWind: 3.2, humidity: 72, windDir: "\u0421\u0412" },
      { tDay: 18.5, tNight: 7.9, tMax: 29, tMin: 0, precipProb: 0.4, snowProb: 0, avgWind: 2.8, humidity: 66, windDir: "\u042E\u0417" },
      { tDay: 24.2, tNight: 13, tMax: 33, tMin: 4, precipProb: 0.38, snowProb: 0, avgWind: 2.5, humidity: 64, windDir: "\u042E\u0417" },
      { tDay: 28.5, tNight: 17.2, tMax: 37, tMin: 9, precipProb: 0.35, snowProb: 0, avgWind: 2.3, humidity: 61, windDir: "\u042E\u0417" },
      { tDay: 31.6, tNight: 19.8, tMax: 39, tMin: 12, precipProb: 0.3, snowProb: 0, avgWind: 2.2, humidity: 58, windDir: "\u0421\u0412" },
      { tDay: 31.3, tNight: 19.1, tMax: 38, tMin: 10, precipProb: 0.28, snowProb: 0, avgWind: 2.2, humidity: 59, windDir: "\u0421\u0412" },
      { tDay: 25.4, tNight: 13.8, tMax: 34, tMin: 4, precipProb: 0.32, snowProb: 0, avgWind: 2.4, humidity: 67, windDir: "\u0421\u0412" },
      { tDay: 18.3, tNight: 8.4, tMax: 28, tMin: -2, precipProb: 0.38, snowProb: 0.02, avgWind: 2.6, humidity: 75, windDir: "\u0421\u0412" },
      { tDay: 11.2, tNight: 3.4, tMax: 22, tMin: -8, precipProb: 0.48, snowProb: 0.1, avgWind: 2.9, humidity: 81, windDir: "\u0421\u0412" },
      { tDay: 6.2, tNight: 0.1, tMax: 16, tMin: -11, precipProb: 0.52, snowProb: 0.22, avgWind: 3.1, humidity: 83, windDir: "\u0421\u0412" }
    ]
  },
  "\u0421\u043E\u0447\u0438": {
    city: "\u0421\u043E\u0447\u0438",
    region: "\u042E\u0436\u043D\u044B\u0439 \u0424\u041E (\u0441\u0443\u0431\u0442\u0440\u043E\u043F\u0438\u043A\u0438)",
    lat: 43.6,
    lon: 39.73,
    elevationM: 10,
    months: [
      { tDay: 10.2, tNight: 3.8, tMax: 19, tMin: -5, precipProb: 0.55, snowProb: 0.05, avgWind: 2.4, humidity: 74, windDir: "\u0421\u0412" },
      { tDay: 10.8, tNight: 3.7, tMax: 20, tMin: -4, precipProb: 0.5, snowProb: 0.04, avgWind: 2.5, humidity: 72, windDir: "\u0421\u0412" },
      { tDay: 13, tNight: 5.6, tMax: 23, tMin: -1, precipProb: 0.48, snowProb: 0.01, avgWind: 2.3, humidity: 73, windDir: "\u042E\u0417" },
      { tDay: 17, tNight: 9.3, tMax: 28, tMin: 3, precipProb: 0.4, snowProb: 0, avgWind: 2.1, humidity: 74, windDir: "\u042E\u0417" },
      { tDay: 21.5, tNight: 13.8, tMax: 31, tMin: 7, precipProb: 0.35, snowProb: 0, avgWind: 1.9, humidity: 76, windDir: "\u042E\u0417" },
      { tDay: 25.6, tNight: 18, tMax: 34, tMin: 12, precipProb: 0.32, snowProb: 0, avgWind: 1.8, humidity: 77, windDir: "\u042E\u0417" },
      { tDay: 28.4, tNight: 20.8, tMax: 36, tMin: 15, precipProb: 0.3, snowProb: 0, avgWind: 1.7, humidity: 76, windDir: "\u042E\u0417" },
      { tDay: 29.1, tNight: 21, tMax: 37, tMin: 14, precipProb: 0.3, snowProb: 0, avgWind: 1.7, humidity: 75, windDir: "\u042E\u0417" },
      { tDay: 25.2, tNight: 16.8, tMax: 33, tMin: 9, precipProb: 0.36, snowProb: 0, avgWind: 1.9, humidity: 74, windDir: "\u0421\u0412" },
      { tDay: 20.6, tNight: 12.6, tMax: 28, tMin: 4, precipProb: 0.44, snowProb: 0, avgWind: 2.1, humidity: 74, windDir: "\u0421\u0412" },
      { tDay: 15.8, tNight: 8.4, tMax: 24, tMin: 0, precipProb: 0.5, snowProb: 0.01, avgWind: 2.3, humidity: 73, windDir: "\u0421\u0412" },
      { tDay: 12, tNight: 5.5, tMax: 20, tMin: -3, precipProb: 0.54, snowProb: 0.03, avgWind: 2.4, humidity: 73, windDir: "\u0421\u0412" }
    ]
  },
  "\u0420\u043E\u0441\u0442\u043E\u0432-\u043D\u0430-\u0414\u043E\u043D\u0443": {
    city: "\u0420\u043E\u0441\u0442\u043E\u0432-\u043D\u0430-\u0414\u043E\u043D\u0443",
    region: "\u042E\u0436\u043D\u044B\u0439 \u0424\u041E",
    lat: 47.24,
    lon: 39.71,
    elevationM: 50,
    months: [
      { tDay: -0.5, tNight: -6, tMax: 11, tMin: -21, precipProb: 0.55, snowProb: 0.6, avgWind: 4.2, humidity: 84, windDir: "\u0412" },
      { tDay: 0.7, tNight: -5.4, tMax: 13, tMin: -19, precipProb: 0.5, snowProb: 0.55, avgWind: 4.4, humidity: 80, windDir: "\u0412" },
      { tDay: 7, tNight: -0.7, tMax: 20, tMin: -12, precipProb: 0.45, snowProb: 0.25, avgWind: 4.2, humidity: 73, windDir: "\u0412" },
      { tDay: 16.5, tNight: 6.5, tMax: 27, tMin: -2, precipProb: 0.4, snowProb: 0.02, avgWind: 3.7, humidity: 62, windDir: "\u0412" },
      { tDay: 23.2, tNight: 12.4, tMax: 32, tMin: 3, precipProb: 0.38, snowProb: 0, avgWind: 3.2, humidity: 58, windDir: "\u0412" },
      { tDay: 27.4, tNight: 16.5, tMax: 36, tMin: 8, precipProb: 0.36, snowProb: 0, avgWind: 2.9, humidity: 56, windDir: "\u0417" },
      { tDay: 30.1, tNight: 18.8, tMax: 38, tMin: 11, precipProb: 0.32, snowProb: 0, avgWind: 2.8, humidity: 53, windDir: "\u0412" },
      { tDay: 29.5, tNight: 18, tMax: 38, tMin: 9, precipProb: 0.3, snowProb: 0, avgWind: 2.9, humidity: 54, windDir: "\u0412" },
      { tDay: 23.3, tNight: 12.5, tMax: 33, tMin: 2, precipProb: 0.34, snowProb: 0, avgWind: 3.2, humidity: 62, windDir: "\u0412" },
      { tDay: 15.3, tNight: 6.6, tMax: 25, tMin: -4, precipProb: 0.4, snowProb: 0.05, avgWind: 3.6, humidity: 73, windDir: "\u0412" },
      { tDay: 6.8, tNight: 1, tMax: 18, tMin: -12, precipProb: 0.5, snowProb: 0.3, avgWind: 4, humidity: 82, windDir: "\u0412" },
      { tDay: 1.2, tNight: -4, tMax: 12, tMin: -17, precipProb: 0.54, snowProb: 0.5, avgWind: 4.2, humidity: 85, windDir: "\u0412" }
    ]
  },
  "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433": {
    city: "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433",
    region: "\u0423\u0440\u0430\u043B\u044C\u0441\u043A\u0438\u0439 \u0424\u041E",
    lat: 56.83,
    lon: 60.57,
    elevationM: 240,
    months: [
      { tDay: -9.5, tNight: -16.5, tMax: 2, tMin: -34, precipProb: 0.6, snowProb: 0.99, avgWind: 3.5, humidity: 79, windDir: "\u0417" },
      { tDay: -7.5, tNight: -15.5, tMax: 3, tMin: -32, precipProb: 0.52, snowProb: 0.98, avgWind: 3.4, humidity: 74, windDir: "\u0417" },
      { tDay: 0.5, tNight: -8, tMax: 13, tMin: -24, precipProb: 0.48, snowProb: 0.8, avgWind: 3.4, humidity: 66, windDir: "\u0417" },
      { tDay: 10.2, tNight: 0.5, tMax: 24, tMin: -12, precipProb: 0.45, snowProb: 0.3, avgWind: 3.5, humidity: 56, windDir: "\u0417" },
      { tDay: 18.5, tNight: 7.2, tMax: 29, tMin: -4, precipProb: 0.42, snowProb: 0.05, avgWind: 3.3, humidity: 54, windDir: "\u0417" },
      { tDay: 23.2, tNight: 12.5, tMax: 33, tMin: 2, precipProb: 0.48, snowProb: 0, avgWind: 3, humidity: 63, windDir: "\u0417" },
      { tDay: 24.8, tNight: 14.8, tMax: 35, tMin: 6, precipProb: 0.5, snowProb: 0, avgWind: 2.8, humidity: 68, windDir: "\u0417" },
      { tDay: 21.6, tNight: 12.4, tMax: 32, tMin: 2, precipProb: 0.48, snowProb: 0, avgWind: 2.8, humidity: 72, windDir: "\u0417" },
      { tDay: 15, tNight: 7, tMax: 26, tMin: -3, precipProb: 0.5, snowProb: 0.05, avgWind: 3.1, humidity: 75, windDir: "\u0417" },
      { tDay: 6.8, tNight: 0.2, tMax: 18, tMin: -12, precipProb: 0.58, snowProb: 0.45, avgWind: 3.4, humidity: 77, windDir: "\u0417" },
      { tDay: -2.8, tNight: -8.5, tMax: 6, tMin: -24, precipProb: 0.62, snowProb: 0.88, avgWind: 3.5, humidity: 80, windDir: "\u0417" },
      { tDay: -8, tNight: -14.5, tMax: 2, tMin: -31, precipProb: 0.62, snowProb: 0.99, avgWind: 3.5, humidity: 80, windDir: "\u0417" }
    ]
  },
  "\u0421\u0430\u043C\u0430\u0440\u0430": {
    city: "\u0421\u0430\u043C\u0430\u0440\u0430",
    region: "\u041F\u0440\u0438\u0432\u043E\u043B\u0436\u0441\u043A\u0438\u0439 \u0424\u041E",
    lat: 53.2,
    lon: 50.15,
    elevationM: 50,
    months: [
      { tDay: -6.8, tNight: -13, tMax: 2, tMin: -29, precipProb: 0.6, snowProb: 0.98, avgWind: 4.1, humidity: 83, windDir: "\u042E" },
      { tDay: -6, tNight: -12.5, tMax: 3, tMin: -28, precipProb: 0.52, snowProb: 0.95, avgWind: 4, humidity: 80, windDir: "\u042E" },
      { tDay: 1, tNight: -6, tMax: 14, tMin: -19, precipProb: 0.46, snowProb: 0.65, avgWind: 3.9, humidity: 75, windDir: "\u042E" },
      { tDay: 12.8, tNight: 3.5, tMax: 26, tMin: -7, precipProb: 0.42, snowProb: 0.12, avgWind: 3.7, humidity: 61, windDir: "\u0421" },
      { tDay: 21.5, tNight: 10.8, tMax: 32, tMin: -1, precipProb: 0.38, snowProb: 0, avgWind: 3.3, humidity: 54, windDir: "\u0421" },
      { tDay: 25.8, tNight: 15.2, tMax: 35, tMin: 5, precipProb: 0.42, snowProb: 0, avgWind: 3, humidity: 59, windDir: "\u0421\u0417" },
      { tDay: 27.6, tNight: 17.2, tMax: 37, tMin: 8, precipProb: 0.4, snowProb: 0, avgWind: 2.8, humidity: 62, windDir: "\u0421" },
      { tDay: 25.5, tNight: 15.2, tMax: 36, tMin: 5, precipProb: 0.36, snowProb: 0, avgWind: 2.9, humidity: 64, windDir: "\u0421" },
      { tDay: 18.8, tNight: 10, tMax: 29, tMin: -1, precipProb: 0.42, snowProb: 0.01, avgWind: 3.2, humidity: 71, windDir: "\u042E" },
      { tDay: 9.8, tNight: 3.2, tMax: 20, tMin: -8, precipProb: 0.5, snowProb: 0.25, avgWind: 3.7, humidity: 78, windDir: "\u042E" },
      { tDay: 0.8, tNight: -3.8, tMax: 9, tMin: -17, precipProb: 0.58, snowProb: 0.7, avgWind: 4.1, humidity: 84, windDir: "\u042E" },
      { tDay: -5, tNight: -10.5, tMax: 3, tMin: -26, precipProb: 0.62, snowProb: 0.95, avgWind: 4.2, humidity: 84, windDir: "\u042E" }
    ]
  },
  "\u041A\u0430\u043B\u0438\u043D\u0438\u043D\u0433\u0440\u0430\u0434": {
    city: "\u041A\u0430\u043B\u0438\u043D\u0438\u043D\u0433\u0440\u0430\u0434",
    region: "\u0421\u0435\u0432\u0435\u0440\u043E-\u0417\u0430\u043F\u0430\u0434\u043D\u044B\u0439 \u0424\u041E (\u0411\u0430\u043B\u0442\u0438\u043A\u0430)",
    lat: 54.71,
    lon: 20.51,
    elevationM: 15,
    months: [
      { tDay: 1, tNight: -3.8, tMax: 9, tMin: -17, precipProb: 0.65, snowProb: 0.6, avgWind: 4.8, humidity: 85, windDir: "\u042E\u0417" },
      { tDay: 1.8, tNight: -3.5, tMax: 11, tMin: -16, precipProb: 0.58, snowProb: 0.55, avgWind: 4.6, humidity: 82, windDir: "\u042E\u0417" },
      { tDay: 6.2, tNight: -0.5, tMax: 17, tMin: -10, precipProb: 0.5, snowProb: 0.3, avgWind: 4.2, humidity: 76, windDir: "\u0417" },
      { tDay: 12.8, tNight: 4, tMax: 24, tMin: -4, precipProb: 0.44, snowProb: 0.05, avgWind: 3.8, humidity: 68, windDir: "\u0417" },
      { tDay: 18.4, tNight: 8.8, tMax: 28, tMin: 1, precipProb: 0.42, snowProb: 0, avgWind: 3.4, humidity: 67, windDir: "\u0417" },
      { tDay: 21.5, tNight: 12.5, tMax: 31, tMin: 5, precipProb: 0.48, snowProb: 0, avgWind: 3.3, humidity: 71, windDir: "\u0417" },
      { tDay: 23.8, tNight: 15, tMax: 33, tMin: 8, precipProb: 0.5, snowProb: 0, avgWind: 3.2, humidity: 74, windDir: "\u0417" },
      { tDay: 23.4, tNight: 14.6, tMax: 33, tMin: 7, precipProb: 0.52, snowProb: 0, avgWind: 3.3, humidity: 77, windDir: "\u0417" },
      { tDay: 18.5, tNight: 10.5, tMax: 26, tMin: 2, precipProb: 0.55, snowProb: 0, avgWind: 3.8, humidity: 81, windDir: "\u042E\u0417" },
      { tDay: 12.5, tNight: 5.8, tMax: 20, tMin: -3, precipProb: 0.6, snowProb: 0.08, avgWind: 4.3, humidity: 84, windDir: "\u042E\u0417" },
      { tDay: 6.5, tNight: 1.8, tMax: 13, tMin: -9, precipProb: 0.66, snowProb: 0.4, avgWind: 4.7, humidity: 86, windDir: "\u042E\u0417" },
      { tDay: 2.5, tNight: -1.8, tMax: 9, tMin: -14, precipProb: 0.68, snowProb: 0.55, avgWind: 4.9, humidity: 86, windDir: "\u042E\u0417" }
    ]
  },
  "\u041A\u0440\u0430\u0441\u043D\u043E\u044F\u0440\u0441\u043A": {
    city: "\u041A\u0440\u0430\u0441\u043D\u043E\u044F\u0440\u0441\u043A",
    region: "\u0421\u0438\u0431\u0438\u0440\u0441\u043A\u0438\u0439 \u0424\u041E",
    lat: 56.01,
    lon: 92.87,
    elevationM: 160,
    months: [
      { tDay: -11.5, tNight: -19.5, tMax: 2, tMin: -38, precipProb: 0.55, snowProb: 1, avgWind: 2.6, humidity: 76, windDir: "\u042E\u0417" },
      { tDay: -8.5, tNight: -17.5, tMax: 4, tMin: -36, precipProb: 0.45, snowProb: 0.99, avgWind: 2.7, humidity: 71, windDir: "\u042E\u0417" },
      { tDay: -0.5, tNight: -10, tMax: 15, tMin: -27, precipProb: 0.42, snowProb: 0.85, avgWind: 3, humidity: 62, windDir: "\u042E\u0417" },
      { tDay: 8.5, tNight: -1.5, tMax: 25, tMin: -16, precipProb: 0.4, snowProb: 0.4, avgWind: 3.4, humidity: 52, windDir: "\u042E\u0417" },
      { tDay: 17.2, tNight: 5.5, tMax: 30, tMin: -5, precipProb: 0.44, snowProb: 0.08, avgWind: 3.2, humidity: 51, windDir: "\u042E\u0417" },
      { tDay: 23.5, tNight: 11.8, tMax: 34, tMin: 2, precipProb: 0.5, snowProb: 0, avgWind: 2.7, humidity: 62, windDir: "\u0417" },
      { tDay: 25.5, tNight: 14.5, tMax: 36, tMin: 5, precipProb: 0.52, snowProb: 0, avgWind: 2.4, humidity: 70, windDir: "\u0417" },
      { tDay: 22.2, tNight: 11.8, tMax: 33, tMin: 1, precipProb: 0.5, snowProb: 0, avgWind: 2.4, humidity: 74, windDir: "\u0417" },
      { tDay: 15, tNight: 5.6, tMax: 26, tMin: -4, precipProb: 0.48, snowProb: 0.08, avgWind: 2.8, humidity: 72, windDir: "\u042E\u0417" },
      { tDay: 6.2, tNight: -1.5, tMax: 20, tMin: -16, precipProb: 0.52, snowProb: 0.55, avgWind: 3, humidity: 72, windDir: "\u042E\u0417" },
      { tDay: -4.5, tNight: -11.5, tMax: 8, tMin: -28, precipProb: 0.58, snowProb: 0.95, avgWind: 2.9, humidity: 77, windDir: "\u042E\u0417" },
      { tDay: -10.5, tNight: -17.8, tMax: 1, tMin: -37, precipProb: 0.58, snowProb: 1, avgWind: 2.7, humidity: 77, windDir: "\u042E\u0417" }
    ]
  },
  "\u0425\u0430\u0431\u0430\u0440\u043E\u0432\u0441\u043A": {
    city: "\u0425\u0430\u0431\u0430\u0440\u043E\u0432\u0441\u043A",
    region: "\u0414\u0430\u043B\u044C\u043D\u0435\u0432\u043E\u0441\u0442\u043E\u0447\u043D\u044B\u0439 \u0424\u041E",
    lat: 48.48,
    lon: 135.07,
    elevationM: 70,
    months: [
      { tDay: -15.5, tNight: -23.5, tMax: -3, tMin: -38, precipProb: 0.35, snowProb: 1, avgWind: 3.6, humidity: 74, windDir: "\u042E\u0417" },
      { tDay: -10.2, tNight: -19.5, tMax: 2, tMin: -34, precipProb: 0.32, snowProb: 1, avgWind: 3.5, humidity: 69, windDir: "\u042E\u0417" },
      { tDay: -1, tNight: -10.5, tMax: 14, tMin: -25, precipProb: 0.38, snowProb: 0.85, avgWind: 3.9, humidity: 62, windDir: "\u042E\u0417" },
      { tDay: 10.5, tNight: 0.5, tMax: 24, tMin: -12, precipProb: 0.44, snowProb: 0.3, avgWind: 4.4, humidity: 55, windDir: "\u0421\u0412" },
      { tDay: 18.8, tNight: 7.8, tMax: 30, tMin: -2, precipProb: 0.48, snowProb: 0.02, avgWind: 3.8, humidity: 57, windDir: "\u0421\u0412" },
      { tDay: 24.2, tNight: 14, tMax: 34, tMin: 5, precipProb: 0.52, snowProb: 0, avgWind: 3.2, humidity: 69, windDir: "\u042E" },
      { tDay: 27, tNight: 18.2, tMax: 36, tMin: 9, precipProb: 0.55, snowProb: 0, avgWind: 2.8, humidity: 79, windDir: "\u042E" },
      { tDay: 25.2, tNight: 16.5, tMax: 34, tMin: 6, precipProb: 0.54, snowProb: 0, avgWind: 2.8, humidity: 80, windDir: "\u042E" },
      { tDay: 19.5, tNight: 9.5, tMax: 28, tMin: -1, precipProb: 0.46, snowProb: 0.01, avgWind: 3.2, humidity: 73, windDir: "\u042E" },
      { tDay: 10.2, tNight: 0.8, tMax: 22, tMin: -11, precipProb: 0.42, snowProb: 0.35, avgWind: 3.8, humidity: 65, windDir: "\u042E\u0417" },
      { tDay: -3.5, tNight: -11.8, tMax: 10, tMin: -25, precipProb: 0.4, snowProb: 0.9, avgWind: 4, humidity: 68, windDir: "\u042E\u0417" },
      { tDay: -13.5, tNight: -21, tMax: -1, tMin: -35, precipProb: 0.38, snowProb: 1, avgWind: 3.8, humidity: 73, windDir: "\u042E\u0417" }
    ]
  },
  "\u041C\u0430\u0445\u0430\u0447\u043A\u0430\u043B\u0430": {
    city: "\u041C\u0430\u0445\u0430\u0447\u043A\u0430\u043B\u0430",
    region: "\u0421\u0435\u0432\u0435\u0440\u043E-\u041A\u0430\u0432\u043A\u0430\u0437\u0441\u043A\u0438\u0439 \u0424\u041E (\u041A\u0430\u0441\u043F\u0438\u0439\u0441\u043A\u043E\u0435 \u043C\u043E\u0440\u0435)",
    lat: 42.98,
    lon: 47.5,
    elevationM: -20,
    months: [
      { tDay: 4.2, tNight: -0.8, tMax: 15, tMin: -13, precipProb: 0.42, snowProb: 0.35, avgWind: 4.3, humidity: 82, windDir: "\u0421\u0417" },
      { tDay: 4.5, tNight: -0.6, tMax: 16, tMin: -12, precipProb: 0.4, snowProb: 0.3, avgWind: 4.4, humidity: 80, windDir: "\u0421\u0417" },
      { tDay: 8.8, tNight: 2.8, tMax: 22, tMin: -6, precipProb: 0.36, snowProb: 0.15, avgWind: 4.1, humidity: 76, windDir: "\u042E\u0412" },
      { tDay: 15, tNight: 7.8, tMax: 27, tMin: 0, precipProb: 0.32, snowProb: 0, avgWind: 3.8, humidity: 71, windDir: "\u042E\u0412" },
      { tDay: 21.8, tNight: 13.8, tMax: 32, tMin: 5, precipProb: 0.3, snowProb: 0, avgWind: 3.5, humidity: 68, windDir: "\u042E\u0412" },
      { tDay: 27.2, tNight: 18.8, tMax: 36, tMin: 10, precipProb: 0.28, snowProb: 0, avgWind: 3.3, humidity: 63, windDir: "\u042E\u0412" },
      { tDay: 30.2, tNight: 22, tMax: 39, tMin: 14, precipProb: 0.25, snowProb: 0, avgWind: 3.3, humidity: 62, windDir: "\u042E\u0412" },
      { tDay: 29.8, tNight: 21.6, tMax: 38, tMin: 13, precipProb: 0.25, snowProb: 0, avgWind: 3.4, humidity: 64, windDir: "\u042E\u0412" },
      { tDay: 24.5, tNight: 16.8, tMax: 34, tMin: 6, precipProb: 0.3, snowProb: 0, avgWind: 3.7, humidity: 70, windDir: "\u0421\u0417" },
      { tDay: 17.8, tNight: 11, tMax: 28, tMin: 1, precipProb: 0.38, snowProb: 0.02, avgWind: 4, humidity: 77, windDir: "\u0421\u0417" },
      { tDay: 10.8, tNight: 5.2, tMax: 21, tMin: -5, precipProb: 0.42, snowProb: 0.15, avgWind: 4.3, humidity: 81, windDir: "\u0421\u0417" },
      { tDay: 6, tNight: 1.2, tMax: 17, tMin: -10, precipProb: 0.44, snowProb: 0.28, avgWind: 4.4, humidity: 82, windDir: "\u0421\u0417" }
    ]
  },
  "\u0413\u0440\u043E\u0437\u043D\u044B\u0439": {
    city: "\u0413\u0440\u043E\u0437\u043D\u044B\u0439",
    region: "\u0421\u0435\u0432\u0435\u0440\u043E-\u041A\u0430\u0432\u043A\u0430\u0437\u0441\u043A\u0438\u0439 \u0424\u041E",
    lat: 43.32,
    lon: 45.69,
    elevationM: 130,
    months: [
      { tDay: 2.5, tNight: -5, tMax: 14, tMin: -18, precipProb: 0.45, snowProb: 0.45, avgWind: 2.8, humidity: 84, windDir: "\u0412" },
      { tDay: 4, tNight: -4.2, tMax: 16, tMin: -16, precipProb: 0.42, snowProb: 0.4, avgWind: 2.9, humidity: 81, windDir: "\u0412" },
      { tDay: 10.5, tNight: 0.5, tMax: 23, tMin: -9, precipProb: 0.4, snowProb: 0.18, avgWind: 2.8, humidity: 74, windDir: "\u0412" },
      { tDay: 18, tNight: 6.2, tMax: 29, tMin: -1, precipProb: 0.38, snowProb: 0.01, avgWind: 2.6, humidity: 65, windDir: "\u0417" },
      { tDay: 24.2, tNight: 12, tMax: 34, tMin: 3, precipProb: 0.36, snowProb: 0, avgWind: 2.3, humidity: 62, windDir: "\u0417" },
      { tDay: 29, tNight: 16.5, tMax: 38, tMin: 8, precipProb: 0.34, snowProb: 0, avgWind: 2.1, humidity: 58, windDir: "\u0417" },
      { tDay: 31.8, tNight: 19, tMax: 40, tMin: 11, precipProb: 0.3, snowProb: 0, avgWind: 2, humidity: 55, windDir: "\u0412" },
      { tDay: 31.2, tNight: 18.2, tMax: 39, tMin: 9, precipProb: 0.28, snowProb: 0, avgWind: 2.1, humidity: 57, windDir: "\u0412" },
      { tDay: 25.5, tNight: 13, tMax: 35, tMin: 3, precipProb: 0.32, snowProb: 0, avgWind: 2.3, humidity: 66, windDir: "\u0412" },
      { tDay: 17.8, tNight: 6.8, tMax: 28, tMin: -3, precipProb: 0.38, snowProb: 0.05, avgWind: 2.5, humidity: 76, windDir: "\u0412" },
      { tDay: 9.8, tNight: 1, tMax: 20, tMin: -11, precipProb: 0.42, snowProb: 0.2, avgWind: 2.7, humidity: 83, windDir: "\u0412" },
      { tDay: 4, tNight: -3.2, tMax: 15, tMin: -15, precipProb: 0.46, snowProb: 0.38, avgWind: 2.8, humidity: 85, windDir: "\u0412" }
    ]
  },
  "\u0412\u043E\u0440\u043E\u043D\u0435\u0436": {
    city: "\u0412\u043E\u0440\u043E\u043D\u0435\u0436",
    region: "\u0427\u0435\u0440\u043D\u043E\u0437\u0435\u043C\u044C\u0435",
    lat: 51.67,
    lon: 39.2,
    elevationM: 150,
    months: [
      { tDay: -3.5, tNight: -8.8, tMax: 5, tMin: -24, precipProb: 0.6, snowProb: 0.9, avgWind: 4.1, humidity: 84, windDir: "\u042E\u0417" },
      { tDay: -3, tNight: -8.6, tMax: 6, tMin: -23, precipProb: 0.54, snowProb: 0.85, avgWind: 4, humidity: 81, windDir: "\u042E\u0417" },
      { tDay: 3.2, tNight: -3.5, tMax: 16, tMin: -15, precipProb: 0.48, snowProb: 0.5, avgWind: 3.9, humidity: 74, windDir: "\u042E" },
      { tDay: 13.6, tNight: 3.8, tMax: 26, tMin: -5, precipProb: 0.44, snowProb: 0.08, avgWind: 3.6, humidity: 62, windDir: "\u042E" },
      { tDay: 21, tNight: 9.8, tMax: 31, tMin: 0, precipProb: 0.4, snowProb: 0, avgWind: 3.2, humidity: 56, windDir: "\u0421" },
      { tDay: 24.8, tNight: 13.8, tMax: 34, tMin: 4, precipProb: 0.44, snowProb: 0, avgWind: 2.9, humidity: 61, windDir: "\u0417" },
      { tDay: 27, tNight: 15.8, tMax: 37, tMin: 7, precipProb: 0.42, snowProb: 0, avgWind: 2.7, humidity: 62, windDir: "\u0417" },
      { tDay: 25.8, tNight: 14.4, tMax: 36, tMin: 5, precipProb: 0.38, snowProb: 0, avgWind: 2.8, humidity: 63, windDir: "\u0417" },
      { tDay: 19.5, tNight: 9.6, tMax: 30, tMin: -1, precipProb: 0.44, snowProb: 0.01, avgWind: 3.1, humidity: 71, windDir: "\u042E" },
      { tDay: 11.2, tNight: 3.8, tMax: 22, tMin: -7, precipProb: 0.52, snowProb: 0.2, avgWind: 3.6, humidity: 80, windDir: "\u042E\u0417" },
      { tDay: 2.8, tNight: -2, tMax: 12, tMin: -15, precipProb: 0.58, snowProb: 0.65, avgWind: 4, humidity: 86, windDir: "\u042E\u0417" },
      { tDay: -2, tNight: -6.8, tMax: 6, tMin: -21, precipProb: 0.62, snowProb: 0.88, avgWind: 4.2, humidity: 86, windDir: "\u042E\u0417" }
    ]
  },
  "\u0412\u043E\u043B\u0433\u043E\u0433\u0440\u0430\u0434": {
    city: "\u0412\u043E\u043B\u0433\u043E\u0433\u0440\u0430\u0434",
    region: "\u042E\u0436\u043D\u044B\u0439 \u0424\u041E (\u041F\u043E\u0432\u043E\u043B\u0436\u044C\u0435)",
    lat: 48.73,
    lon: 44.55,
    elevationM: 40,
    months: [
      { tDay: -3, tNight: -9.5, tMax: 8, tMin: -27, precipProb: 0.5, snowProb: 0.85, avgWind: 4.5, humidity: 84, windDir: "\u0412" },
      { tDay: -2.5, tNight: -9.2, tMax: 9, tMin: -26, precipProb: 0.44, snowProb: 0.8, avgWind: 4.4, humidity: 81, windDir: "\u0412" },
      { tDay: 4.5, tNight: -3, tMax: 18, tMin: -18, precipProb: 0.4, snowProb: 0.45, avgWind: 4.2, humidity: 73, windDir: "\u0412" },
      { tDay: 15.5, tNight: 5, tMax: 28, tMin: -6, precipProb: 0.36, snowProb: 0.05, avgWind: 3.8, humidity: 58, windDir: "\u0412" },
      { tDay: 23.5, tNight: 11.8, tMax: 33, tMin: 0, precipProb: 0.34, snowProb: 0, avgWind: 3.4, humidity: 51, windDir: "\u0412" },
      { tDay: 28.5, tNight: 16.5, tMax: 38, tMin: 6, precipProb: 0.36, snowProb: 0, avgWind: 3.1, humidity: 50, windDir: "\u0417" },
      { tDay: 31.2, tNight: 19, tMax: 41, tMin: 9, precipProb: 0.32, snowProb: 0, avgWind: 2.9, humidity: 47, windDir: "\u0412" },
      { tDay: 30, tNight: 17.8, tMax: 40, tMin: 7, precipProb: 0.3, snowProb: 0, avgWind: 3, humidity: 48, windDir: "\u0412" },
      { tDay: 23, tNight: 11.5, tMax: 34, tMin: 0, precipProb: 0.34, snowProb: 0, avgWind: 3.3, humidity: 58, windDir: "\u0412" },
      { tDay: 14, tNight: 5.2, tMax: 25, tMin: -7, precipProb: 0.4, snowProb: 0.1, avgWind: 3.7, humidity: 71, windDir: "\u0412" },
      { tDay: 4.8, tNight: -1, tMax: 15, tMin: -17, precipProb: 0.48, snowProb: 0.5, avgWind: 4.1, humidity: 82, windDir: "\u0412" },
      { tDay: -1.5, tNight: -6.8, tMax: 10, tMin: -23, precipProb: 0.52, snowProb: 0.8, avgWind: 4.4, humidity: 85, windDir: "\u0412" }
    ]
  },
  "\u042F\u0440\u043E\u0441\u043B\u0430\u0432\u043B\u044C": {
    city: "\u042F\u0440\u043E\u0441\u043B\u0430\u0432\u043B\u044C",
    region: "\u0417\u043E\u043B\u043E\u0442\u043E\u0435 \u041A\u043E\u043B\u044C\u0446\u043E",
    lat: 57.63,
    lon: 39.87,
    elevationM: 100,
    months: [
      { tDay: -5.5, tNight: -11.5, tMax: 2, tMin: -28, precipProb: 0.65, snowProb: 0.98, avgWind: 3.7, humidity: 86, windDir: "\u042E\u0417" },
      { tDay: -5, tNight: -12, tMax: 3, tMin: -27, precipProb: 0.6, snowProb: 0.95, avgWind: 3.8, humidity: 82, windDir: "\u042E\u0417" },
      { tDay: 1.5, tNight: -6.2, tMax: 13, tMin: -18, precipProb: 0.52, snowProb: 0.65, avgWind: 3.7, humidity: 76, windDir: "\u042E" },
      { tDay: 10.5, tNight: 1, tMax: 23, tMin: -7, precipProb: 0.46, snowProb: 0.15, avgWind: 3.4, humidity: 66, windDir: "\u0421" },
      { tDay: 18, tNight: 7.2, tMax: 29, tMin: -2, precipProb: 0.42, snowProb: 0.01, avgWind: 3.1, humidity: 62, windDir: "\u0421" },
      { tDay: 21.8, tNight: 11.5, tMax: 32, tMin: 3, precipProb: 0.48, snowProb: 0, avgWind: 2.8, humidity: 68, windDir: "\u0421\u0417" },
      { tDay: 24, tNight: 14, tMax: 34, tMin: 6, precipProb: 0.47, snowProb: 0, avgWind: 2.6, humidity: 73, windDir: "\u0417" },
      { tDay: 21.5, tNight: 12, tMax: 32, tMin: 3, precipProb: 0.45, snowProb: 0, avgWind: 2.7, humidity: 77, windDir: "\u0417" },
      { tDay: 15, tNight: 7.2, tMax: 25, tMin: -2, precipProb: 0.5, snowProb: 0.02, avgWind: 3, humidity: 82, windDir: "\u042E\u0417" },
      { tDay: 7.8, tNight: 2, tMax: 17, tMin: -8, precipProb: 0.58, snowProb: 0.28, avgWind: 3.4, humidity: 85, windDir: "\u042E\u0417" },
      { tDay: 0.2, tNight: -4, tMax: 8, tMin: -17, precipProb: 0.66, snowProb: 0.75, avgWind: 3.8, humidity: 88, windDir: "\u042E\u0417" },
      { tDay: -4.2, tNight: -9.5, tMax: 3, tMin: -24, precipProb: 0.7, snowProb: 0.95, avgWind: 3.8, humidity: 88, windDir: "\u042E\u0417" }
    ]
  }
};
function getOrCreateCityClimate(city, lat = 55, lon = 45) {
  const normCity = (city || "\u041C\u043E\u0441\u043A\u0432\u0430").trim();
  if (CLIMATE_DATA[normCity]) return CLIMATE_DATA[normCity];
  const isSouth = lat < 48;
  const isSiberia = lon > 65;
  const isFarEast = lon > 120;
  const isNorth = lat > 58;
  let base = CLIMATE_DATA["\u041C\u043E\u0441\u043A\u0432\u0430"];
  if (isSouth) base = CLIMATE_DATA["\u0420\u043E\u0441\u0442\u043E\u0432-\u043D\u0430-\u0414\u043E\u043D\u0443"];
  if (isSiberia) base = CLIMATE_DATA["\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433"];
  if (isFarEast) base = CLIMATE_DATA["\u0425\u0430\u0431\u0430\u0440\u043E\u0432\u0441\u043A"];
  if (isNorth) base = CLIMATE_DATA["\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433"];
  const shifted = {
    city: normCity,
    region: "\u0420\u0435\u0433\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u043B\u0438\u0433\u0430",
    lat,
    lon,
    elevationM: 100,
    months: base.months.map((m) => ({ ...m }))
  };
  CLIMATE_DATA[normCity] = shifted;
  return shifted;
}
function seededRandom(seed2) {
  let h = 2166136261;
  for (let i = 0; i < seed2.length; i++) {
    h ^= seed2.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) % 1e4 / 1e4;
}
function calculateMatchWeather(cityName, dateStr, timeStr = "17:00") {
  const city = (cityName || "\u041C\u043E\u0441\u043A\u0432\u0430").trim();
  const climate = getOrCreateCityClimate(city);
  const d = new Date(dateStr || "2026-09-15");
  const monthIdx = isNaN(d.getMonth()) ? 8 : d.getMonth();
  const day = isNaN(d.getDate()) ? 15 : d.getDate();
  const mNorm = climate.months[monthIdx] || climate.months[8];
  const hour = parseInt((timeStr || "17:00").slice(0, 2), 10) || 17;
  const daySeed = `${city}_${dateStr}_${day}`;
  const rTemp = (seededRandom(daySeed + "_t") - 0.5) * 4;
  const rPpt = seededRandom(daySeed + "_ppt");
  const rWind = (seededRandom(daySeed + "_w") - 0.5) * 1.8;
  const rWindDir = seededRandom(daySeed + "_wd");
  let baseTemp;
  if (hour >= 13 && hour <= 17) {
    baseTemp = mNorm.tDay + 1.2;
  } else if (hour >= 18 && hour <= 21) {
    baseTemp = mNorm.tDay - (mNorm.tDay - mNorm.tNight) * 0.35;
  } else if (hour >= 22 || hour <= 6) {
    baseTemp = mNorm.tNight;
  } else {
    baseTemp = mNorm.tNight + (mNorm.tDay - mNorm.tNight) * 0.5;
  }
  const finalTemp = Math.round(baseTemp + rTemp);
  const feelsLike = Math.round(finalTemp - (mNorm.avgWind > 4.5 ? 2 : 0) + (finalTemp > 25 ? 1 : 0));
  const windSpeed = Math.max(1, Math.round((mNorm.avgWind + rWind) * 10) / 10);
  const DIRS = ["\u0421", "\u0421\u0412", "\u0412", "\u042E\u0412", "\u042E", "\u042E\u0417", "\u0417", "\u0421\u0417"];
  const windDir = DIRS[Math.floor(rWindDir * DIRS.length)] || mNorm.windDir;
  const humidity = Math.min(98, Math.max(40, Math.round(mNorm.humidity + (rTemp < 0 ? 5 : -4))));
  const pressure = Math.round(750 + (seededRandom(daySeed + "_p") - 0.5) * 16);
  let condition = "\u044F\u0441\u043D\u043E";
  let icon = "\u2600\uFE0F";
  let precip = "\u0431\u0435\u0437 \u043E\u0441\u0430\u0434\u043A\u043E\u0432";
  if (rPpt < mNorm.precipProb * 0.4) {
    if (finalTemp <= 0 || finalTemp <= 2 && mNorm.snowProb > 0.4) {
      condition = finalTemp <= -4 ? "\u0441\u043D\u0435\u0433\u043E\u043F\u0430\u0434" : "\u043C\u043E\u043A\u0440\u044B\u0439 \u0441\u043D\u0435\u0433";
      icon = "\u2744\uFE0F";
      precip = condition;
    } else {
      condition = rPpt < mNorm.precipProb * 0.15 ? "\u043B\u0438\u0432\u043D\u0435\u0432\u044B\u0439 \u0434\u043E\u0436\u0434\u044C" : "\u0434\u043E\u0436\u0434\u044C";
      icon = "\u{1F327}\uFE0F";
      precip = condition;
    }
  } else if (rPpt < mNorm.precipProb) {
    if (finalTemp <= 0) {
      condition = "\u043D\u0435\u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0441\u043D\u0435\u0433";
      icon = "\u{1F328}\uFE0F";
      precip = "\u043D\u0435\u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0441\u043D\u0435\u0433";
    } else {
      condition = "\u0432\u0440\u0435\u043C\u0435\u043D\u0430\u043C\u0438 \u043D\u0435\u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0434\u043E\u0436\u0434\u044C";
      icon = "\u{1F326}\uFE0F";
      precip = "\u043C\u0435\u043B\u043A\u0438\u0439 \u0434\u043E\u0436\u0434\u044C";
    }
  } else if (rPpt < 0.65) {
    condition = "\u043E\u0431\u043B\u0430\u0447\u043D\u043E \u0441 \u043F\u0440\u043E\u044F\u0441\u043D\u0435\u043D\u0438\u044F\u043C\u0438";
    icon = "\u26C5";
  } else if (rPpt < 0.85) {
    condition = "\u043F\u0435\u0440\u0435\u043C\u0435\u043D\u043D\u0430\u044F \u043E\u0431\u043B\u0430\u0447\u043D\u043E\u0441\u0442\u044C";
    icon = "\u{1F324}\uFE0F";
  } else {
    condition = "\u043C\u0430\u043B\u043E\u043E\u0431\u043B\u0430\u0447\u043D\u043E, \u0441\u043E\u043B\u043D\u0435\u0447\u043D\u043E";
    icon = "\u2600\uFE0F";
  }
  let pitch = "\u0433\u0430\u0437\u043E\u043D \u0432 \u043E\u0442\u043B\u0438\u0447\u043D\u043E\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438";
  if (finalTemp <= -5) {
    pitch = "\u0433\u0430\u0437\u043E\u043D \u043F\u043E\u0434\u043C\u0451\u0440\u0437\u0448\u0438\u0439, \u043F\u043E\u0434\u043E\u0433\u0440\u0435\u0432 \u043F\u043E\u043B\u044F \u0432\u043A\u043B\u044E\u0447\u0451\u043D \u043D\u0430 \u043F\u043E\u043B\u043D\u0443\u044E \u043C\u043E\u0449\u043D\u043E\u0441\u0442\u044C";
  } else if (finalTemp <= 0 && precip.includes("\u0441\u043D\u0435\u0433")) {
    pitch = "\u0433\u0430\u0437\u043E\u043D \u0437\u0430\u0441\u043D\u0435\u0436\u0435\u043D, \u0440\u0430\u0437\u043C\u0435\u0442\u043A\u0430 \u043E\u0447\u0438\u0449\u0435\u043D\u0430, \u0432\u043A\u043B\u044E\u0447\u0451\u043D \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043F\u043E\u0434\u043E\u0433\u0440\u0435\u0432";
  } else if (precip.includes("\u0434\u043E\u0436\u0434\u044C") || precip.includes("\u043B\u0438\u0432\u0435\u043D\u044C")) {
    pitch = "\u0433\u0430\u0437\u043E\u043D \u043C\u043E\u043A\u0440\u044B\u0439, \u0431\u044B\u0441\u0442\u0440\u044B\u0439 \u043E\u0442\u0441\u043A\u043E\u043A \u0438 \u0441\u043A\u043E\u043B\u044C\u0436\u0435\u043D\u0438\u0435 \u043C\u044F\u0447\u0430";
  } else if (finalTemp >= 28) {
    pitch = "\u0433\u0430\u0437\u043E\u043D \u0441\u0443\u0445\u043E\u0439, \u0436\u0430\u0440\u043A\u0430\u044F \u043F\u043E\u0433\u043E\u0434\u0430, \u043F\u0440\u0435\u0434\u0443\u0441\u043C\u043E\u0442\u0440\u0435\u043D\u044B \u043F\u0430\u0443\u0437\u044B \u043D\u0430 \u0432\u043E\u0434\u043E\u043F\u043E\u0439";
  } else if (finalTemp < 8) {
    pitch = "\u0433\u0430\u0437\u043E\u043D \u043F\u043B\u043E\u0442\u043D\u044B\u0439, \u0442\u0435\u043C\u043F\u0435\u0440\u0430\u0442\u0443\u0440\u0430 \u043A\u043E\u043C\u0444\u043E\u0440\u0442\u043D\u0430 \u0434\u043B\u044F \u0432\u044B\u0441\u043E\u043A\u043E\u0433\u043E \u0442\u0435\u043C\u043F\u0430";
  }
  const sign = finalTemp > 0 ? `+${finalTemp}` : `${finalTemp}`;
  const text = `${sign}\xB0C, ${condition}, \u0432\u0435\u0442\u0435\u0440 ${windSpeed} \u043C/\u0441 (${windDir}), \u0432\u043B\u0430\u0436\u043D\u043E\u0441\u0442\u044C ${humidity}%; ${pitch}`;
  const short = `${icon} ${sign}\xB0C, ${condition}`;
  return {
    city,
    date: dateStr,
    time: timeStr,
    temp: finalTemp,
    feelsLike,
    condition,
    icon,
    wind: windSpeed,
    windDir,
    humidity,
    pressure,
    precipitation: precip,
    pitch,
    text,
    short,
    isStatistical: true
  };
}
var STYLES_GK = [
  "\u041F\u0440\u044B\u0433\u0443\u0447\u0438\u0439 \u0433\u043E\u043B\u043A\u0438\u043F\u0435\u0440 \u0441 \u043C\u043E\u043B\u043D\u0438\u0435\u043D\u043E\u0441\u043D\u043E\u0439 \u0440\u0435\u0430\u043A\u0446\u0438\u0435\u0439 \u043D\u0430 \u043B\u0438\u043D\u0438\u0438 \u0432\u043E\u0440\u043E\u0442 \u0438 \u0441\u043C\u0435\u043B\u044B\u043C\u0438 \u0432\u044B\u0445\u043E\u0434\u0430\u043C\u0438",
  "\u0425\u043B\u0430\u0434\u043D\u043E\u043A\u0440\u043E\u0432\u043D\u044B\u0439 \u0441\u0442\u0440\u0430\u0436 \u0432\u043E\u0440\u043E\u0442, \u0443\u0432\u0435\u0440\u0435\u043D\u043D\u043E \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442 \u043E\u0431\u043E\u0440\u043E\u043D\u043E\u0439 \u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u0443\u0435\u0442 \u043D\u0430 \u0432\u044B\u0445\u043E\u0434\u0430\u0445",
  "\u0412\u0440\u0430\u0442\u0430\u0440\u044C \u0441\u043E\u0432\u0440\u0435\u043C\u0435\u043D\u043D\u043E\u0439 \u0448\u043A\u043E\u043B\u044B \u0441 \u043F\u0440\u0435\u0432\u043E\u0441\u0445\u043E\u0434\u043D\u044B\u043C \u043F\u0435\u0440\u0432\u044B\u043C \u043F\u0430\u0441\u043E\u043C \u043E\u0431\u0435\u0438\u043C\u0438 \u043D\u043E\u0433\u0430\u043C\u0438",
  "\u041E\u043F\u044B\u0442\u043D\u044B\u0439 \u0433\u043E\u043B\u043A\u0438\u043F\u0435\u0440, \u0441\u0438\u043B\u0451\u043D \u0432 \u043E\u0442\u0440\u0430\u0436\u0435\u043D\u0438\u0438 \u043F\u0435\u043D\u0430\u043B\u044C\u0442\u0438 \u0438 \u0447\u0442\u0435\u043D\u0438\u0438 \u0442\u0440\u0430\u0435\u043A\u0442\u043E\u0440\u0438\u0439 \u0434\u0430\u043B\u044C\u043D\u0438\u0445 \u0443\u0434\u0430\u0440\u043E\u0432"
];
var STYLES_DEF = [
  "\u041C\u043E\u0449\u043D\u044B\u0439 \u0446\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A, \u0434\u043E\u043C\u0438\u043D\u0438\u0440\u0443\u0435\u0442 \u0432 \u0432\u0435\u0440\u0445\u043E\u0432\u044B\u0445 \u0435\u0434\u0438\u043D\u043E\u0431\u043E\u0440\u0441\u0442\u0432\u0430\u0445 \u0438 \u0447\u0438\u0441\u0442\u0438\u0442 \u0448\u0442\u0440\u0430\u0444\u043D\u0443\u044E",
  "\u0426\u0435\u043F\u043A\u0438\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A-\u0432\u043E\u043B\u043D\u043E\u0440\u0435\u0437, \u0441\u0438\u043B\u0451\u043D \u0432 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u043E\u043F\u0435\u043A\u0435 \u0438 \u043E\u0442\u0431\u043E\u0440\u0435 \u0432 \u043F\u043E\u0434\u043A\u0430\u0442\u0435",
  "\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u043D\u043E\u0439 \u043B\u0430\u0442\u0435\u0440\u0430\u043B\u044C \u0441 \u043D\u0435\u0438\u0441\u0441\u044F\u043A\u0430\u0435\u043C\u043E\u0439 \u0432\u044B\u043D\u043E\u0441\u043B\u0438\u0432\u043E\u0441\u0442\u044C\u044E \u0438 \u043F\u0440\u0438\u0446\u0435\u043B\u044C\u043D\u044B\u043C\u0438 \u043D\u0430\u0432\u0435\u0441\u0430\u043C\u0438 \u0432 \u0448\u0442\u0440\u0430\u0444\u043D\u0443\u044E",
  "\u0423\u043C\u043D\u044B\u0439 \u043F\u043E\u0437\u0438\u0446\u0438\u043E\u043D\u043D\u044B\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A \u0441 \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u043C \u0442\u0430\u0439\u043C\u0438\u043D\u0433\u043E\u043C \u043F\u0435\u0440\u0435\u0445\u0432\u0430\u0442\u043E\u0432 \u0438 \u0434\u0438\u0430\u0433\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0435\u0439"
];
var STYLES_MID = [
  "\u0414\u0438\u0441\u043F\u0435\u0442\u0447\u0435\u0440 \u0446\u0435\u043D\u0442\u0440\u0430 \u043F\u043E\u043B\u044F \u0441 \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u044B\u043C \u0432\u0438\u0434\u0435\u043D\u0438\u0435\u043C \u0438\u0433\u0440\u044B \u0438 \u0440\u0430\u0437\u0440\u0435\u0437\u0430\u044E\u0449\u0438\u043C\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0447\u0430\u043C\u0438",
  "\u0416\u0435\u0441\u0442\u043A\u0438\u0439 \u043E\u043F\u043E\u0440\u043D\u0438\u043A-\u0440\u0430\u0437\u0440\u0443\u0448\u0438\u0442\u0435\u043B\u044C, \u0432\u044B\u0438\u0433\u0440\u044B\u0432\u0430\u0435\u0442 \u043F\u043E\u0434\u0431\u043E\u0440\u044B \u0438 \u043F\u0435\u0440\u0435\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0437\u043E\u043D\u044B \u043A\u043E\u043D\u0442\u0440\u0430\u0442\u0430\u043A",
  "\u0422\u0435\u0445\u043D\u0438\u0447\u043D\u044B\u0439 \u043F\u043B\u0435\u0439\u043C\u0435\u0439\u043A\u0435\u0440 \u0441 \u0434\u0440\u0438\u0431\u043B\u0438\u043D\u0433\u043E\u043C \u043D\u0430 \u043D\u043E\u0441\u043E\u0432\u043E\u043C \u043F\u043B\u0430\u0442\u043A\u0435 \u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u043C \u043A\u0440\u0443\u0447\u0451\u043D\u044B\u043C \u0443\u0434\u0430\u0440\u043E\u043C",
  "\u0414\u0438\u043D\u0430\u043C\u0438\u0447\u043D\u044B\u0439 \u043F\u043E\u043B\u0443\u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A box-to-box, \u043F\u0430\u0448\u0435\u0442 \u043E\u0442 \u0448\u0442\u0440\u0430\u0444\u043D\u043E\u0439 \u0434\u043E \u0448\u0442\u0440\u0430\u0444\u043D\u043E\u0439 \u0431\u0435\u0437 \u0443\u0441\u0442\u0430\u043B\u0438"
];
var STYLES_FWD = [
  "\u0412\u0437\u0440\u044B\u0432\u043D\u043E\u0439 \u0434\u0440\u0438\u0431\u043B\u0451\u0440 \u043D\u0430 \u0444\u043B\u0430\u043D\u0433\u0435, \u0440\u0430\u0437\u0440\u044B\u0432\u0430\u0435\u0442 \u043E\u0431\u043E\u0440\u043E\u043D\u0443 \u043D\u0430 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438 \u0438 \u0441\u043C\u0435\u0449\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0434 \u0443\u0434\u0430\u0440",
  "\u041A\u043B\u0430\u0441\u0441\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0442\u0430\u0440\u0430\u043D\u043D\u044B\u0439 \u0444\u043E\u0440\u0432\u0430\u0440\u0434, \u043F\u0440\u043E\u0434\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A\u043E\u0432 \u0438 \u0431\u0435\u0437\u0443\u043F\u0440\u0435\u0447\u043D\u043E \u0438\u0433\u0440\u0430\u0435\u0442 \u0433\u043E\u043B\u043E\u0432\u043E\u0439",
  "\u0425\u0438\u0442\u0440\u044B\u0439 \u043D\u0430\u043A\u043E\u043D\u0435\u0447\u043D\u0438\u043A \u0430\u0442\u0430\u043A \u0441 \u0433\u043E\u043B\u0435\u0432\u044B\u043C \u0447\u0443\u0442\u044C\u0451\u043C \u043D\u0430 \u0434\u043E\u0431\u0438\u0432\u0430\u043D\u0438\u044F\u0445 \u0438 \u0440\u0438\u043A\u043E\u0448\u0435\u0442\u0430\u0445",
  "\u042E\u0440\u043A\u0438\u0439 \u0432\u0442\u043E\u0440\u043E\u0439 \u043D\u0430\u043F\u0430\u0434\u0430\u044E\u0449\u0438\u0439, \u0441\u0442\u044F\u0433\u0438\u0432\u0430\u0435\u0442 \u043D\u0430 \u0441\u0435\u0431\u044F \u043E\u043F\u0435\u043A\u0443\u043D\u043E\u0432 \u0438 \u0441\u043E\u0437\u0434\u0430\u0451\u0442 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0435 \u0437\u043E\u043D\u044B"
];
function generateFullSquad(team2) {
  const comp = team2.comp;
  const isMedia = comp === "media" || comp === "media_div2";
  const isFNL = comp === "fnl";
  const is2LA = comp === "2la_gold" || comp === "2la_silver";
  const is2LB = comp.startsWith("2lb");
  const isRPL = comp === "rpl";
  let baseRating = 63;
  if (isRPL) baseRating = 76;
  else if (isFNL) baseRating = 71;
  else if (is2LA) baseRating = 66;
  else if (is2LB) baseRating = 60;
  else if (isMedia) baseRating = 67;
  const SQUAD_PLAN = [
    { pos: "\u0412\u0420", role: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0433\u043E\u043B\u043A\u0438\u043F\u0435\u0440" },
    { pos: "\u0412\u0420", role: "\u0420\u0435\u0437\u0435\u0440\u0432\u043D\u044B\u0439 \u0433\u043E\u043B\u043A\u0438\u043F\u0435\u0440" },
    { pos: "\u0426\u0417", role: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A (\u0432\u0435\u0434\u0443\u0449\u0438\u0439)" },
    { pos: "\u0426\u0417", role: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A (\u0430\u0442\u043B\u0435\u0442)" },
    { pos: "\u0426\u0417", role: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A (\u043F\u0435\u0440\u0432\u044B\u0439 \u043F\u0430\u0441)" },
    { pos: "\u041B\u0417", role: "\u041B\u0435\u0432\u044B\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A (\u043B\u0430\u0442\u0435\u0440\u0430\u043B\u044C)" },
    { pos: "\u041F\u0417", role: "\u041F\u0440\u0430\u0432\u044B\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A (\u043B\u0430\u0442\u0435\u0440\u0430\u043B\u044C)" },
    { pos: "\u041B\u0417", role: "\u041A\u0440\u0430\u0439\u043D\u0438\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A \u0440\u043E\u0442\u0430\u0446\u0438\u0438" },
    { pos: "\u041E\u041F", role: "\u041E\u043F\u043E\u0440\u043D\u044B\u0439 \u043F\u043E\u043B\u0443\u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A (\u0432\u043E\u043B\u043D\u043E\u0440\u0435\u0437)" },
    { pos: "\u041E\u041F", role: "\u041E\u043F\u043E\u0440\u043D\u044B\u0439 \u043F\u043E\u043B\u0443\u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A \u0440\u043E\u0442\u0430\u0446\u0438\u0438" },
    { pos: "\u0426\u041F", role: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u043B\u0443\u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A (\u0431\u043E\u043A\u0441-\u0442\u0443-\u0431\u043E\u043A\u0441)" },
    { pos: "\u0426\u041F", role: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u043B\u0443\u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A (\u0434\u0438\u0441\u043F\u0435\u0442\u0447\u0435\u0440)" },
    { pos: "\u0410\u041F", role: "\u0410\u0442\u0430\u043A\u0443\u044E\u0449\u0438\u0439 \u043F\u043E\u043B\u0443\u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A (\u043F\u043B\u0435\u0439\u043C\u0435\u0439\u043A\u0435\u0440)" },
    { pos: "\u0426\u041F", role: "\u041F\u043E\u043B\u0443\u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A \u0440\u0435\u0437\u0435\u0440\u0432\u0430" },
    { pos: "\u0410\u041F", role: "\u0410\u0442\u0430\u043A\u0443\u044E\u0449\u0438\u0439 \u0445\u0430\u0432\u0431\u0435\u043A" },
    { pos: "\u041B\u0412", role: "\u041B\u0435\u0432\u044B\u0439 \u0432\u0438\u043D\u0433\u0435\u0440" },
    { pos: "\u041F\u0412", role: "\u041F\u0440\u0430\u0432\u044B\u0439 \u0432\u0438\u043D\u0433\u0435\u0440" },
    { pos: "\u0426\u0424", role: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u043D\u0430\u043F\u0430\u0434\u0430\u044E\u0449\u0438\u0439 (\u0441\u0442\u0440\u0430\u0439\u043A\u0435\u0440)" },
    { pos: "\u0426\u0424", role: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u043D\u0430\u043F\u0430\u0434\u0430\u044E\u0449\u0438\u0439 (\u0434\u0436\u043E\u043A\u0435\u0440)" },
    { pos: "\u041F\u0412", role: "\u041A\u0440\u0430\u0439\u043D\u0438\u0439 \u043D\u0430\u043F\u0430\u0434\u0430\u044E\u0449\u0438\u0439 \u0440\u043E\u0442\u0430\u0446\u0438\u0438" }
  ];
  const FIRST_NAMES = [
    "\u0410\u043B\u0435\u043A\u0441\u0435\u0439",
    "\u0414\u043C\u0438\u0442\u0440\u0438\u0439",
    "\u0421\u0435\u0440\u0433\u0435\u0439",
    "\u0410\u043D\u0434\u0440\u0435\u0439",
    "\u0418\u0432\u0430\u043D",
    "\u041C\u0430\u043A\u0441\u0438\u043C",
    "\u041C\u0438\u0445\u0430\u0438\u043B",
    "\u0410\u0440\u0442\u0451\u043C",
    "\u041D\u0438\u043A\u0438\u0442\u0430",
    "\u0412\u043B\u0430\u0434\u0438\u0441\u043B\u0430\u0432",
    "\u0414\u0430\u043D\u0438\u0438\u043B",
    "\u0418\u043B\u044C\u044F",
    "\u0420\u043E\u043C\u0430\u043D",
    "\u041A\u0438\u0440\u0438\u043B\u043B",
    "\u0415\u0433\u043E\u0440",
    "\u041C\u0430\u0442\u0432\u0435\u0439",
    "\u0410\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440",
    "\u0414\u0435\u043D\u0438\u0441",
    "\u0422\u0438\u043C\u043E\u0444\u0435\u0439",
    "\u041A\u043E\u043D\u0441\u0442\u0430\u043D\u0442\u0438\u043D",
    "\u041F\u0430\u0432\u0435\u043B",
    "\u0413\u0435\u043E\u0440\u0433\u0438\u0439",
    "\u042F\u0440\u043E\u0441\u043B\u0430\u0432",
    "\u0410\u0440\u0442\u0443\u0440"
  ];
  const LAST_NAMES = [
    "\u0421\u043C\u0438\u0440\u043D\u043E\u0432",
    "\u0418\u0432\u0430\u043D\u043E\u0432",
    "\u041A\u0443\u0437\u043D\u0435\u0446\u043E\u0432",
    "\u041F\u043E\u043F\u043E\u0432",
    "\u0412\u0430\u0441\u0438\u043B\u044C\u0435\u0432",
    "\u041F\u0435\u0442\u0440\u043E\u0432",
    "\u0421\u043E\u043A\u043E\u043B\u043E\u0432",
    "\u041C\u0438\u0445\u0430\u0439\u043B\u043E\u0432",
    "\u041D\u043E\u0432\u0438\u043A\u043E\u0432",
    "\u0424\u0435\u0434\u043E\u0440\u043E\u0432",
    "\u041C\u043E\u0440\u043E\u0437\u043E\u0432",
    "\u0412\u043E\u043B\u043A\u043E\u0432",
    "\u0410\u043B\u0435\u043A\u0441\u0435\u0435\u0432",
    "\u041B\u0435\u0431\u0435\u0434\u0435\u0432",
    "\u0421\u0435\u043C\u0435\u043D\u043E\u0432",
    "\u0415\u0433\u043E\u0440\u043E\u0432",
    "\u041F\u0430\u0432\u043B\u043E\u0432",
    "\u041A\u043E\u0437\u043B\u043E\u0432",
    "\u0421\u0442\u0435\u043F\u0430\u043D\u043E\u0432",
    "\u041D\u0438\u043A\u043E\u043B\u0430\u0435\u0432",
    "\u041E\u0440\u043B\u043E\u0432",
    "\u0410\u043D\u0434\u0440\u0435\u0435\u0432",
    "\u041C\u0430\u043A\u0430\u0440\u043E\u0432",
    "\u041D\u0438\u043A\u0438\u0442\u0438\u043D",
    "\u0417\u0430\u0445\u0430\u0440\u043E\u0432",
    "\u0417\u0430\u0439\u0446\u0435\u0432",
    "\u0421\u043E\u043B\u043E\u0432\u044C\u0435\u0432",
    "\u0411\u043E\u0440\u0438\u0441\u043E\u0432",
    "\u042F\u043A\u043E\u0432\u043B\u0435\u0432",
    "\u0412\u043E\u0440\u043E\u0431\u044C\u0435\u0432",
    "\u0413\u0440\u0438\u0433\u043E\u0440\u044C\u0435\u0432",
    "\u0420\u043E\u043C\u0430\u043D\u043E\u0432",
    "\u0412\u043E\u0440\u043E\u043D\u0438\u043D",
    "\u041C\u0435\u0434\u0432\u0435\u0434\u0435\u0432",
    "\u0422\u0430\u0440\u0430\u0441\u043E\u0432",
    "\u0411\u0435\u043B\u043E\u0432",
    "\u041A\u043E\u043C\u0430\u0440\u043E\u0432",
    "\u0424\u0440\u043E\u043B\u043E\u0432",
    "\u0421\u0430\u0432\u0435\u043B\u044C\u0435\u0432",
    "\u041C\u0430\u0440\u043A\u043E\u0432"
  ];
  const MEDIA_ROSTERS = {
    "2Drots": [
      { name: "\u0414\u043C\u0438\u0442\u0440\u0438\u0439 \u0421\u044B\u0447\u0451\u0432", pos: "\u0412\u0420", style: "\u0413\u0435\u043F\u0430\u0440\u0434 \u043D\u0430 \u043B\u0435\u043D\u0442\u043E\u0447\u043A\u0435, \u043B\u0435\u0433\u0435\u043D\u0434\u0430 \u043C\u0435\u0434\u0438\u0430\u0444\u0443\u0442\u0431\u043E\u043B\u0430, \u0442\u0430\u0449\u0438\u0442 \u043F\u0435\u043D\u0430\u043B\u044C\u0442\u0438", rating: 78 },
      { name: "\u042D\u0434\u0430\u043C\u0441 \u0421\u043A\u043B\u044F\u0440", pos: "\u041B\u0417", style: "\u0421\u043A\u043E\u0440\u043E\u0441\u0442\u043D\u043E\u0439 \u043A\u0440\u0430\u0439\u043D\u0438\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A \u0441 \u0436\u0435\u043B\u0435\u0437\u043D\u044B\u043C \u043E\u0442\u0431\u043E\u0440\u043E\u043C", rating: 74 },
      { name: "\u0418\u043B\u044C\u044F \u0421\u0430\u043B\u044C\u043D\u0438\u043A\u043E\u0432 (\u0421\u0430\u043B\u043B\u044F)", pos: "\u0426\u0417", style: "\u0421\u0442\u043E\u043B\u043F \u043E\u0431\u043E\u0440\u043E\u043D\u044B \xAB\u0434\u0440\u043E\u0442\u043E\u0432\xBB, \u0432\u0435\u0440\u0445\u043E\u0432\u044B\u0435 \u0434\u0443\u044D\u043B\u0438 \u0437\u0430 \u043D\u0438\u043C", rating: 75 },
      { name: "\u0411\u043E\u0433\u0434\u0430\u043D \u0422\u0438\u043C\u043E\u0448\u0435\u043D\u043A\u043E", pos: "\u0426\u0417", style: "\u041D\u0435\u0443\u0441\u0442\u0443\u043F\u0447\u0438\u0432\u044B\u0439 \u0441\u0442\u043E\u043F\u043F\u0435\u0440 \u0441 \u043E\u0442\u043B\u0438\u0447\u043D\u044B\u043C \u0434\u043B\u0438\u043D\u043D\u044B\u043C \u043F\u0430\u0441\u043E\u043C", rating: 73 },
      { name: "\u0414\u0435\u043D\u0438\u0441 \u0413\u0443\u0434\u0430\u0435\u0432", pos: "\u041F\u0417", style: "\u041A\u0430\u043F\u0438\u0442\u0430\u043D, \u043B\u0438\u0434\u0435\u0440 \u0440\u0430\u0437\u0434\u0435\u0432\u0430\u043B\u043A\u0438, \u043F\u0440\u043E\u0440\u044B\u0432\u044B \u043F\u043E \u043F\u0440\u0430\u0432\u043E\u0439 \u0431\u0440\u043E\u0432\u043A\u0435", rating: 76 },
      { name: "\u0412\u043B\u0430\u0434\u0438\u0441\u043B\u0430\u0432 \u041E\u0441\u043B\u043E\u043D\u043E\u0432\u0441\u043A\u0438\u0439 (\u0421\u043B\u043E\u043D)", pos: "\u0426\u041F", style: "\u041C\u043E\u0437\u0433 \u0446\u0435\u043D\u0442\u0440\u0430 \u043F\u043E\u043B\u044F, \u0432\u0438\u0434\u0438\u0442 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u044B\u0435 \u0437\u043E\u043D\u044B \u0438 \u0440\u0435\u0436\u0435\u0442 \u043B\u0438\u043D\u0438\u0438", rating: 78 },
      { name: "\u0410\u043D\u0442\u043E\u043D \u041A\u043B\u043E\u0447\u043A\u043E\u0432 (\u041C\u0430\u043D\u043D\u0430)", pos: "\u0410\u041F", style: "\u0414\u0440\u0438\u0431\u043B\u0438\u043D\u0433 \u043D\u0430 \u0444\u0435\u043D\u043E\u043C\u0435\u043D\u0430\u043B\u044C\u043D\u043E\u0439 \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u0438, \u0442\u0435\u0445\u043D\u0438\u043A\u0430 \u0438 \u043F\u0430\u0441", rating: 77 },
      { name: "\u0421\u0442\u0430\u043D\u0438\u0441\u043B\u0430\u0432 \u041C\u0430\u043D\u0430\u0435\u0432", pos: "\u041E\u041F", style: "\u0412\u043E\u043B\u043D\u043E\u0440\u0435\u0437, \u0432\u044B\u0436\u0438\u0433\u0430\u0435\u0442 \u0446\u0435\u043D\u0442\u0440 \u043F\u043E\u043B\u044F \u0438 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442 \u0430\u0442\u0430\u043A\u0438", rating: 74 },
      { name: "\u0410\u0440\u0442\u0435\u043C \u041D\u0442\u0443\u043C\u0431\u0430 (\u041F\u0430\u043D\u0442\u0435\u0440\u0430)", pos: "\u041B\u0412", style: "\u0412\u0437\u0440\u044B\u0432\u043D\u0430\u044F \u0441\u0442\u0430\u0440\u0442\u043E\u0432\u0430\u044F \u0441\u043A\u043E\u0440\u043E\u0441\u0442\u044C, \u043E\u0431\u044B\u0433\u0440\u044B\u0448 \u043E\u0434\u0438\u043D \u0432 \u043E\u0434\u0438\u043D", rating: 76 },
      { name: "\u0410\u043B\u0435\u043A\u0441\u0435\u0439 \u041A\u0443\u0440\u0437\u0435\u043D\u0435\u0432 (\u041A\u0443\u0440\u0437)", pos: "\u0426\u0424", style: "\u041D\u0430\u043A\u043E\u043D\u0435\u0447\u043D\u0438\u043A \u0430\u0442\u0430\u043A, \u0445\u043B\u0430\u0434\u043D\u043E\u043A\u0440\u043E\u0432\u043D\u0430\u044F \u0440\u0435\u0430\u043B\u0438\u0437\u0430\u0446\u0438\u044F \u0432 \u0448\u0442\u0440\u0430\u0444\u043D\u043E\u0439", rating: 76 },
      { name: "\u0414\u0430\u043D\u0438\u0438\u043B \u041A\u0440\u0430\u043F\u0438\u0432\u043D\u0438\u043A\u043E\u0432 (\u041A\u0440\u0430\u043F)", pos: "\u0410\u041F", style: "\u041A\u0443\u0434\u0435\u0441\u043D\u0438\u043A \u043C\u044F\u0447\u0430, \u044D\u043F\u0430\u0442\u0430\u0436\u043D\u044B\u0439 \u0434\u0440\u0438\u0431\u043B\u0438\u043D\u0433 \u0438 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u044B", rating: 75 },
      { name: "\u0413\u0430\u0443\u0447\u043E", pos: "\u0426\u0424", style: "\u0411\u0440\u0430\u0437\u0438\u043B\u044C\u0441\u043A\u0438\u0439 \u0444\u043E\u0440\u0432\u0430\u0440\u0434, \u043F\u043B\u0430\u0441\u0442\u0438\u043A\u0430, \u0443\u0434\u0430\u0440 \u0441 \u043B\u0451\u0442\u0430 \u0438 \u0438\u0433\u0440\u0430 \u043A\u043E\u0440\u043F\u0443\u0441\u043E\u043C", rating: 77 }
    ],
    "\u0410\u043C\u043A\u0430\u043B": [
      { name: "\u041C\u0430\u043A\u0441\u0438\u043C \u0428\u0432\u0430\u0433\u0438\u0440\u0435\u0432", pos: "\u0412\u0420", style: "\u041E\u043F\u044B\u0442\u043D\u0435\u0439\u0448\u0438\u0439 \u0432\u0440\u0430\u0442\u0430\u0440\u044C, \u043D\u0430\u0434\u0451\u0436\u043D\u043E\u0441\u0442\u044C \u0438 \u0431\u0435\u0437\u0443\u043F\u0440\u0435\u0447\u043D\u044B\u0439 \u0432\u0432\u043E\u0434 \u043C\u044F\u0447\u0430", rating: 76 },
      { name: "\u0418\u043B\u044C\u044F \u0428\u0443\u0440\u044B\u0433\u0438\u043D", pos: "\u0426\u0417", style: "\u0411\u0435\u0441\u043A\u043E\u043C\u043F\u0440\u043E\u043C\u0438\u0441\u0441\u043D\u044B\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A, \u043A\u0430\u043F\u0438\u0442\u0430\u043D\u0441\u043A\u043E\u0435 \u0441\u043F\u043E\u043A\u043E\u0439\u0441\u0442\u0432\u0438\u0435", rating: 75 },
      { name: "\u0410\u0440\u0441\u0435\u043D\u0438\u0439 \u041B\u0435\u0432\u0448\u0443\u043A", pos: "\u041B\u0417", style: "\u041E\u0441\u0442\u0440\u044B\u0435 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F \u0432 \u0430\u0442\u0430\u043A\u0443, \u0433\u043E\u043B\u0435\u0432\u044B\u0435 \u043A\u0440\u043E\u0441\u0441\u044B", rating: 74 },
      { name: "\u042D\u0440\u0438\u043A \u0427\u0435\u043A\u0430", pos: "\u041E\u041F", style: "\u0426\u0435\u043F\u043A\u0438\u0439 \u0440\u0430\u0437\u0440\u0443\u0448\u0438\u0442\u0435\u043B\u044C \u0430\u0442\u0430\u043A \u0441\u043E\u043F\u0435\u0440\u043D\u0438\u043A\u0430, \u0436\u0435\u0441\u0442\u043A\u0438\u0439 \u043E\u0442\u0431\u043E\u0440", rating: 74 },
      { name: "\u041C\u0438\u0445\u0430\u0438\u043B \u041F\u0440\u043E\u043A\u043E\u043F\u044C\u0435\u0432 (\u041F\u0440\u043E\u043A\u043E\u043F)", pos: "\u0410\u041F", style: "\u0413\u0435\u043D\u0438\u0439 \u0440\u0430\u0434\u0438\u043E\u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u044B\u0445 \u043F\u0435\u0440\u0435\u0434\u0430\u0447 \u0438 \u0441\u043A\u0440\u044B\u0442\u044B\u0445 \u043F\u0430\u0441\u043E\u0432", rating: 78 },
      { name: "\u0410\u043D\u0442\u043E\u043D \u0427\u0443\u0436\u043E\u0439", pos: "\u0426\u041F", style: "\u0414\u0432\u0438\u0433\u0430\u0442\u0435\u043B\u044C \u043A\u043E\u043C\u0430\u043D\u0434\u044B, \u043C\u043E\u0449\u043D\u044B\u0439 \u0443\u0434\u0430\u0440 \u0441\u043E \u0441\u0440\u0435\u0434\u043D\u0435\u0439 \u0434\u0438\u0441\u0442\u0430\u043D\u0446\u0438\u0438", rating: 75 },
      { name: "\u0421\u0442\u0435\u043F\u0430\u043D \u041A\u043E\u0441\u0442\u044E\u043A\u043E\u0432", pos: "\u0426\u0424", style: "\u0421\u0442\u0440\u0430\u0439\u043A\u0435\u0440 \u0442\u0430\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0442\u0438\u043F\u0430, \u0431\u043E\u0440\u0435\u0442\u0441\u044F \u0437\u0430 \u043A\u0430\u0436\u0434\u044B\u0439 \u043C\u044F\u0447", rating: 76 },
      { name: "\u0410\u043D\u0430\u0442\u043E\u043B\u0438\u0439 \u041A\u0430\u0442\u0440\u0438\u0447", pos: "\u041F\u0412", style: "\u042D\u043A\u0441-\u0438\u0433\u0440\u043E\u043A \u0420\u041F\u041B, \u0442\u043E\u043D\u043A\u0430\u044F \u0442\u0435\u0445\u043D\u0438\u043A\u0430 \u0438 \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u0443\u0434\u0430\u0440 \u043B\u0435\u0432\u043E\u0439", rating: 77 },
      { name: "\u0410\u043B\u0435\u043A\u0441\u0435\u0439 \u0413\u0430\u0441\u0438\u043B\u0438\u043D", pos: "\u0426\u0424", style: "\u0427\u0435\u043C\u043F\u0438\u043E\u043D \u0415\u0432\u0440\u043E\u043F\u044B U-17, \u0433\u043E\u043B\u0435\u0432\u043E\u0435 \u0447\u0443\u0442\u044C\u0435 \u0438 \u0432\u044B\u0431\u043E\u0440 \u043F\u043E\u0437\u0438\u0446\u0438\u0438", rating: 77 },
      { name: "\u0412\u0430\u0441\u0438\u043B\u0438\u0439 \u041C\u0430\u0432\u0440\u0438\u043D", pos: "\u0426\u041F", style: "\u0425\u0430\u0440\u0438\u0437\u043C\u0430\u0442\u0438\u0447\u043D\u044B\u0439 \u043B\u0438\u0434\u0435\u0440, \u0431\u043E\u0435\u0446, \u0434\u0430\u043B\u044C\u043D\u044F\u044F \u0430\u0440\u0442\u0438\u043B\u043B\u0435\u0440\u0438\u044F", rating: 75 }
    ],
    "\u0411\u0440\u043E\u0443\u043A\u0438 (Brokeboys)": [
      { name: "\u041D\u0438\u043A\u043E\u043B\u0430\u0439 \u0417\u0438\u0440\u0438\u043A\u043E\u0432", pos: "\u0412\u0420", style: "\u041B\u0443\u0447\u0448\u0438\u0439 \u0432\u0440\u0430\u0442\u0430\u0440\u044C \u0441\u0435\u0437\u043E\u043D\u0430 \u041C\u0424\u041B, \u043D\u0435\u0440\u0435\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u0435\u0439\u0432\u044B \u043D\u0430 \u043B\u0438\u043D\u0438\u0438", rating: 78 },
      { name: "\u0413\u0435\u043E\u0440\u0433\u0438\u0439 \u0422\u0438\u0433\u0438\u0435\u0432", pos: "\u041B\u0417", style: "\u042D\u043A\u0441-\u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A \xAB\u0421\u043F\u0430\u0440\u0442\u0430\u043A\u0430\xBB, \u0430\u0433\u0440\u0435\u0441\u0441\u0438\u0432\u043D\u044B\u0439 \u0438 \u0446\u0435\u043F\u043A\u0438\u0439 \u043A\u0440\u0430\u0439\u043D\u0438\u0439", rating: 76 },
      { name: "\u0418\u043B\u044C\u044F \u0414\u0430\u0432\u044B\u0434\u043E\u0432", pos: "\u0426\u0417", style: "\u0412\u044B\u0441\u043E\u043A\u0438\u0439 \u0441\u0442\u043E\u043F\u043F\u0435\u0440, \u0441\u043D\u0438\u043C\u0430\u0435\u0442 \u0432\u0435\u0441\u044C \u0432\u0435\u0440\u0445\u043E\u0432\u043E\u0439 \u043C\u044F\u0447", rating: 74 },
      { name: "\u0421\u0435\u0440\u0433\u0435\u0439 \u0428\u0430\u044E\u043D\u043E\u0432 (\u041C\u0430\u0437\u0443\u0440)", pos: "\u0426\u041F", style: "\u0422\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B, \u0440\u0443\u043A\u043E\u0432\u043E\u0434\u0438\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u043D\u044B\u043C \u043F\u0440\u0435\u0441\u0441\u0438\u043D\u0433\u043E\u043C", rating: 75 },
      { name: "\u0410\u043B\u0438\u0448\u0435\u0440 \u0420\u0430\u0445\u0438\u043C\u043E\u0432", pos: "\u0410\u041F", style: "\u0424\u0438\u043B\u0438\u0433\u0440\u0430\u043D\u043D\u044B\u0439 \u043F\u0430\u0441, \u0442\u043E\u043D\u043A\u043E\u0435 \u0447\u0442\u0435\u043D\u0438\u0435 \u044D\u043F\u0438\u0437\u043E\u0434\u043E\u0432", rating: 75 },
      { name: "\u041C\u0430\u043A\u0441\u0438\u043C \u041C\u0430\u0439\u0440\u043E\u0432\u0438\u0447", pos: "\u0426\u0424", style: "\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u0438 \u043E\u0441\u0442\u0440\u044B\u0439 \u0444\u043E\u0440\u0432\u0430\u0440\u0434, \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u043D\u0438\u044F \u0437\u0430 \u0441\u043F\u0438\u043D\u0443", rating: 77 },
      { name: "\u0422\u0430\u0431\u0440\u0438\u0437 \u041C\u0438\u0440\u0437\u043E\u0435\u0432", pos: "\u041F\u0417", style: "\u041D\u0435\u0443\u0442\u043E\u043C\u0438\u043C\u044B\u0439 \u0431\u0440\u043E\u0432\u043E\u0447\u043D\u0438\u043A, \u0431\u0435\u0433\u0430\u0435\u0442 \u0432\u0441\u0435 90 \u043C\u0438\u043D\u0443\u0442", rating: 73 }
    ],
    "\u0424\u041A 10": [
      { name: "\u0415\u0432\u0433\u0435\u043D\u0438\u0439 \u041F\u043E\u043C\u0430\u0437\u0430\u043D", pos: "\u0412\u0420", style: "\u041E\u043F\u044B\u0442 \u0420\u041F\u041B, \u0447\u0435\u043C\u043F\u0438\u043E\u043D \u0415\u0432\u0440\u043E\u043F\u044B \u0441\u0440\u0435\u0434\u0438 \u044E\u043D\u043E\u0448\u0435\u0439, \u043D\u0430\u0434\u0435\u0436\u043D\u043E\u0441\u0442\u044C", rating: 77 },
      { name: "\u0411\u0440\u0430\u0439\u0430\u043D \u0418\u0434\u043E\u0432\u0443", pos: "\u041B\u0417", style: "\u0418\u0433\u0440\u043E\u043A \u0427\u041C-2018, \u0432\u044B\u0441\u043E\u0447\u0430\u0439\u0448\u0438\u0439 \u043A\u043B\u0430\u0441\u0441, \u0447\u0442\u0435\u043D\u0438\u0435 \u0438\u0433\u0440\u044B", rating: 77 },
      { name: "\u0418\u0432\u0430\u043D \u041D\u043E\u0432\u043E\u0441\u0435\u043B\u044C\u0446\u0435\u0432", pos: "\u0426\u0417", style: "\u042D\u043A\u0441-\u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A \u0441\u0431\u043E\u0440\u043D\u043E\u0439 \u0420\u043E\u0441\u0441\u0438\u0438, \u043E\u043F\u044B\u0442 \u0438 \u043D\u0430\u0434\u0435\u0436\u043D\u043E\u0441\u0442\u044C \u0441\u0437\u0430\u0434\u0438", rating: 77 },
      { name: "\u041F\u0435\u0442\u0440 \u0422\u0435\u043D", pos: "\u041F\u0417", style: "\u0411\u044B\u0441\u0442\u0440\u044B\u0439 \u043A\u0440\u0430\u0439\u043D\u0438\u0439 \u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A \u0441 \u0430\u043A\u0430\u0434\u0435\u043C\u0438\u0447\u0435\u0441\u043A\u043E\u0439 \u0448\u043A\u043E\u043B\u043E\u0439 \u0426\u0421\u041A\u0410", rating: 74 },
      { name: "\u0410\u0437\u0430\u043C\u0430\u0442 \u041C\u0443\u0441\u0430\u0433\u0430\u043B\u0438\u0435\u0432", pos: "\u0410\u041F", style: "\u041F\u0440\u0435\u0437\u0438\u0434\u0435\u043D\u0442 \u0438 \u0434\u0443\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u044B, \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0435 \u0445\u043E\u0434\u044B \u043D\u0430 \u043F\u043E\u043B\u0435", rating: 69 },
      { name: "\u041A\u0443\u0442\u0443\u0437 (\u0421\u0435\u0440\u0433\u0435\u0439 \u041A\u0443\u0442\u0443\u0437\u043E\u0432)", pos: "\u0426\u0424", style: "\u041E\u0434\u0438\u043D \u0438\u0437 \u043B\u0443\u0447\u0448\u0438\u0445 \u0431\u043E\u043C\u0431\u0430\u0440\u0434\u0438\u0440\u043E\u0432 \u043C\u0435\u0434\u0438\u0430\u0444\u0443\u0442\u0431\u043E\u043B\u0430 \u0432\u0441\u0435\u0445 \u0432\u0440\u0435\u043C\u0435\u043D", rating: 79 },
      { name: "\u0421\u0435\u0440\u0433\u0435\u0439 \u0427\u0438\u043A\u0438\u0448\u0435\u0432", pos: "\u0426\u041F", style: "\u0423\u043C\u043D\u044B\u0439 \u043E\u043F\u043E\u0440\u043D\u044B\u0439 \u043F\u043E\u043B\u0443\u0437\u0430\u0449\u0438\u0442\u043D\u0438\u043A \u0441 \u043F\u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u043C \u0443\u0434\u0430\u0440\u043E\u043C", rating: 75 }
    ],
    "Lit Energy": [
      { name: "\u041C\u0438\u0445\u0430\u0438\u043B \u041B\u0438\u0442\u0432\u0438\u043D", pos: "\u0426\u0424", style: "\u041F\u0440\u0435\u0437\u0438\u0434\u0435\u043D\u0442 \u043A\u043B\u0443\u0431\u0430, \u0432\u0437\u0440\u044B\u0432\u043D\u043E\u0439 \u043D\u0430\u043F\u0430\u0434\u0430\u044E\u0449\u0438\u0439 \u0441 \u043C\u043E\u0449\u043D\u044B\u043C \u0443\u0434\u0430\u0440\u043E\u043C", rating: 71 },
      { name: "\u0420\u043E\u043C\u0430\u043D \u0428\u0438\u0448\u043A\u0438\u043D", pos: "\u0426\u0417", style: "\u042D\u043A\u0441-\u0438\u0433\u0440\u043E\u043A \u0441\u0431\u043E\u0440\u043D\u043E\u0439 \u0420\u043E\u0441\u0441\u0438\u0438 \u0438 \xAB\u041B\u043E\u043A\u043E\u043C\u043E\u0442\u0438\u0432\u0430\xBB, \u043A\u043B\u0430\u0441\u0441 \u0438 \u043E\u043F\u044B\u0442", rating: 77 },
      { name: "\u0420\u0435\u043D\u0430\u0442 \u0421\u0430\u0431\u0438\u0442\u043E\u0432", pos: "\u041E\u041F", style: "\u0416\u0435\u0441\u0442\u043A\u0438\u0439 \u0432\u043E\u043B\u043D\u043E\u0440\u0435\u0437, \u0432\u044B\u0436\u0438\u0433\u0430\u0435\u0442 \u043E\u043F\u043E\u0440\u043D\u0443\u044E \u0437\u043E\u043D\u0443", rating: 75 },
      { name: "\u0414\u0435\u043D\u0438\u0441 \u0414\u0430\u0432\u044B\u0434\u043E\u0432", pos: "\u0426\u0424", style: "\xAB\u0420\u0443\u0441\u0441\u043A\u0438\u0439 \u041C\u0435\u0441\u0441\u0438\xBB, \u0444\u0435\u043D\u043E\u043C\u0435\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0442\u0435\u0445\u043D\u0438\u043A\u0430 \u0438 \u043D\u0435\u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043D\u044B\u0439 \u043F\u0430\u0441", rating: 76 }
    ],
    "\u0427\u0438\u0441\u0442\u043E \u041F\u0438\u0442\u0435\u0440": [
      { name: "\u0412\u044F\u0447\u0435\u0441\u043B\u0430\u0432 \u041C\u0430\u043B\u0430\u0444\u0435\u0435\u0432", pos: "\u0412\u0420", style: "\u041B\u0435\u0433\u0435\u043D\u0434\u0430 \xAB\u0417\u0435\u043D\u0438\u0442\u0430\xBB \u0438 \u0441\u0431\u043E\u0440\u043D\u043E\u0439 \u0420\u043E\u0441\u0441\u0438\u0438, \u043C\u043E\u043D\u0443\u043C\u0435\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u043A\u043B\u0430\u0441\u0441", rating: 77 },
      { name: "\u0418\u0433\u043E\u0440\u044C \u0414\u0435\u043D\u0438\u0441\u043E\u0432", pos: "\u041E\u041F", style: "\u041A\u0430\u043F\u0438\u0442\u0430\u043D-\u043F\u043E\u0431\u0435\u0434\u0438\u0442\u0435\u043B\u044C, \u043D\u0435\u0443\u0441\u0442\u0443\u043F\u0447\u0438\u0432\u044B\u0439 \u0431\u043E\u0435\u0446 \u0432 \u0446\u0435\u043D\u0442\u0440\u0435 \u043F\u043E\u043B\u044F", rating: 76 },
      { name: "\u0410\u043B\u0435\u043A\u0441\u0435\u0439 \u0418\u0433\u043E\u043D\u0438\u043D", pos: "\u0426\u0417", style: "\u041E\u043F\u044B\u0442 \u0438 \u043B\u0438\u0434\u0435\u0440\u0441\u0442\u0432\u043E, \u0438\u0434\u0435\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440 \u043F\u043E\u0437\u0438\u0446\u0438\u0438", rating: 75 }
    ]
  };
  const seedPresets = MEDIA_ROSTERS[team2.name] || [];
  const squad: any[] = [];
  for (let i = 0; i < SQUAD_PLAN.length; i++) {
    const slot = SQUAD_PLAN[i];
    const preset = seedPresets[i];
    let pName = preset ? preset.name : "";
    let pStyle = preset ? preset.style : "";
    let pRating = preset ? preset.rating : baseRating + Math.floor((seededRandom(`${team2.id}_r_${i}`) - 0.4) * 8);
    if (!pName) {
      const fn = FIRST_NAMES[Math.floor(seededRandom(`${team2.id}_fn_${i}`) * FIRST_NAMES.length)];
      const ln = LAST_NAMES[Math.floor(seededRandom(`${team2.id}_ln_${i}`) * LAST_NAMES.length)];
      pName = `${fn} ${ln}`;
    }
    if (!pStyle) {
      if (slot.pos === "\u0412\u0420") pStyle = STYLES_GK[i % STYLES_GK.length];
      else if (["\u0426\u0417", "\u041B\u0417", "\u041F\u0417"].includes(slot.pos)) pStyle = STYLES_DEF[i % STYLES_DEF.length];
      else if (["\u041E\u041F", "\u0426\u041F", "\u0410\u041F"].includes(slot.pos)) pStyle = STYLES_MID[i % STYLES_MID.length];
      else pStyle = STYLES_FWD[i % STYLES_FWD.length];
    }
    const birthYear = 1994 + Math.floor(seededRandom(`${team2.id}_by_${i}`) * 12);
    const birthMonth = String(1 + Math.floor(seededRandom(`${team2.id}_bm_${i}`) * 12)).padStart(2, "0");
    const birthDay = String(1 + Math.floor(seededRandom(`${team2.id}_bd_${i}`) * 28)).padStart(2, "0");
    squad.push({
      id: `pl_${team2.id.slice(0, 6)}_${i + 1}`,
      teamId: team2.id,
      name: pName,
      pos: slot.pos,
      born: `${birthYear}-${birthMonth}-${birthDay}`,
      nation: "\u0420\u043E\u0441\u0441\u0438\u044F",
      playedForOtherNationalTeam: false,
      otherNationalTeam: "",
      realClub: team2.name,
      style: pStyle,
      rating: pRating,
      achievements: [
        `\u0412\u043E\u0441\u043F\u0438\u0442\u0430\u043D\u043D\u0438\u043A \u0440\u0435\u0433\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0444\u0443\u0442\u0431\u043E\u043B\u0430 (${team2.city || "\u0420\u043E\u0441\u0441\u0438\u044F"})`,
        `\u0417\u0430\u044F\u0432\u043B\u0435\u043D \u0437\u0430 ${team2.name} \u043D\u0430 \u0441\u0435\u0437\u043E\u043D 2026/2027`
      ],
      stats2y: `${30 + Math.floor(seededRandom(`${team2.id}_st1_${i}`) * 35)} \u043C\u0430\u0442\u0447\u0435\u0439, ${Math.floor(seededRandom(`${team2.id}_st2_${i}`) * 14)} \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438\u0432\u043D\u044B\u0445 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439`,
      form: "\u0412 \u0445\u043E\u0440\u043E\u0448\u0435\u0439 \u0441\u043F\u043E\u0440\u0442\u0438\u0432\u043D\u043E\u0439 \u0444\u043E\u0440\u043C\u0435, \u0442\u0440\u0435\u043D\u0438\u0440\u0443\u0435\u0442\u0441\u044F \u0441 \u043F\u043E\u043B\u043D\u043E\u0439 \u043E\u0442\u0434\u0430\u0447\u0435\u0439",
      character: "\u0414\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u043D\u044B\u0439 \u0438\u0433\u0440\u043E\u043A, \u043C\u043E\u0442\u0438\u0432\u0438\u0440\u043E\u0432\u0430\u043D \u043D\u0430 \u043F\u043E\u0431\u0435\u0434\u0443",
      news: "",
      verified: true,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      out: null,
      banLeft: 0,
      seasonYC: 0
    });
  }
  return squad;
}
var ALL_TEAMS_GEO = {
  // новые клубы Второй лиги (стадионы-заглушки: уточните в админке)
  "Машук-КМВ": { city: "Пятигорск", stadium: "Центральный", lat: 44.04, lon: 43.06 },
  "Динамо-2 Москва": { city: "Москва", stadium: "Городской стадион", lat: 55.79, lon: 37.56 },
  "Иртыш": { city: "Омск", stadium: "Городской стадион", lat: 54.99, lon: 73.37 },
  "Победа НН": { city: "Нижний Новгород", stadium: "Городской стадион", lat: 56.33, lon: 44.0 },
  // РПЛ (16)
  "\u0417\u0435\u043D\u0438\u0442": { city: "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", stadium: "\u0413\u0430\u0437\u043F\u0440\u043E\u043C \u0410\u0440\u0435\u043D\u0430", lat: 59.95, lon: 30.32 },
  "\u041A\u0440\u0430\u0441\u043D\u043E\u0434\u0430\u0440": { city: "\u041A\u0440\u0430\u0441\u043D\u043E\u0434\u0430\u0440", stadium: "\u0421\u0442\u0430\u0434\u0438\u043E\u043D \u0424\u041A \u041A\u0440\u0430\u0441\u043D\u043E\u0434\u0430\u0440", lat: 45.04, lon: 38.98 },
  "\u041B\u043E\u043A\u043E\u043C\u043E\u0442\u0438\u0432": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0420\u0416\u0414 \u0410\u0440\u0435\u043D\u0430", lat: 55.8, lon: 37.74 },
  "\u0421\u043F\u0430\u0440\u0442\u0430\u043A": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041B\u0443\u043A\u043E\u0439\u043B \u0410\u0440\u0435\u043D\u0430", lat: 55.82, lon: 37.44 },
  "\u0426\u0421\u041A\u0410": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0412\u042D\u0411 \u0410\u0440\u0435\u043D\u0430", lat: 55.79, lon: 37.52 },
  "\u0411\u0430\u043B\u0442\u0438\u043A\u0430": { city: "\u041A\u0430\u043B\u0438\u043D\u0438\u043D\u0433\u0440\u0430\u0434", stadium: "\u0420\u043E\u0441\u0442\u0435\u0445 \u0410\u0440\u0435\u043D\u0430", lat: 54.71, lon: 20.51 },
  "\u0414\u0438\u043D\u0430\u043C\u043E \u041C\u043E\u0441\u043A\u0432\u0430": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0412\u0422\u0411 \u0410\u0440\u0435\u043D\u0430", lat: 55.79, lon: 37.56 },
  "\u0420\u0443\u0431\u0438\u043D": { city: "\u041A\u0430\u0437\u0430\u043D\u044C", stadium: "\u0410\u043A \u0411\u0430\u0440\u0441 \u0410\u0440\u0435\u043D\u0430", lat: 55.82, lon: 49.16 },
  "\u0410\u0445\u043C\u0430\u0442": { city: "\u0413\u0440\u043E\u0437\u043D\u044B\u0439", stadium: "\u0410\u0445\u043C\u0430\u0442 \u0410\u0440\u0435\u043D\u0430", lat: 43.32, lon: 45.69 },
  "\u0420\u043E\u0441\u0442\u043E\u0432": { city: "\u0420\u043E\u0441\u0442\u043E\u0432-\u043D\u0430-\u0414\u043E\u043D\u0443", stadium: "\u0420\u043E\u0441\u0442\u043E\u0432 \u0410\u0440\u0435\u043D\u0430", lat: 47.21, lon: 39.74 },
  "\u041A\u0440\u044B\u043B\u044C\u044F \u0421\u043E\u0432\u0435\u0442\u043E\u0432": { city: "\u0421\u0430\u043C\u0430\u0440\u0430", stadium: "\u0421\u043E\u043B\u0438\u0434\u0430\u0440\u043D\u043E\u0441\u0442\u044C \u0421\u0430\u043C\u0430\u0440\u0430 \u0410\u0440\u0435\u043D\u0430", lat: 53.28, lon: 50.24 },
  "\u041E\u0440\u0435\u043D\u0431\u0443\u0440\u0433": { city: "\u041E\u0440\u0435\u043D\u0431\u0443\u0440\u0433", stadium: "\u0413\u0430\u0437\u043E\u0432\u0438\u043A", lat: 51.77, lon: 55.1 },
  "\u0410\u043A\u0440\u043E\u043D": { city: "\u0422\u043E\u043B\u044C\u044F\u0442\u0442\u0438", stadium: "\u0421\u0430\u043C\u0430\u0440\u0430 \u0410\u0440\u0435\u043D\u0430", lat: 53.51, lon: 49.42 },
  "\u0414\u0438\u043D\u0430\u043C\u043E \u041C\u0430\u0445\u0430\u0447\u043A\u0430\u043B\u0430": { city: "\u041C\u0430\u0445\u0430\u0447\u043A\u0430\u043B\u0430", stadium: "\u0410\u043D\u0436\u0438 \u0410\u0440\u0435\u043D\u0430", lat: 42.98, lon: 47.5 },
  "\u0420\u043E\u0434\u0438\u043D\u0430": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0412\u0422\u0411 \u0410\u0440\u0435\u043D\u0430 / \u0421\u043F\u0430\u0440\u0442\u0430\u043A\u043E\u0432\u0435\u0446", lat: 55.75, lon: 37.62 },
  "\u0424\u0430\u043A\u0435\u043B": { city: "\u0412\u043E\u0440\u043E\u043D\u0435\u0436", stadium: "\u0424\u0430\u043A\u0435\u043B", lat: 51.67, lon: 39.2 },
  // Первая лига (18)
  "\u0410\u0440\u0441\u0435\u043D\u0430\u043B \u0422\u0443\u043B\u0430": { city: "\u0422\u0443\u043B\u0430", stadium: "\u0410\u0440\u0441\u0435\u043D\u0430\u043B", lat: 54.19, lon: 37.61 },
  "\u0412\u0435\u043B\u0435\u0441": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A\u043E\u0432\u0435\u0446 \u0438\u043C. \u0421\u0442\u0430\u0440\u043E\u0441\u0442\u0438\u043D\u0430", lat: 55.7, lon: 37.6 },
  "\u0412\u043E\u043B\u0433\u0430 \u0423\u043B\u044C\u044F\u043D\u043E\u0432\u0441\u043A": { city: "\u0423\u043B\u044C\u044F\u043D\u043E\u0432\u0441\u043A", stadium: "\u0422\u0440\u0443\u0434", lat: 54.32, lon: 48.39 },
  "\u0415\u043D\u0438\u0441\u0435\u0439": { city: "\u041A\u0440\u0430\u0441\u043D\u043E\u044F\u0440\u0441\u043A", stadium: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439", lat: 56.01, lon: 92.87 },
  "\u041A\u0410\u041C\u0410\u0417": { city: "\u041D\u0430\u0431\u0435\u0440\u0435\u0436\u043D\u044B\u0435 \u0427\u0435\u043B\u043D\u044B", stadium: "\u041A\u0410\u041C\u0410\u0417", lat: 55.74, lon: 52.41 },
  "\u041B\u0435\u043D\u0438\u043D\u0433\u0440\u0430\u0434\u0435\u0446": { city: "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", stadium: "\u0420\u043E\u0449\u0438\u043D\u043E \u0410\u0440\u0435\u043D\u0430", lat: 59.93, lon: 30.3 },
  "\u041D\u0435\u0444\u0442\u0435\u0445\u0438\u043C\u0438\u043A": { city: "\u041D\u0438\u0436\u043D\u0435\u043A\u0430\u043C\u0441\u043A", stadium: "\u041D\u0435\u0444\u0442\u0435\u0445\u0438\u043C\u0438\u043A", lat: 55.64, lon: 51.82 },
  "\u041F\u0430\u0440\u0438 \u041D\u041D": { city: "\u041D\u0438\u0436\u043D\u0438\u0439 \u041D\u043E\u0432\u0433\u043E\u0440\u043E\u0434", stadium: "\u0421\u0442\u0430\u0434\u0438\u043E\u043D \u041D\u0438\u0436\u043D\u0438\u0439 \u041D\u043E\u0432\u0433\u043E\u0440\u043E\u0434", lat: 56.33, lon: 44 },
  "\u0420\u043E\u0442\u043E\u0440": { city: "\u0412\u043E\u043B\u0433\u043E\u0433\u0440\u0430\u0434", stadium: "\u0412\u043E\u043B\u0433\u043E\u0433\u0440\u0430\u0434 \u0410\u0440\u0435\u043D\u0430", lat: 48.73, lon: 44.55 },
  "\u0421\u041A\u0410-\u0425\u0430\u0431\u0430\u0440\u043E\u0432\u0441\u043A": { city: "\u0425\u0430\u0431\u0430\u0440\u043E\u0432\u0441\u043A", stadium: "\u0421\u0442\u0430\u0434\u0438\u043E\u043D \u0438\u043C. \u041B\u0435\u043D\u0438\u043D\u0430", lat: 48.48, lon: 135.07 },
  "\u0421\u043E\u0447\u0438": { city: "\u0421\u043E\u0447\u0438", stadium: "\u0424\u0438\u0448\u0442", lat: 43.6, lon: 39.73 },
  "\u0421\u043F\u0430\u0440\u0442\u0430\u043A \u041A\u043E\u0441\u0442\u0440\u043E\u043C\u0430": { city: "\u041A\u043E\u0441\u0442\u0440\u043E\u043C\u0430", stadium: "\u0423\u0440\u043E\u0436\u0430\u0439", lat: 57.77, lon: 40.93 },
  "\u0422\u0435\u043A\u0441\u0442\u0438\u043B\u044C\u0449\u0438\u043A": { city: "\u0418\u0432\u0430\u043D\u043E\u0432\u043E", stadium: "\u0422\u0435\u043A\u0441\u0442\u0438\u043B\u044C\u0449\u0438\u043A", lat: 57, lon: 40.97 },
  "\u0422\u043E\u0440\u043F\u0435\u0434\u043E \u041C\u043E\u0441\u043A\u0432\u0430": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0411\u0421\u0410 \u041B\u0443\u0436\u043D\u0438\u043A\u0438", lat: 55.71, lon: 37.65 },
  "\u0423\u0440\u0430\u043B": { city: "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433", stadium: "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433 \u0410\u0440\u0435\u043D\u0430", lat: 56.83, lon: 60.57 },
  "\u0423\u0444\u0430": { city: "\u0423\u0444\u0430", stadium: "\u041D\u0435\u0444\u0442\u044F\u043D\u0438\u043A", lat: 54.74, lon: 55.97 },
  "\u0427\u0435\u043B\u044F\u0431\u0438\u043D\u0441\u043A": { city: "\u0427\u0435\u043B\u044F\u0431\u0438\u043D\u0441\u043A", stadium: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439", lat: 55.16, lon: 61.4 },
  "\u0428\u0438\u043D\u043D\u0438\u043A": { city: "\u042F\u0440\u043E\u0441\u043B\u0430\u0432\u043B\u044C", stadium: "\u0428\u0438\u043D\u043D\u0438\u043A", lat: 57.63, lon: 39.87 },
  // Вторая лига А — Золото (10)
  "\u0421\u043E\u043A\u043E\u043B": { city: "\u0421\u0430\u0440\u0430\u0442\u043E\u0432", stadium: "\u041B\u043E\u043A\u043E\u043C\u043E\u0442\u0438\u0432", lat: 51.53, lon: 46.03 },
  "\u0414\u0438\u043D\u0430\u043C\u043E \u0411\u0440\u044F\u043D\u0441\u043A": { city: "\u0411\u0440\u044F\u043D\u0441\u043A", stadium: "\u0414\u0438\u043D\u0430\u043C\u043E", lat: 53.24, lon: 34.36 },
  "\u0410\u043B\u0430\u043D\u0438\u044F": { city: "\u0412\u043B\u0430\u0434\u0438\u043A\u0430\u0432\u043A\u0430\u0437", stadium: "\u0420\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0441\u0442\u0430\u0434\u0438\u043E\u043D \u0421\u043F\u0430\u0440\u0442\u0430\u043A", lat: 43.02, lon: 44.68 },
  "\u0420\u043E\u0434\u0438\u043D\u0430-2": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A\u043E\u0432\u0435\u0446 \u0438\u043C. \u0421\u0442\u0430\u0440\u043E\u0441\u0442\u0438\u043D\u0430", lat: 55.75, lon: 37.62 },
  "\u0414\u0438\u043D\u0430\u043C\u043E \u041A\u0438\u0440\u043E\u0432": { city: "\u041A\u0438\u0440\u043E\u0432", stadium: "\u0412\u044F\u0442\u0421\u0428\u041E\u0420", lat: 58.6, lon: 49.66 },
  "\u0410\u043C\u043A\u0430\u0440": { city: "\u041F\u0435\u0440\u043C\u044C", stadium: "\u0417\u0432\u0435\u0437\u0434\u0430", lat: 58.01, lon: 56.23 },
  "\u0422\u044E\u043C\u0435\u043D\u044C": { city: "\u0422\u044E\u043C\u0435\u043D\u044C", stadium: "\u0413\u0435\u043E\u043B\u043E\u0433", lat: 57.15, lon: 65.54 },
  "\u0414\u0438\u043D\u0430\u043C\u043E \u0412\u043B\u0430\u0434\u0438\u0432\u043E\u0441\u0442\u043E\u043A": { city: "\u0412\u043B\u0430\u0434\u0438\u0432\u043E\u0441\u0442\u043E\u043A", stadium: "\u0414\u0438\u043D\u0430\u043C\u043E", lat: 43.12, lon: 131.89 },
  "\u0421\u0438\u0431\u0438\u0440\u044C": { city: "\u041D\u043E\u0432\u043E\u0441\u0438\u0431\u0438\u0440\u0441\u043A", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A", lat: 55.03, lon: 82.92 },
  "\u0421\u043F\u0430\u0440\u0442\u0430\u043A \u0412\u043B\u0430\u0434\u0438\u043A\u0430\u0432\u043A\u0430\u0437": { city: "\u0412\u043B\u0430\u0434\u0438\u043A\u0430\u0432\u043A\u0430\u0437", stadium: "\u041C\u0435\u0442\u0430\u043B\u043B\u0443\u0440\u0433", lat: 43.03, lon: 44.67 },
  // Вторая лига А — Серебро (7)
  "\u041A\u0430\u043B\u0443\u0433\u0430": { city: "\u041A\u0430\u043B\u0443\u0433\u0430", stadium: "\u0421\u043F\u0443\u0442\u043D\u0438\u043A", lat: 54.51, lon: 36.26 },
  "\u0422\u043E\u0440\u043F\u0435\u0434\u043E \u041C\u0438\u0430\u0441\u0441": { city: "\u041C\u0438\u0430\u0441\u0441", stadium: "\u0422\u0440\u0443\u0434", lat: 55.05, lon: 60.1 },
  "\u0412\u043E\u043B\u0433\u0430\u0440\u044C": { city: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043D\u044C", stadium: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439", lat: 46.35, lon: 48.04 },
  "\u0417\u0435\u043D\u0438\u0442-2": { city: "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", stadium: "\u0421\u043C\u0435\u043D\u0430", lat: 59.95, lon: 30.32 },
  "\u0411\u0430\u043B\u0442\u0438\u043A\u0430-2": { city: "\u041A\u0430\u043B\u0438\u043D\u0438\u043D\u0433\u0440\u0430\u0434", stadium: "\u0411\u0430\u043B\u0442\u0438\u043A\u0430", lat: 54.71, lon: 20.51 },
  "\u0420\u043E\u0434\u0438\u043D\u0430-3": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0410\u0440\u0435\u043D\u0430 \u0420\u043E\u0434\u0438\u043D\u0430", lat: 55.75, lon: 37.62 },
  "\u0414\u0438\u043D\u0430\u043C\u043E \u0421\u0442\u0430\u0432\u0440\u043E\u043F\u043E\u043B\u044C": { city: "\u0421\u0442\u0430\u0432\u0440\u043E\u043F\u043E\u043B\u044C", stadium: "\u0414\u0438\u043D\u0430\u043C\u043E", lat: 45.04, lon: 41.97 },
  // Вторая лига Б — Группа 1 (16)
  "\u0421\u0435\u0432\u0430\u0441\u0442\u043E\u043F\u043E\u043B\u044C": { city: "\u0421\u0435\u0432\u0430\u0441\u0442\u043E\u043F\u043E\u043B\u044C", stadium: "\u0421\u041E\u041A \u0421\u0435\u0432\u0430\u0441\u0442\u043E\u043F\u043E\u043B\u044C", lat: 44.6, lon: 33.52 },
  "\u041D\u0430\u0440\u0442 \u0427\u0435\u0440\u043A\u0435\u0441\u0441\u043A": { city: "\u0427\u0435\u0440\u043A\u0435\u0441\u0441\u043A", stadium: "\u041D\u0430\u0440\u0442", lat: 44.22, lon: 42.06 },
  "\u041F\u043E\u0431\u0435\u0434\u0430 \u0425\u0430\u0441\u0430\u0432\u044E\u0440\u0442": { city: "\u0425\u0430\u0441\u0430\u0432\u044E\u0440\u0442", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A", lat: 43.25, lon: 46.59 },
  "\u0420\u043E\u0441\u0442\u043E\u0432-2": { city: "\u0420\u043E\u0441\u0442\u043E\u0432-\u043D\u0430-\u0414\u043E\u043D\u0443", stadium: "\u041E\u043B\u0438\u043C\u043F \u0438\u043C. \u0412. \u041F\u043E\u043D\u0435\u0434\u0435\u043B\u044C\u043D\u0438\u043A\u0430", lat: 47.24, lon: 39.71 },
  "\u0414\u0440\u0443\u0436\u0431\u0430 \u041C\u0430\u0439\u043A\u043E\u043F": { city: "\u041C\u0430\u0439\u043A\u043E\u043F", stadium: "\u0410\u0434\u044B\u0433\u0435\u0439\u0441\u043A\u0438\u0439 \u0440\u0435\u0441\u043F\u0443\u0431\u043B\u0438\u043A\u0430\u043D\u0441\u043A\u0438\u0439 \u0441\u0442\u0430\u0434\u0438\u043E\u043D", lat: 44.61, lon: 40.11 },
  "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043D\u044C": { city: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043D\u044C", stadium: "\u0410\u0441\u0442\u0440\u0430\u0445\u0430\u043D\u044C", lat: 46.36, lon: 48.05 },
  "\u0420\u0443\u0431\u0438\u043D \u042F\u043B\u0442\u0430": { city: "\u042F\u043B\u0442\u0430", stadium: "\u0410\u0432\u0430\u043D\u0433\u0430\u0440\u0434", lat: 44.5, lon: 34.16 },
  "\u0410\u043D\u0433\u0443\u0448\u0442": { city: "\u041D\u0430\u0437\u0440\u0430\u043D\u044C", stadium: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u043C. \u0420. \u0410\u0443\u0448\u0435\u0432\u0430", lat: 43.23, lon: 44.77 },
  "\u0421\u043F\u0430\u0440\u0442\u0430\u043A-\u041D\u0430\u043B\u044C\u0447\u0438\u043A": { city: "\u041D\u0430\u043B\u044C\u0447\u0438\u043A", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A", lat: 43.48, lon: 43.6 },
  "\u0414\u0438\u043D\u0430\u043C\u043E-2 \u041C\u0430\u0445\u0430\u0447\u043A\u0430\u043B\u0430": { city: "\u041C\u0430\u0445\u0430\u0447\u043A\u0430\u043B\u0430", stadium: "\u0422\u0440\u0443\u0434", lat: 42.98, lon: 47.5 },
  "\u0417\u0430\u0440\u044F \u041B\u0443\u0433\u0430\u043D\u0441\u043A": { city: "\u041B\u0443\u0433\u0430\u043D\u0441\u043A", stadium: "\u0410\u0432\u0430\u043D\u0433\u0430\u0440\u0434", lat: 48.57, lon: 39.31 },
  "\u041A\u044B\u0437\u044B\u043B\u0442\u0430\u0448": { city: "\u0411\u0430\u0445\u0447\u0438\u0441\u0430\u0440\u0430\u0439", stadium: "\u0414\u0440\u0443\u0436\u0431\u0430", lat: 44.75, lon: 33.86 },
  "\u041D\u0435\u0444\u0442\u044F\u043D\u0438\u043A \u0410\u0445\u0442\u044B\u0440\u0441\u043A\u0438\u0439": { city: "\u0410\u0445\u0442\u044B\u0440\u0441\u043A\u0438\u0439", stadium: "\u041D\u0435\u0444\u0442\u044F\u043D\u0438\u043A", lat: 44.85, lon: 38.3 },
  "\u041F\u0421\u041A \u0414\u0438\u043D\u0441\u043A\u0430\u044F": { city: "\u0414\u0438\u043D\u0441\u043A\u0430\u044F", stadium: "\u041A\u0443\u0431\u0430\u043D\u044C", lat: 45.22, lon: 39.23 },
  "\u0427\u0430\u0439\u043A\u0430-\u041C": { city: "\u041F\u0435\u0441\u0447\u0430\u043D\u043E\u043A\u043E\u043F\u0441\u043A\u043E\u0435", stadium: "\u0438\u043C. \u0418. \u041F. \u0427\u0430\u0439\u043A\u0430", lat: 46.19, lon: 41.08 },
  "\u0428\u0430\u0445\u0442\u0435\u0440 \u0414\u043E\u043D\u0435\u0446\u043A": { city: "\u0414\u043E\u043D\u0435\u0446\u043A", stadium: "\u041C\u0435\u0442\u0430\u043B\u043B\u0443\u0440\u0433", lat: 48, lon: 37.8 },
  // Вторая лига Б — Группа 2 (15)
  "\u041C\u0443\u0440\u043E\u043C": { city: "\u041C\u0443\u0440\u043E\u043C", stadium: "\u0438\u043C. \u0412. \u041B\u043E\u0441\u0435\u0432\u0430", lat: 55.57, lon: 42.05 },
  "\u0414\u0438\u043D\u0430\u043C\u043E \u0412\u043E\u043B\u043E\u0433\u0434\u0430": { city: "\u0412\u043E\u043B\u043E\u0433\u0434\u0430", stadium: "\u0414\u0438\u043D\u0430\u043C\u043E", lat: 59.22, lon: 39.88 },
  "\u0418\u0440\u043A\u0443\u0442\u0441\u043A": { city: "\u0418\u0440\u043A\u0443\u0442\u0441\u043A", stadium: "\u0422\u0440\u0443\u0434", lat: 52.29, lon: 104.3 },
  "\u0421\u043F\u0430\u0440\u0442\u0430\u043A-2": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0410\u043A\u0430\u0434\u0435\u043C\u0438\u044F \u0438\u043C. \u0424. \u0427\u0435\u0440\u0435\u043D\u043A\u043E\u0432\u0430", lat: 55.75, lon: 37.62 },
  "\u0411\u0430\u043B\u0442\u0438\u043A\u0430-\u0411\u0424\u0423": { city: "\u041A\u0430\u043B\u0438\u043D\u0438\u043D\u0433\u0440\u0430\u0434", stadium: "\u0411\u0430\u043B\u0442\u0438\u043A\u0430", lat: 54.72, lon: 20.5 },
  "\u0422\u0432\u0435\u0440\u044C": { city: "\u0422\u0432\u0435\u0440\u044C", stadium: "\u042E\u043D\u043E\u0441\u0442\u044C", lat: 56.86, lon: 35.9 },
  "\u0422\u043E\u0440\u043F\u0435\u0434\u043E \u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440": { city: "\u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440", stadium: "\u0422\u043E\u0440\u043F\u0435\u0434\u043E", lat: 56.13, lon: 40.4 },
  "\u0427\u0435\u0440\u0435\u043F\u043E\u0432\u0435\u0446": { city: "\u0427\u0435\u0440\u0435\u043F\u043E\u0432\u0435\u0446", stadium: "\u041C\u0435\u0442\u0430\u043B\u043B\u0443\u0440\u0433", lat: 59.13, lon: 37.9 },
  "\u0427\u0435\u0440\u0442\u0430\u043D\u043E\u0432\u043E": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0410\u0440\u0435\u043D\u0430 \u0427\u0435\u0440\u0442\u0430\u043D\u043E\u0432\u043E", lat: 55.63, lon: 37.6 },
  "\u0417\u0432\u0435\u0437\u0434\u0430": { city: "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", stadium: "\u041D\u043E\u0432\u0430 \u0410\u0440\u0435\u043D\u0430", lat: 59.93, lon: 30.34 },
  "\u041B\u0443\u043A\u0438-\u042D\u043D\u0435\u0440\u0433\u0438\u044F": { city: "\u0412\u0435\u043B\u0438\u043A\u0438\u0435 \u041B\u0443\u043A\u0438", stadium: "\u042D\u043A\u0441\u043F\u0440\u0435\u0441\u0441", lat: 56.34, lon: 30.52 },
  "\u041A\u043E\u0441\u043C\u043E\u0441 \u0414\u043E\u043B\u0433\u043E\u043F\u0440\u0443\u0434\u043D\u044B\u0439": { city: "\u0414\u043E\u043B\u0433\u043E\u043F\u0440\u0443\u0434\u043D\u044B\u0439", stadium: "\u0421\u0430\u043B\u044E\u0442", lat: 55.93, lon: 37.5 },
  "\u0415\u043D\u0438\u0441\u0435\u0439-2": { city: "\u041A\u0440\u0430\u0441\u043D\u043E\u044F\u0440\u0441\u043A", stadium: "\u0424\u0443\u0442\u0431\u043E\u043B-\u0410\u0440\u0435\u043D\u0430 \u0415\u043D\u0438\u0441\u0435\u0439", lat: 56.02, lon: 92.88 },
  "\u0414\u0438\u043D\u0430\u043C\u043E \u0421\u041F\u0431": { city: "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", stadium: "\u041D\u043E\u0432\u0430 \u0410\u0440\u0435\u043D\u0430", lat: 59.97, lon: 30.3 },
  "\u0418\u0441\u043A\u0440\u0430 \u0421\u043C\u043E\u043B\u0435\u043D\u0441\u043A": { city: "\u0421\u043C\u043E\u043B\u0435\u043D\u0441\u043A", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A", lat: 54.78, lon: 32.05 },
  // Вторая лига Б — Группа 3 (16)
  "\u0420\u043E\u0442\u043E\u0440-2": { city: "\u0412\u043E\u043B\u0433\u043E\u0433\u0440\u0430\u0434", stadium: "\u0417\u0435\u043D\u0438\u0442", lat: 48.74, lon: 44.54 },
  "\u0410\u0432\u0430\u043D\u0433\u0430\u0440\u0434 \u041A\u0443\u0440\u0441\u043A": { city: "\u041A\u0443\u0440\u0441\u043A", stadium: "\u0422\u0440\u0443\u0434\u043E\u0432\u044B\u0435 \u0440\u0435\u0437\u0435\u0440\u0432\u044B", lat: 51.73, lon: 36.19 },
  "\u0421\u0430\u043B\u044E\u0442 \u0411\u0435\u043B\u0433\u043E\u0440\u043E\u0434": { city: "\u0411\u0435\u043B\u0433\u043E\u0440\u043E\u0434", stadium: "\u0421\u0430\u043B\u044E\u0442", lat: 50.6, lon: 36.59 },
  "\u0421\u043F\u0430\u0440\u0442\u0430\u043A \u0422\u0430\u043C\u0431\u043E\u0432": { city: "\u0422\u0430\u043C\u0431\u043E\u0432", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A", lat: 52.72, lon: 41.45 },
  "\u0420\u044F\u0437\u0430\u043D\u044C": { city: "\u0420\u044F\u0437\u0430\u043D\u044C", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A", lat: 54.63, lon: 39.74 },
  "\u041C\u0435\u0442\u0430\u043B\u043B\u0443\u0440\u0433 \u041B\u0438\u043F\u0435\u0446\u043A": { city: "\u041B\u0438\u043F\u0435\u0446\u043A", stadium: "\u041C\u0435\u0442\u0430\u043B\u043B\u0443\u0440\u0433", lat: 52.61, lon: 39.6 },
  "\u041E\u0440\u0435\u043B": { city: "\u041E\u0440\u0451\u043B", stadium: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439 \u0438\u043C. \u0412. \u0418. \u041B\u0435\u043D\u0438\u043D\u0430", lat: 52.97, lon: 36.08 },
  "\u0410\u0440\u0441\u0435\u043D\u0430\u043B-2": { city: "\u0422\u0443\u043B\u0430", stadium: "\u0416\u0435\u043B\u0434\u043E\u0440\u043C\u0430\u0448", lat: 54.19, lon: 37.61 },
  "\u0420\u043E\u0434\u0438\u043D\u0430-\u041C": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A\u043E\u0432\u0435\u0446", lat: 55.75, lon: 37.62 },
  "\u0417\u0435\u043D\u0438\u0442 \u041F\u0435\u043D\u0437\u0430": { city: "\u041F\u0435\u043D\u0437\u0430", stadium: "\u041F\u0435\u0440\u0432\u043E\u043C\u0430\u0439\u0441\u043A\u0438\u0439", lat: 53.2, lon: 45 },
  "\u0421\u041A\u0410-\u0425\u0430\u0431\u0430\u0440\u043E\u0432\u0441\u043A-2": { city: "\u0425\u0430\u0431\u0430\u0440\u043E\u0432\u0441\u043A", stadium: "\u042E\u043D\u043E\u0441\u0442\u044C", lat: 48.48, lon: 135.07 },
  "\u0421\u0442\u0440\u043E\u0433\u0438\u043D\u043E": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u042F\u043D\u0442\u0430\u0440\u044C", lat: 55.8, lon: 37.4 },
  "\u041A\u0432\u0430\u043D\u0442 \u041E\u0431\u043D\u0438\u043D\u0441\u043A": { city: "\u041E\u0431\u043D\u0438\u043D\u0441\u043A", stadium: "\u0422\u0440\u0443\u0434", lat: 55.1, lon: 36.61 },
  "\u0421\u0430\u0442\u0443\u0440\u043D \u0420\u0430\u043C\u0435\u043D\u0441\u043A\u043E\u0435": { city: "\u0420\u0430\u043C\u0435\u043D\u0441\u043A\u043E\u0435", stadium: "\u0421\u0430\u0442\u0443\u0440\u043D", lat: 55.57, lon: 38.23 },
  "\u0412\u043E\u043B\u043D\u0430": { city: "\u041A\u043E\u0432\u0435\u0440\u043D\u0438\u043D\u043E", stadium: "\u041B\u043E\u043A\u043E\u043C\u043E\u0442\u0438\u0432 (\u041D. \u041D\u043E\u0432\u0433\u043E\u0440\u043E\u0434)", lat: 57.13, lon: 43.81 },
  "\u0428\u0443\u043C\u0431\u0440\u0430\u0442": { city: "\u0421\u0430\u0440\u0430\u043D\u0441\u043A", stadium: "\u0421\u0442\u0430\u0440\u0442", lat: 54.18, lon: 45.18 },
  // Вторая лига Б — Группа 4 (12)
  "\u0423\u0440\u0430\u043B-2": { city: "\u0415\u043A\u0430\u0442\u0435\u0440\u0438\u043D\u0431\u0443\u0440\u0433", stadium: "\u0411\u0430\u0436\u043E\u0432\u0438\u044F", lat: 56.84, lon: 60.6 },
  "\u041A\u0440\u044B\u043B\u044C\u044F \u0421\u043E\u0432\u0435\u0442\u043E\u0432-2": { city: "\u0421\u0430\u043C\u0430\u0440\u0430", stadium: "\u041C\u0435\u0442\u0430\u043B\u043B\u0443\u0440\u0433", lat: 53.2, lon: 50.15 },
  "\u0425\u0438\u043C\u0438\u043A": { city: "\u0414\u0437\u0435\u0440\u0436\u0438\u043D\u0441\u043A", stadium: "\u0425\u0438\u043C\u0438\u043A", lat: 56.24, lon: 43.46 },
  "\u041A\u0414\u0412 \u0422\u043E\u043C\u0441\u043A": { city: "\u0422\u043E\u043C\u0441\u043A", stadium: "\u0422\u0440\u0443\u0434", lat: 56.5, lon: 84.97 },
  "\u041E\u0440\u0435\u043D\u0431\u0443\u0440\u0433-2": { city: "\u041E\u0440\u0435\u043D\u0431\u0443\u0440\u0433", stadium: "\u0413\u0430\u0437\u043E\u0432\u0438\u043A", lat: 51.77, lon: 55.1 },
  "\u0414\u0438\u043D\u0430\u043C\u043E \u0411\u0430\u0440\u043D\u0430\u0443\u043B": { city: "\u0411\u0430\u0440\u043D\u0430\u0443\u043B", stadium: "\u0414\u0438\u043D\u0430\u043C\u043E", lat: 53.35, lon: 83.77 },
  "\u0420\u0443\u0431\u0438\u043D-2": { city: "\u041A\u0430\u0437\u0430\u043D\u044C", stadium: "\u0420\u0443\u0431\u0438\u043D", lat: 55.79, lon: 49.12 },
  "\u0427\u0435\u043B\u044F\u0431\u0438\u043D\u0441\u043A-2": { city: "\u0427\u0435\u043B\u044F\u0431\u0438\u043D\u0441\u043A", stadium: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439", lat: 55.16, lon: 61.4 },
  "\u0410\u043A\u0440\u043E\u043D-2": { city: "\u0422\u043E\u043B\u044C\u044F\u0442\u0442\u0438", stadium: "\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u043B (\u0416\u0438\u0433\u0443\u043B\u0435\u0432\u0441\u043A)", lat: 53.51, lon: 49.42 },
  "\u041D\u043E\u0441\u0442\u0430": { city: "\u041D\u043E\u0432\u043E\u0442\u0440\u043E\u0438\u0446\u043A", stadium: "\u041C\u0435\u0442\u0430\u043B\u043B\u0443\u0440\u0433", lat: 51.2, lon: 58.33 },
  "\u041B\u0435\u0433\u0438\u043E\u043D": { city: "\u041C\u0430\u0445\u0430\u0447\u043A\u0430\u043B\u0430", stadium: "\u0414\u0438\u043D\u0430\u043C\u043E", lat: 42.98, lon: 47.5 },
  "\u0418\u0436\u0435\u0432\u0441\u043A": { city: "\u0418\u0436\u0435\u0432\u0441\u043A", stadium: "\u0426\u0435\u043D\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439", lat: 56.85, lon: 53.2 },
  // Медиалига (16)
  "2Drots": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041C\u043E\u0441\u043A\u0432\u0438\u0447", lat: 55.75, lon: 37.62 },
  "\u0410\u043C\u043A\u0430\u043B": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041B\u0443\u0436\u043D\u0438\u043A\u0438 \u0421\u043F\u043E\u0440\u0442\u0438\u0432\u043D\u044B\u0439 \u0413\u043E\u0440\u043E\u0434\u043E\u043A", lat: 55.75, lon: 37.62 },
  "\u0411\u0440\u043E\u0443\u043A\u0438 (Brokeboys)": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041E\u0434\u0438\u043D\u0446\u043E\u0432\u043E \u0410\u0440\u0435\u043D\u0430", lat: 55.75, lon: 37.62 },
  "\u0424\u041A 10": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0421\u0430\u043F\u0441\u0430\u043D \u0410\u0440\u0435\u043D\u0430", lat: 55.75, lon: 37.62 },
  "Lit Energy": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041C\u043E\u0441\u043A\u0432\u0438\u0447", lat: 55.75, lon: 37.62 },
  "\u0421\u0438\u043D\u0434\u0415\u043A\u0430\u0442": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A\u043E\u0432\u0435\u0446", lat: 55.75, lon: 37.62 },
  "\u0411\u0430\u043D\u043A\u0430": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041A\u0440\u044B\u043B\u044C\u044F \u0421\u043E\u0432\u0435\u0442\u043E\u0432", lat: 55.75, lon: 37.62 },
  "\u0421\u041A\u0410 \u0420\u043E\u0441\u0442\u043E\u0432": { city: "\u0420\u043E\u0441\u0442\u043E\u0432-\u043D\u0430-\u0414\u043E\u043D\u0443", stadium: "\u0421\u041A\u0410", lat: 47.24, lon: 39.71 },
  "\u041D\u0430\u0440\u043E\u0434\u043D\u0430\u044F \u041A\u043E\u043C\u0430\u043D\u0434\u0430": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0410\u0440\u0435\u043D\u0430 \u0421\u043E\u043A\u043E\u043B\u044C\u043D\u0438\u043A\u0438", lat: 55.75, lon: 37.62 },
  "Fight Nights": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041B\u0443\u0436\u043D\u0438\u043A\u0438", lat: 55.75, lon: 37.62 },
  "Prime Squad": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041E\u043A\u0442\u044F\u0431\u0440\u044C", lat: 55.75, lon: 37.62 },
  "\u0410\u043F\u0441\u043D\u044B": { city: "\u0421\u0443\u0445\u0443\u043C", stadium: "\u0414\u0438\u043D\u0430\u043C\u043E \u0421\u0443\u0445\u0443\u043C", lat: 43, lon: 41.02 },
  "\u041C\u0430\u0442\u0447 \u0422\u0412": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041C\u043E\u0441\u043A\u0432\u0438\u0447", lat: 55.75, lon: 37.62 },
  "\u042D\u0433\u0440\u0438\u0441\u0438": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0420\u0435\u0447\u043D\u043E\u0439 \u0412\u043E\u043A\u0437\u0430\u043B", lat: 55.75, lon: 37.62 },
  "Rocket Team": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0410\u0440\u0435\u043D\u0430 \u0427\u0435\u0440\u0442\u0430\u043D\u043E\u0432\u043E", lat: 55.75, lon: 37.62 },
  "\u0427\u0438\u0441\u0442\u043E \u041F\u0438\u0442\u0435\u0440": { city: "\u0421\u0430\u043D\u043A\u0442-\u041F\u0435\u0442\u0435\u0440\u0431\u0443\u0440\u0433", stadium: "\u041F\u0435\u0442\u0440\u043E\u0432\u0441\u043A\u0438\u0439", lat: 59.95, lon: 30.32 },
  // Медиалига Дивизион 2 (8)
  "FC ARS": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041C\u043E\u0441\u043A\u0432\u0438\u0447", lat: 55.75, lon: 37.62 },
  "\xAB\u0424\xBB \u041C\u043E\u0441\u043A\u0432\u0430": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0421\u043F\u0430\u0440\u0442\u0430\u043A\u043E\u0432\u0435\u0446", lat: 55.75, lon: 37.62 },
  "\u0410\u043B\u044C\u0442\u0435\u0440\u043E\u043D": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041A\u0440\u044B\u043B\u044C\u044F \u0421\u043E\u0432\u0435\u0442\u043E\u0432", lat: 55.75, lon: 37.62 },
  "\u0410\u043D\u0436\u0438": { city: "\u041C\u0430\u0445\u0430\u0447\u043A\u0430\u043B\u0430", stadium: "\u0410\u043D\u0436\u0438 \u0410\u0440\u0435\u043D\u0430", lat: 42.98, lon: 47.5 },
  "\u0413\u043E\u0440\u043A\u0438": { city: "\u0413\u043E\u0440\u043A\u0438-2 (\u041C\u041E)", stadium: "\u0413\u043E\u0440\u043A\u0438 \u0410\u0440\u0435\u043D\u0430", lat: 55.72, lon: 37.15 },
  "\u0424\u041A Vibe": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u0421\u043E\u043A\u043E\u043B\u044C\u043D\u0438\u043A\u0438", lat: 55.75, lon: 37.62 },
  "\u0424\u041A \u041F\u041F": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u041E\u043A\u0442\u044F\u0431\u0440\u044C", lat: 55.75, lon: 37.62 },
  "\u0424\u041A \u042E\u041D\u0418\u0421\u041E\u041D": { city: "\u041C\u043E\u0441\u043A\u0432\u0430", stadium: "\u042F\u043D\u0442\u0430\u0440\u044C", lat: 55.75, lon: 37.62 }
};

export { CLIMATE_DATA, calculateMatchWeather, ALL_TEAMS_GEO, generateFullSquad, getOrCreateCityClimate };
