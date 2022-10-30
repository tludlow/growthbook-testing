import { useFeature } from "@growthbook/growthbook-react";

export default function Home() {
  const isRedTextFeature = useFeature("red-text-feature").value;

  if (isRedTextFeature) {
    return <p className="text-red-500">hello</p>;
  }

  return <p>Loading...</p>;
}
