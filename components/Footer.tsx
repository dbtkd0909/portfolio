import { Mail, Linkedin, Instagram, Youtube } from "lucide-react";

const links = [
  { href: "mailto:hello@example.com", label: "Email", Icon: Mail },
  { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.instagram.com/", label: "Instagram", Icon: Instagram },
  { href: "https://www.youtube.com/", label: "Showreel", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 px-4 py-10 md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
        <p className="text-sm text-neutral-500">
          © {new Date().getFullYear()} VFX Artist. All rights reserved.
        </p>

        <div className="flex items-center gap-5">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-neutral-400 transition hover:text-emerald-400"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
