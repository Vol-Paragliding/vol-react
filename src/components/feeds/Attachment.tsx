import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { AttachmentType } from "../../interfaces/types";
import { parseIgcFile, FlightData, Fix } from "../../utils/igcParser";
import styles from "./Feeds.module.css";

const Attachment: React.FC<{ attachment: AttachmentType }> = ({
  attachment,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
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
          .forEach((a: HTMLElement) => {
            a.style.color = "rgba(0, 0, 0, 0.5)";
            a.style.textDecoration = "none";
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
      if (attachment.type !== "igc") return;

      try {
        const response = await fetch(attachment.url.file);
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
        setMapInitialized(false);
      }
    };

    if (!isMapInitialized) {
      fetchAndDisplayFlightPath();
    }

    return () => {
      isComponentMounted = false;
    };
  }, [attachment, isMapInitialized]);

  return (
    <>
      {attachment.type === "igc" && (
        <div className={styles.mapContainer}>
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
    </>
  );
};

export default Attachment;
