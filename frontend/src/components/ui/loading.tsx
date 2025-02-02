import Brand from "@/components/ui/brand.tsx";

const Loading = () => {
  return (
    <main className="absolute flex justify-center items-center w-full h-screen top-0 left-0 z-[9999999] bg-primary-foreground">
      <Brand headline="Loading..." direction="col" />
    </main>
  );
};

export default Loading;