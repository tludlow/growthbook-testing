import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import { useEffect } from "react";
import "../styles/globals.css";

const growthbook = new GrowthBook({
  // enableDevMode: true allows you to use the Chrome DevTools Extension to test/debug.
  enableDevMode: true,
  trackingCallback: (experiment, result) => {
    console.log({
      experimentId: experiment.key,
      variationId: result.variationId,
    });
  },
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Load feature definitions from API
    // In production, we recommend putting a CDN in front of the API endpoint
    fetch(
      "http://localhost:3100/api/features/prod_wZXEJt1G112o9UbqhjE3gElXxetJLEErK3KYgELWh3U"
    )
      .then((res) => res.json())
      .then((json) => {
        growthbook.setFeatures(json.features);
      });

    const id = Math.floor(Math.random() * 2); // 0 or 1
    // console.log(id);

    // TODO: replace with real targeting attributes
    growthbook.setAttributes({
      id,
      loggedIn: true,
      employee: true,
      url: window.location.href,
    });
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>
      <Component />
    </GrowthBookProvider>
  );
}

export default MyApp;
