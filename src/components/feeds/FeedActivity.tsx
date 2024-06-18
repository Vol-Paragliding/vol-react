import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { PostActivity, IGCFileAttachment } from "../../interfaces/types";
import { parseIgcFile, FlightData, Fix } from "../../utils/igcParser";
import { UserAvatar } from "../profile/UserAvatar";
import { formatDateTime } from "../utils/dateUtils";
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
      const mapInstance: L.Map = L.map(mapRef.current!, {
        zoomControl: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        dragging: false,
      }).setView(flightPath[0], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OSM",
      }).addTo(mapInstance);
      mapInstance.fitBounds(flightPath);

      const attributionControl = document.querySelector(
        ".leaflet-control-attribution"
      );
      if (attributionControl) {
        (attributionControl as HTMLElement).style.opacity = "0.5";
        (attributionControl as HTMLElement).style.fontSize = "10px";
        (attributionControl as HTMLElement)
          .querySelectorAll("a")
          .forEach((a: Element) => {
            (a as HTMLElement).style.color = "rgba(0, 0, 0, 0.5)";
            (a as HTMLElement).style.textDecoration = "none";
          });
        const leafletLink = (attributionControl as HTMLElement).querySelector(
          'a[href="https://leafletjs.com"]'
        );
        const spanSeparator = (attributionControl as HTMLElement).querySelector(
          'span[aria-hidden="true"]'
        );
        if (leafletLink && spanSeparator) {
          (leafletLink as HTMLElement).style.display = "none";
          (spanSeparator as HTMLElement).style.display = "none";
        }
      }
      L.polyline(flightPath, { color: "blue" }).addTo(mapInstance);
      setMapInitialized(true);
    };

    const fetchAndDisplayFlightPath = async () => {
      if (!activity.attachments) return;

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

  const formattedTime = formatDateTime(activity.time);
  const avatarUrl = activity?.actor.data?.profilePicture ?? "";

  console.log("activity", activity);

  return (
    <div className={styles.activityContainer}>
      <div className={styles.activityHeader}>
        <UserAvatar url={typeof avatarUrl === "string" ? avatarUrl : ""} />
        <span className={styles.activityTimestamp}>{formattedTime}</span>
        <h3 className={styles.activityTitle}>{activity.verb}</h3>
      </div>
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
      <div className={styles.activityFooter}>
        <p className={styles.activityDescription}>
          {activity.object as string}
        </p>
      </div>
    </div>
  );
};

export default FeedActivity;
