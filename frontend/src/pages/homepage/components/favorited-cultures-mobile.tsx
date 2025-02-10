import { Culture } from "@/lib/types.ts";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import CultureCard from "@/components/ui/cultures-card.tsx";
import { useRef } from "react";
import { Button } from "@/components/ui/button.tsx";
import { ArrowLeft, ArrowRight } from "lucide-react";

const FavoritedCulturesMobile = ({ cultures }: { cultures: Culture[] }) => {
  const swiperRef = useRef() as any;
  return (
    <div className="md:hidden overflow-hidden rounded-[1.3rem] w-full">
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={50}
        slidesPerView={1}
      >
        {cultures.map((culture: Culture, index: number) => {
          return (
            <SwiperSlide key={index}>
              <CultureCard culture={culture} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="flex mt-4 justify-center items-center gap-2">
        <Button onClick={() => swiperRef?.current?.slidePrev()} size="icon" className="rounded-full" variant="ghost">
          <ArrowLeft />
        </Button>
        <Button onClick={() => swiperRef?.current?.slideNext()} size="icon" className="rounded-full" variant="ghost">
          <ArrowRight />
        </Button>
      </div>
    </div>
  );
};

export default FavoritedCulturesMobile;
