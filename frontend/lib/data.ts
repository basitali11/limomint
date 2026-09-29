export const business = {
  name: "LimoMint",
  phone: "647-928-8894",
  phoneHref: "tel:+16479288894",
  city: "Toronto",
  state: "Ontario",
  address: "350 Victoria St, Toronto, ON M5B 2K3",
  email: "waseemtmu1@gmail.com",
};

export const stats = [
  { value: 5, suffix: "+", label: "Years Service in Toronto" },
  { value: 12, suffix: "K+", label: "Happy Customers" },
  { value: 3, suffix: "+", label: "Vehicles in the Fleet" },
];

export type FleetCar = {
  id: string;
  name: string;
  tagline: string;
  pricePerHour: number;
  seats: string;
  bags: string;
  transmission: string;
  icon: "sedan" | "suv" | "luxury";
  features: string[];
  images: string[];
};

export const fleet: FleetCar[] = [
  {
    id: "economy-sedan",
    name: "Economy Sedan",
    tagline: "Simple, reliable rides around town",
    pricePerHour: 60,
    seats: "1-4 passengers",
    bags: "2 bags",
    transmission: "Professional Driver Included",
    icon: "sedan",
    features: [
      "Professional, background-checked driver",
      "Clean, comfortable interior",
      "Air conditioning and Bluetooth audio",
      "Ideal for short local trips",
    ],
    images: ["/fleet/economy-sedan-v2.png"],
  },
  {
    id: "luxury-suv",
    name: "Luxury SUV",
    tagline: "Arrive like it matters",
    pricePerHour: 90,
    seats: "1-4 passengers",
    bags: "3 bags",
    transmission: "Professional Driver Included",
    icon: "luxury",
    features: [
      "Premium interior and exterior",
      "Smooth, quiet ride for business or events",
      "Leather seats and high-end audio",
      "Ideal for business or special occasions",
    ],
    images: ["/fleet/luxury-suv-v2.png"],
  },
  {
    id: "premium-roll-royce",
    name: "Premium Roll-Royce",
    tagline: "Room for the whole trip",
    pricePerHour: 100,
    seats: "1-7 passengers",
    bags: "6 bags",
    transmission: "Professional Driver Included",
    icon: "suv",
    features: [
      "Extra space for passengers and luggage",
      "All-wheel drive available",
      "Great for airport runs and family trips",
    ],
    images: ["/fleet/premium-suv-v2.png"],
  },
];

export type Service = {
  title: string;
  icon: "calendar" | "briefcase" | "plane" | "map" | "shield" | "compass";
  points: string[];
};

export const services: Service[] = [
  {
    title: "Point-to-Point Rides",
    icon: "map",
    points: ["A direct ride between the places you choose", "For appointments, dinners, errands, and everyday travel", "Share your pickup and destination when you book"],
  },
  {
    title: "Hourly Chauffeur",
    icon: "calendar",
    points: ["Book a driver by the hour", "Useful when plans include several stops", "Availability depends on the requested time"],
  },
  {
    title: "Airport Transfers",
    icon: "plane",
    points: ["Pre-arrange a ride to or from the airport", "Share your flight and pickup details when booking", "Luggage capacity depends on the vehicle"],
  },
  {
    title: "Business Travel",
    icon: "briefcase",
    points: ["Rides to meetings, events, and work appointments", "Reservations can be made for guests", "Ask about regular trips"],
  },
  {
    title: "Special Occasions",
    icon: "shield",
    points: ["A private ride for dinners, celebrations, and events", "Plan the pickup and destination ahead of time", "Check availability for the requested date"],
  },
  {
    title: "Custom Trips",
    icon: "compass",
    points: ["Need multiple stops or a less common route?", "Include the itinerary in the request", "Details are confirmed before booking"],
  },
];

export type ServiceCard = {
  title: string;
  icon: "calendar" | "briefcase" | "plane" | "map" | "heart" | "swap" | "van" | "compass";
  text: string;
};

export const serviceCards: ServiceCard[] = [
  { title: "Point-to-Point", icon: "map", text: "Enter the pickup location, destination, and preferred time to request a direct ride." },
  { title: "Airport Transfers", icon: "plane", text: "Arrange a ride to or from the airport and include your flight and pickup details." },
  { title: "Hourly Service", icon: "calendar", text: "For days when one destination is not the whole plan, ask about booking by the hour." },
  { title: "Business Travel", icon: "briefcase", text: "A private ride to meetings, appointments, or to collect a visiting colleague." },
  { title: "Events & Occasions", icon: "heart", text: "Plan your ride to dinner, a celebration, or an event across town." },
  { title: "Multi-Stop Trips", icon: "swap", text: "Include each stop in the itinerary so the route can be reviewed before confirmation." },
  { title: "Extra Space", icon: "van", text: "For larger groups or extra luggage, check the vehicle capacity before booking." },
  { title: "Around Toronto", icon: "compass", text: "For local trips and journeys beyond the city, get in touch about your route." },
];

export const faqs = [
  {
    q: "Are the rides self-drive?",
    a: "No. LimoMint provides chauffeur-driven rides. A driver handles the trip; passengers do not drive or take possession of the vehicle.",
  },
  {
    q: "Which rides are available?",
    a: "You can request point-to-point rides, airport transfers, hourly service, and rides for business or special occasions. Use the Reservations page to enter your trip details.",
  },
  {
    q: "Which vehicle suits the trip?",
    a: "The Fleet page lists the vehicle types and passenger and luggage capacities. Choose based on the number of passengers and bags in the reservation.",
  },
  {
    q: "How are fares calculated?",
    a: "Rates depend on the route, service, and selected vehicle. Enter the trip details in the reservation system to see available pricing.",
  },
  {
    q: "Are extra stops or hourly trips available?",
    a: "Availability depends on the trip. Include all stops or requested hours in the reservation details for review.",
  },
  {
    q: "When is a reservation confirmed?",
    a: "An online request is not confirmed until LimoMint reviews it and contacts the passenger with the reservation details.",
  },
  {
    q: "How can a reservation be changed or cancelled?",
    a: "Contact LimoMint as soon as plans change. Any cancellation terms are shared with the reservation.",
  },
  {
    q: "Can a ride be arranged for another passenger?",
    a: "Yes. Add the passenger's contact details when booking. Include any extra stops in the request for review.",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Easiest ride I've ever booked. The driver was right on time and the car was spotless.",
    name: "Sarah M.",
  },
  {
    quote:
      "No hidden fees, no surprises at drop-off. LimoMint is now the only car service I call in Toronto.",
    name: "James T.",
  },
  {
    quote:
      "Booked same-day for a work trip and they had a luxury sedan and driver ready in under an hour. Impressive.",
    name: "Priya R.",
  },
  {
    quote:
      "Friendly driver, clean vehicle, fair pricing. Exactly what you want from a car service.",
    name: "David K.",
  },
];
