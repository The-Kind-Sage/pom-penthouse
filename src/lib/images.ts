import img1 from "@/assets/1.jpeg";
import img2 from "@/assets/2.jpeg";
import img3 from "@/assets/3.jpeg";
import img4 from "@/assets/4.jpeg";
import img5 from "@/assets/5.jpeg";
import img6 from "@/assets/6.jpeg";
import img7 from "@/assets/7.jpeg";
import img8 from "@/assets/8.jpeg";
import img9 from "@/assets/9.jpeg";
import img10 from "@/assets/10.jpeg";
import img11 from "@/assets/11.jpeg";
import img12 from "@/assets/12.jpeg";
import img13 from "@/assets/13.jpeg";
import img14 from "@/assets/14.jpeg";
import img15 from "@/assets/15.jpeg";
import homeImg from "@/assets/home.jpg";
import aptFamily from "@/assets/apt-family.jpg";
import galBath from "@/assets/gal-bath.jpg";
import galBedroom from "@/assets/gal-bedroom.jpg";
import galKitchen from "@/assets/gal-kitchen.jpg";
import galLake from "@/assets/gal-lake.jpg";
import lifeBalcony from "@/assets/life-balcony.jpg";
import n844 from "@/assets/395344844.jpg";
import n857 from "@/assets/395344857.jpg";
import n874 from "@/assets/395344874.jpg";
import n879 from "@/assets/395344879.jpg";
import n888 from "@/assets/395344888.jpg";
import n900 from "@/assets/395344900.jpg";
import n698 from "@/assets/405267698.jpg";
import n709 from "@/assets/405267709.jpg";
import n735 from "@/assets/405267735.jpg";
import n751 from "@/assets/405267751.jpg";
import n760 from "@/assets/405267760.jpg";
import n676 from "@/assets/405915676.jpg";
import n677 from "@/assets/405915677.jpg";
import n678 from "@/assets/405915678.jpg";
import n680 from "@/assets/405915680.jpg";
import n696 from "@/assets/405915696.jpg";
import n699 from "@/assets/405915699.jpg";
import n702 from "@/assets/405915702.jpg";
import n703 from "@/assets/405915703.jpg";
import n703b from "@/assets/405915703b.jpg";
import n706 from "@/assets/405915706.jpg";
import n201 from "@/assets/405916201.jpg";
import n209 from "@/assets/405916209.jpg";
import n211 from "@/assets/405916211.jpg";
import n216 from "@/assets/405916216.jpg";
import n939 from "@/assets/405916939.jpg";

export type PomImage = {
  id: number;
  src: string;
  alt: string;
};

export const IMAGES: PomImage[] = [
  { id: 1, src: img1, alt: "Pom PentHouse living room" },
  { id: 2, src: img2, alt: "Pom PentHouse interior" },
  { id: 3, src: img3, alt: "Pom PentHouse lounge" },
  { id: 4, src: img4, alt: "Pom PentHouse dining" },
  { id: 5, src: img5, alt: "Pom PentHouse entrance" },
  { id: 6, src: img6, alt: "Building exterior" },
  { id: 7, src: img7, alt: "Lounge area" },
  { id: 8, src: img8, alt: "Dining space" },
  { id: 9, src: img9, alt: "Sunset view" },
  { id: 10, src: img10, alt: "Corridor" },
  { id: 11, src: img11, alt: "Rooftop terrace" },
  { id: 12, src: img12, alt: "Night view" },
  { id: 13, src: img13, alt: "Reception" },
  { id: 14, src: img14, alt: "Garden area" },
  { id: 15, src: img15, alt: "Poolside" },
  { id: 16, src: homeImg, alt: "Penthouse living room" },
  { id: 17, src: aptFamily, alt: "Family apartment" },
  { id: 18, src: galBedroom, alt: "Bedroom" },
  { id: 19, src: galKitchen, alt: "Kitchen" },
  { id: 20, src: galLake, alt: "Phewa Lake view" },
  { id: 21, src: galBath, alt: "Bathroom" },
  { id: 22, src: lifeBalcony, alt: "Balcony view" },
  { id: 23, src: n844, alt: "Living space" },
  { id: 24, src: n857, alt: "Interior detail" },
  { id: 25, src: n874, alt: "Room view" },
  { id: 26, src: n879, alt: "Modern interior" },
  { id: 27, src: n888, alt: "Cozy corner" },
  { id: 28, src: n900, alt: "Open layout" },
  { id: 29, src: n698, alt: "Suite interior" },
  { id: 30, src: n709, alt: "Living area" },
  { id: 31, src: n735, alt: "Bedroom suite" },
  { id: 32, src: n751, alt: "Designer space" },
  { id: 33, src: n760, alt: "Contemporary room" },
  { id: 34, src: n676, alt: "Elegant interior" },
  { id: 35, src: n677, alt: "Spacious lounge" },
  { id: 36, src: n678, alt: "Wooden accents" },
  { id: 37, src: n680, alt: "Warm ambiance" },
  { id: 38, src: n696, alt: "Comfort living" },
  { id: 39, src: n699, alt: "Premium suite" },
  { id: 40, src: n702, alt: "Natural light" },
  { id: 41, src: n703, alt: "Quiet retreat" },
  { id: 42, src: n703b, alt: "Relaxation space" },
  { id: 43, src: n706, alt: "Urban comfort" },
  { id: 44, src: n201, alt: "Bright interior" },
  { id: 45, src: n209, alt: "Cozy bedroom" },
  { id: 46, src: n211, alt: "Open space" },
  { id: 47, src: n216, alt: "Modern living" },
  { id: 48, src: n939, alt: "Peaceful corner" },
];

export const photo = (n: number) => IMAGES[n - 1];
