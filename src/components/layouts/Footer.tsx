import Link from "next/link";

const footerNav = [
    { label: "Privacy Policy", href: "/#" },
    { label: "About Us", href: "/#" },
    { label: "Affiliate Program", href: "/#" },
    { label: "Responsible Gaming", href: "/#" },
    { label: "Terms and Conditions", href: "/#" },
    { label: "Bonus Terms & Conditions", href: "/#" },
] as const;

const Footer = () => {
    return (
        <footer className="mt-auto w-full overflow-hidden bg-black py-8">
            <nav
                aria-label="Footer links"
                className="mx-auto flex max-w-7xl flex-wrap items-center justify-center divide-x divide-[#786f8e] px-3 py-4 text-sm text-white"
            >
                {footerNav.map((item) => (
                    <Link
                        key={item.href + item.label}
                        href={item.href}
                        className="px-4 py-1 text-white hover:text-[#d4af37] hover:underline sm:px-5"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>
            <p className="text-center text-sm text-[#f6e7c1]">
                © 2026 KSKY SOLUTION. All Rights Reserved
            </p>
        </footer>
    );
};

export default Footer;
