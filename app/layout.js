
import SessionWrapper from "./components/SessionWrapper";
import "./globals.css";


export const metadata = {
  title: "Testimonials.get",
  description: "Collect testimonials all at one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  className="scroll-smooth focus:scroll-auto">
    <SessionWrapper>
      <body>
        {children}
      </body>
    </SessionWrapper>
    </html>
  );
}
