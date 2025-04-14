// src/analytics.js
import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-GL3T16FR3C");
};

export const logPageView = (path) => {
  ReactGA.send({ hitType: "pageview", page: path });
};