import Image from "next/image";
import icon from "@/assets/svgs/file.svg";

// make it a indexed page with a welcome message, description about the business, contact information, and social media links

// this is not showing up in the browser, make sure to check the console for any errors
export const metadata = {
  title: "Welcome to Orogud",
  description: "Your go-to destination for organic products like jaggery.",
  keywords: "organic, jaggery, orogud, organic products, contact orogud",
  authors: [{ name: "Orogud Team", url: "https://orogud.com" }],
  creator: "Orogud Team",
  openGraph: {
    title: "Welcome to Orogud",
    description: "Your go-to destination for organic products like jaggery.",
    url: "https://orogud.com",
    siteName: "Orogud",
    images: [
      {
        url: icon.src, // Replace with your actual image URL
        width: 1200,
        height: 630,
        alt: "Orogud - Organic Products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: icon.src,
  },
};


export default function Home() {
return <div className="flex items-center justify-center h-screen">
  <div className="flex flex-col items-center p-4 ">
   <Image
      src={icon}
      alt="File Icon"
      width={100}
      height={100}
      className="mb-4"
    />
    {/* contact information */}
    <h1 className="text-3xl font-bold mb-2">Welcome to Our Website</h1>
    {/* description about business, its called orogud we deal in organic stuff like jeggary and all */}
    <p className="text-lg text-center mb-4">
      Orogud is your go-to destination for all things organic. From jaggery to a wide range of organic products, we are committed to providing you with the best quality.
    </p>
    {/* contact information */}
    <p className="text-lg text-center mb-4">
      For inquiries, please contact us at: <br />
      <a href="mailto:founders@orogud.com" className="text-blue-500 hover:underline">
        founders@orogud.com
      </a>
    </p>
    {/* social media links */}
    <div className="flex space-x-4">
      <a href="https://www.instagram.com/orogud_" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
        Instagram
      </a>
  </div>
  </div>
</div>
}
