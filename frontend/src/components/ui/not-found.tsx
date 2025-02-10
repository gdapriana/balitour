import { cn } from "@/lib/utils.ts";
import Brand from "@/components/ui/brand.tsx";

const NotFound = ({ title, height = "h-[400px]" }: { title?: string; height?: string }) => {
  return (
    <div className={cn("w-full flex justify-center items-center", height)}>
      <Brand className={{ icon: "w-10" }} headline={`${title} Not Found`} direction="col" />
    </div>
  );
};

export default NotFound;
