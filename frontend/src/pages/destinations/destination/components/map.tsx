import { motion as m } from "motion/react";
import { useEffect, useState } from "react";

const Map = ({ coordinates }: { coordinates: string | undefined }) => {
  const [cd, setCd] = useState<string>();
  const [latitude, setLatitude] = useState<number>();
  const [longitude, setLongitude] = useState<number>();

  useEffect(() => {
    if (coordinates) {
      setCd(coordinates);
    }
  }, [coordinates]);

  useEffect(() => {
    const fullCoordinates = cd?.split(",");
    if (fullCoordinates) {
      setLatitude(parseFloat(fullCoordinates[0].replace(/\s+$/, "")));
      setLongitude(parseFloat(fullCoordinates[1].replace(/\s+$/, "")));
    }
  }, [cd]);

  if (!latitude || !longitude) {
    return <div>Loading...</div>;
  }

  return (
    <m.main
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
      transition={{ duration: 1 }}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      className="w-full rounded-3xl overflow-hidden"
    >
      <iframe
        width="100%"
        className="aspect-video grayscale"
        src={`//maps.google.com/maps?q=${latitude},${longitude}&z=10&output=embed&t=p`}
      ></iframe>
    </m.main>
  );
};

export default Map;
