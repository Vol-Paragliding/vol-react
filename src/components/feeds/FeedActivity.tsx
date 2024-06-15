import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { PostActivity, IGCFileAttachment } from "../../interfaces/types";
import { parseIgcFile, FlightData, Fix } from "../../utils/igcParser";
import styles from "./Feeds.module.css";

const FeedActivity: React.FC<{ activity: PostActivity }> = ({ activity }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [isMapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    let isComponentMounted = true;
    const initMap = (flightPath: [number, number][]) => {
      if (
        !isComponentMounted ||
        isMapInitialized ||
        flightPath.length === 0 ||
        !mapRef.current
      )
        return;
      const mapInstance: L.Map = L.map(mapRef.current!).setView(
        flightPath[0],
        13
      );
      L.polyline(flightPath, { color: "blue" }).addTo(mapInstance);
      setMapInitialized(true);
    };

    const fetchAndDisplayFlightPath = async () => {
      const igcAttachment = activity.attachments.find(
        (att): att is IGCFileAttachment => att.type === "igc"
      );

      if (igcAttachment) {
        try {
          const response = await fetch(igcAttachment.url.file);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const igcContent = await response.text();
          if (igcContent.startsWith("<!doctype html>")) {
            throw new Error("Received HTML content instead of IGC file");
          }
          const flightData: FlightData = parseIgcFile(igcContent) as FlightData;
          const flightPath: [number, number][] = flightData.fixes.map(
            (fix: Fix) => [fix.latitude, fix.longitude]
          );
          initMap(flightPath);
        } catch (error) {
          console.error("Error in fetchAndDisplayFlightPath:", error);
          setMapError("Failed to load flight data.");
        }
      }
    };

    if (!isMapInitialized) {
      fetchAndDisplayFlightPath();
    }

    return () => {
      isComponentMounted = false;
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
        </div>
      ))}
      <span className={styles.activityTimestamp}>{activity.time}</span>
    </div>
  );
};

export default FeedActivity;
