import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button.tsx";
import {AlignJustify} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import Brand from "@/components/ui/brand.tsx";
import {navigations} from "@/lib/metadata.ts";
import {Navigation} from "@/lib/types.ts";
import {Link} from "react-router-dom";
import UserBtn from "@/components/ui/user-btn.tsx";
import {useState} from "react";

const Hamburger = ({ className }: {className?:string}) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className={cn("", className)} size="icon">
          <AlignJustify />
        </Button>
      </SheetTrigger>
      <SheetContent className="z-[9999]">
        <SheetHeader>
          <SheetTitle>
            <Brand
              className={{icon: "w-6 h-6"}}
              headline={import.meta.env.VITE_PUBLIC_APP} direction="row" />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 mt-8 justify-start items-center">
          {navigations.map((navigation: Navigation, index: number) => {
            return (
              <Link onClick={() => setOpen(false)} to={navigation.path} key={index} className="text-muted-foreground hover:text-primary">
                {navigation.title}
              </Link>
            )
          })}
          <UserBtn isOpen={true} username="gedeapriana" className={{root: "mt-8 border"}} avatarOnly={false} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Hamburger;