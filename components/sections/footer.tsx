import { portfolioData } from "@/data/projects";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-6 py-8 text-center text-xs text-zinc-600">
        <p>
          &copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
