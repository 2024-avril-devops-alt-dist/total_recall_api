import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <main
      className={cn(
        "max-w-[1480px] mx-auto xl:px-[150px] md:px-6 px-4 mb-16 lg:mb-4",
        className
      )}
    >
      {children}
    </main>
  );
};

export default Container;
