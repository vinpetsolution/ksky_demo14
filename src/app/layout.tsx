import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { ModalProvider } from "@/contexts/ModalContext";
import { DesktopMenuProvider } from "@/contexts/DesktopMenuContext";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "KSKY SOLUTION",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${notoSansKR.variable} h-full antialiased`}
    >
      <body className="min-h-screen text-white flex flex-col">
        <MotionProvider>
          <AuthProvider>
            <ModalProvider>
              <DesktopMenuProvider>
                {children}
              </DesktopMenuProvider>
            </ModalProvider>
          </AuthProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
