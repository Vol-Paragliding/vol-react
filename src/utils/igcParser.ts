import { parse } from "igc-parser";

export interface Fix {
  latitude: number;
  longitude: number;
  gpsAltitude: number;
  time: string;
}

export interface FlightData {
  date?: Date;
  pilot?: string;
  gliderId?: string;
  fixes: Fix[];
  task?: string;
  [key: string]: unknown; // Allow additional properties
}

/**
 * Parses IGC file content and extracts relevant flight data.
 * @param {string} igcFileContent - The content of the IGC file as a string.
 * @returns {FlightData | null} The extracted flight data or null if parsing fails.
 */
export const parseIgcFile = (igcFileContent: string): FlightData | null => {
  // console.log('igcFileContent', igcFileContent)
  try {
    const flightData = parse(igcFileContent) as unknown as FlightData;
    // console.log('flightdata', flightData);
    // Extract and return the relevant flight data.
    // Adjust this based on the specific data you need for your application.
    // return {
    //   date: flightData.date,
    //   pilot: flightData.pilot,
    //   glider: flightData.gliderId,
    //   fixes: flightData.fixes, // Contains an array of data points recorded during the flight.
    //   // fixes: flightData.fixes.map((fix) => ({
    //   //   lat: fix.latitude,
    //   //   lng: fix.longitude,
    //   //   alt: fix.gpsAltitude, // Optional, include altitude if needed
    //   // })), // Convert fixes to objects with lat, lng, and alt (optional)
    //   task: flightData.task, // Information about the flight task, if available.
    //   // You can add more fields as needed.
    // };
    return flightData;
  } catch (error) {
    console.error("Error parsing IGC file:", error);
    return null;
  }
};

export interface FlightStatistics {
  flightDuration: number;
  maxAltitude: number;
  totalDistance: number;
  [key: string]: unknown; // Allow additional properties
}

/**
 * Extracts flight statistics from the given flight data.
 * @param {FlightData} flightData - The flight data obtained from parsing an IGC file.
 * @returns {FlightStatistics | null} An object containing various flight statistics or null if data is invalid.
 */
export const extractFlightStatistics = (flightData: FlightData): FlightStatistics | null => {
  if (!flightData || !flightData.fixes || flightData.fixes.length === 0) {
    return null;
  }

  const { fixes } = flightData;

  // Calculate total flight duration in milliseconds.
  const startTime = new Date(fixes[0].time).getTime();
  const endTime = new Date(fixes[fixes.length - 1].time).getTime();
  const flightDuration = endTime - startTime;

  // Calculate maximum altitude reached during the flight.
  const maxAltitude = fixes.reduce((max, fix) => Math.max(max, fix.gpsAltitude), fixes[0].gpsAltitude);

  // Example calculation: total distance flown (simplified, not accounting for earth's curvature).
  // For a more accurate calculation, you should use a formula that accounts for the Earth's curvature.
  let totalDistance = 0;
  for (let i = 1; i < fixes.length; i++) {
    const distanceBetweenFixes = Math.sqrt(
      Math.pow(fixes[i].latitude - fixes[i - 1].latitude, 2) +
      Math.pow(fixes[i].longitude - fixes[i - 1].longitude, 2)
    );
    totalDistance += distanceBetweenFixes;
  }

  // You can add more statistics calculations here.

  return {
    flightDuration, // in milliseconds
    maxAltitude,
    totalDistance,
    // Add more statistics as needed.
  };
};
