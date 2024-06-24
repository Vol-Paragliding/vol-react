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
}

export const parseIgcFile = (igcFileContent: string): FlightData | null => {
  try {
    const flightData = parse(igcFileContent) as unknown as FlightData;
    return flightData;
  } catch (error) {
    console.error("Error parsing IGC file:", error);
    return null;
  }
};

export interface FlightStatistics {
  flightDuration: string;
  maxAltitude: number;
  totalDistance: number;
}

/**
 * Extracts flight statistics from the given flight data.
 * @param {FlightData} flightData - The flight data obtained from parsing an IGC file.
 * @returns {FlightStatistics | null} An object containing various flight statistics or null if data is invalid.
 */
export const extractFlightStatistics = (flightData: FlightData): FlightStatistics | null => {
  if (!flightData || !flightData.fixes || flightData.fixes.length === 0) {
    console.error("Invalid flight data:", flightData);
    return null;
  }

  const { fixes } = flightData;

  // Ensure the time is in the correct format
  const parseTime = (timeStr: string): Date | null => {
    const regex = /(\d{2}):(\d{2}):(\d{2})/;
    const match = timeStr.match(regex);
    if (match) {
      const [, hours, minutes, seconds] = match;
      const date = new Date();
      date.setUTCHours(parseInt(hours), parseInt(minutes), parseInt(seconds));
      return date;
    }
    console.error("Failed to parse time:", timeStr);
    return null;
  };

  const startTime = parseTime(fixes[0].time);
  const endTime = parseTime(fixes[fixes.length - 1].time);

  if (!startTime || !endTime) {
    console.error("Failed to parse start or end time:", { startTime, endTime });
    return null;
  }

  const formatDuration = (milliseconds: number): string => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  };

  const flightDuration = formatDuration(endTime.getTime() - startTime.getTime())
  console.log(flightDuration);

  // Calculate maximum altitude reached during the flight.
  const maxAltitude = fixes.reduce((max, fix) => Math.max(max, fix.gpsAltitude), fixes[0].gpsAltitude);

  // Calculate total distance flown using the Haversine formula.
  const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRadians = (deg: number): number => deg * (Math.PI / 180);
    const R = 6371; // Earth's radius in kilometers

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  let totalDistance = 0;
  for (let i = 1; i < fixes.length; i++) {
    totalDistance += haversineDistance(
      fixes[i].latitude, fixes[i].longitude,
      fixes[i - 1].latitude, fixes[i - 1].longitude
    );
  }
  console.log(totalDistance);

  return {
    flightDuration,
    maxAltitude,
    totalDistance,
  };
};
