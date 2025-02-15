import { useContext, useState } from "react";
import { AuthContext } from "@/provider/auth.tsx";
import { Destination, Image, Source } from "@/lib/types.ts";
import Brand from "@/components/ui/brand.tsx";

const CreateStory = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState<string>();
  const [description, setDescription] = useState<string>();
  const [cover, setCover] = useState<string>();
  const [body, setBody] = useState<string>();
  const [readingTime, setReadingTime] = useState<number>();
  const [relatedDestination, setRelatedDestination] = useState<string>();
  const [relatedCulture, setRelatedCulture] = useState<string>();
  const [relatedDistrict, setRelatedDistrict] = useState<string>();
  const [soures, setSoures] = useState<Source[]>();
  const [images, setImages] = useState<Image[]>();

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-5xl flex flex-col justify-start items-stretch">
          <header className="my-10">
            <Brand headline="Create Story" direction="row" className={{ icon: "w-10" }} />
          </header>
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
