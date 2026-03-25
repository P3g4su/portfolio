import { Fira_Code } from "next/font/google";
import "./globals.css";
import PageTransition from "../components/PageTransition";

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
});

export const metadata = {
  title: "P3g4su",
  description: "Security Engineer · AppSec · Offensive Security",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={firaCode.variable}>
      <body>
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}