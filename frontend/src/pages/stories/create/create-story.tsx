import { useContext, useState } from "react";
import { AuthContext } from "@/provider/auth.tsx";
import { Destination, Image, Source } from "@/lib/types.ts";
import Brand from "@/components/ui/brand.tsx";
import Cover from "@/pages/stories/create/components/cover.tsx";
import { Button } from "@/components/ui/button.tsx";

const CreateStory = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState<string>("welcome to black paradise");
  const [description, setDescription] = useState<string>(
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa doloremque fuga illum, molestias neque perferendis quas recusandae reiciendis rerum ullam! Architecto dolore ex fugiat molestiae nihil odit quas reprehenderit tempore.",
  );
  const [cover, setCover] = useState<string>();
  const [body, setBody] = useState<string>(
    "<p><h3>Hello World</h3><br>My Name is i Komang Gede Apriana, im from bali indonesia</p>",
  );
  const [readingTime, setReadingTime] = useState<number>(5);
  const [relatedDestinationSlug, setRelatedDestinationSlug] = useState<string>("");
  const [relatedCultureSlug, setRelatedCultureSlug] = useState<string>();
  const [relatedDistrictSlug, setRelatedDistrictSlug] = useState<string>();
  const [relatedDestinationQuery, setRelatedDestinationQuery] = useState<string>();
  const [relatedCultureQuery, setRelatedCultureQuery] = useState<string>();
  const [relatedDistrictQuery, setRelatedDistrictQuery] = useState<string>();
  const [soures, setSoures] = useState<Source[]>();
  const [images, setImages] = useState<Image[]>();

  const onSubmitHandle = (e: any) => {
    e.preventDefault();

    // 1. get cover link
    // 2. get related item slug
    // 3. post new stories
    // 4. post new sources with storySlug
    // 5. post new images with storySlug
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-5xl gap-8 flex flex-col justify-start items-stretch">
          <header className="my-10">
            <Brand headline="Create Story" direction="row" className={{ icon: "w-10" }} />
          </header>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2 flex flex-col justify-start items-stretch">
              <Cover cover={{ value: cover, setValue: setCover }} />
            </div>
            <div className="w-full md:w-1/2"></div>
          </div>
          <Button onClick={onSubmitHandle} className="w-1/2 m-auto">
            Post
          </Button>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa doloremque fuga illum, molestias neque
          perferendis quas recusandae reiciendis rerum ullam! Architecto dolore ex fugiat molestiae nihil odit quas
          reprehenderit tempore.
        </div>
      </div>
    </div>
  );
};

export default CreateStory;
