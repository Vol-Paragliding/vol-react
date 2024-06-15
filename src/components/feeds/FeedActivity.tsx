import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { PostActivity } from "../../interfaces/types";
import { parseIgcFile, FlightData, Fix } from "../../utils/igcParser";
import styles from "./Feeds.module.css";

const FeedActivity: React.FC<{ activity: PostActivity }> = ({ activity }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    let isComponentMounted = true;
    console.log("FeedActivityLeaf useEffect called for activity:", activity.id);

    const initMap = (flightPath: [number, number][]) => {
      if (
        !isComponentMounted ||
        isMapInitialized ||
        flightPath.length === 0 ||
        !mapRef.current
      )
        return;
      console.log("Initializing map for activity:", activity.id);
      const mapInstance: L.Map = L.map(mapRef.current).setView(
        flightPath[0],
        13
      );
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapInstance);
      L.polyline(flightPath, { color: "blue" }).addTo(mapInstance);
      setMapInitialized(true);
    };

    const fetchAndDisplayFlightPath = async () => {
      if (activity.attachments.some((att) => att.type === "igc")) {
        const igcAttachment = activity.attachments.find(
          (att) => att.type === "igc"
        );
        if (igcAttachment) {
          try {
            const response = await fetch(igcAttachment.url);
            const igcContent = await response.text();
            const flightData: FlightData = parseIgcFile(igcContent) as FlightData;
            const flightPath: [number, number][] = flightData.fixes.map((fix: Fix) => [
              fix.latitude,
              fix.longitude,
            ]);
            initMap(flightPath);
          } catch (error) {
            console.error("Error in fetchAndDisplayFlightPath:", error);
            setMapError("Failed to load flight data.");
          }
        }
      }
    };

    if (!isMapInitialized) {
      fetchAndDisplayFlightPath();
    }

    return () => {
      isComponentMounted = false;
      console.log("Cleaning up map for activity:", activity.id);
    };
  }, [activity, isMapInitialized]);

  const attachments = Array.isArray(activity.attachments)
    ? activity.attachments
    : [];

  return (
    <div className={styles.activityContainer}>
      <h3 className={styles.activityTitle}>{activity.verb}</h3>
      <p className={styles.activityDescription}>{activity.object as string}</p>
      {attachments.map((attachment, index) => (
        <div key={index} className={styles.attachment}>
          {attachment.type === "igc" && (
            <div className={styles.mapContainer}>
              {mapError && <p className={styles.error}>{mapError}</p>}
              <div ref={mapRef} className={styles.leafletMap}></div>
            </div>
          )}

          {attachment.type === "image" && (
            <img
              src={attachment.url}
              alt="Attachment"
              className={styles.attachmentImage}
            />
          )}

          {attachment.type === "video" && (
            <video
              controls
              className={styles.attachmentVideo}
              onError={(e) => console.log("Video cannot be loaded", e)}
            >
              <source src={attachment.url} type="video/mp4" />
              <source
                src={attachment.url.replace(".mp4", ".ogg")}
                type="video/ogg"
              />
              <source
                src={attachment.url.replace(".mp4", ".webm")}
                type="video/webm"
              />
              Your browser does not support the video tag or the video format.
            </video>
          )}

          {attachment.type === "file" && (
            <a
              href={attachment.url}
              download
              className={styles.attachmentLink}
            >
              Download IGC File
            </a>
          )}
        </div>
      ))}
      <span className={styles.activityTimestamp}>{activity.time}</span>
    </div>
  );
};

export default FeedActivity;
