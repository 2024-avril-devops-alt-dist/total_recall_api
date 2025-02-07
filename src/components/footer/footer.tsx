import Link from "next/link";
import { Icons } from "@/components/ui/Icons";
import Container from "@/components/Container";
import { cn } from "@/lib/utils";
import { PAGE } from "@/constants/page";

const dataLinks = [
  {
    id: 1,
    title: "about",
    href: PAGE.about,
  },
  {
    id: 2,
    title: "Terms and conditions of use",
    href: PAGE.cgu,
  },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-primary-title lg:mt-4">
      <Container
        className={cn(
          "py-12 flex items-center justify-center bg-typography-titre font-semibold text-typography-texte lg:justify-around",
          "flex-col gap-4",
          "justify-evenly lg:flex-row"
        )}
      >
        <nav>
          <ul className="g-2 flex flex-col justify-center gap-2 text-center text-sm lg:flex-row lg:gap-5">
            {dataLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-center whitespace-normal"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap justify-around gap-3 lg:order-2">
          <a href="https://www.linkedin.com/company/kitlenid">
            <Icons.LinkedIn className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/kitlenid">
            <Icons.Instagram className="w-6 h-6" />
          </a>
        </div>
        <div className="h-px w-3/4 bg-white bg-typography-texte lg:order-1 lg:hidden"></div>
        <p className="text-sm">
          © {new Date().getFullYear()} Copyright Golobe
        </p>
      </Container>
    </footer>
  );
};
