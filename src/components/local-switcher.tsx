"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

import Flag from "react-world-flags";

export default function LocalSwitcher() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const localActive = useLocale();
  const pathname = usePathname();

  const handleSelect = (lang: string) => {
    startTransition(() => {
      const pathSegments = pathname.split('/');  
      pathSegments[1] = lang;  // Replace the language segment (assuming it's the first segment after the initial '/')
      const newPath = pathSegments.join('/');  
      router.replace(newPath);  
    });
  };

  return (
    <>
      <div className="dropdown">
        <a
          className="dropdown-toggle d-flex align-items-center text-warning"
          href="#"
          id="Dropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Flag code={localActive === "tr" ? "tr" : "us"} height={16} />
        </a>

        <ul
          className="dropdown-menu dropdown-menu-end"
          aria-labelledby="Dropdown"
        >
          <li>
            <a
              className="dropdown-item d-flex align-items-center"
              href="#"
              onClick={() => handleSelect("en")}
            >
              <Flag code="us" height={16} />
              <span className="ms-2">English</span>
              {localActive === "en" && (
                <i className="fa fa-check text-success ms-auto"></i>
              )}
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a
              className="dropdown-item d-flex align-items-center"
              href="#"
              onClick={() => handleSelect("tr")}
            >
              <Flag code="tr" height={16} />
              <span className="ms-2">Türkçe</span>
              {localActive === "tr" && (
                <i className="fa fa-check text-success ms-auto"></i>
              )}
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}
