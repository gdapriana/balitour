import {useEffect, useState} from "react";

const Map = ({ coordinates }: { coordinates: string | undefined }) => {
  const [cd, setCd] = useState<string>()
  const [latitude, setLatitude] = useState<number>()
  const [longitude, setLongitude] = useState<number>()

  useEffect(() => {
    if (coordinates) {
      setCd(coordinates)
    }
  }, [coordinates])

  useEffect(() => {
    const fullCoordinates = cd?.split(",")
    if (fullCoordinates) {
      setLatitude(parseFloat(fullCoordinates[0].replace(/\s+$/, '')))
      setLongitude(parseFloat(fullCoordinates[1].replace(/\s+$/, '')))
    }
  }, [cd]);

  if (!latitude || !longitude) {
    return <div>Loading...</div>
  }

  return (
    <main className="w-full">
      <iframe
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15774.88444067176!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd246bc2ab70d43%3A0x82feaae12f4ab48e!2sPantai%20Kuta!5e0!3m2!1sid!2sid!4v1738676479742!5m2!1sid!2sid`}
        width="600" height="450" loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"></iframe>
    </main>
  )
};

export default Map;