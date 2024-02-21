import { MdAnalytics, MdSafetyCheck, MdBook } from "react-icons/md";
import { Compass, SearchCheck, Bot } from 'lucide-react'

const ourServices = [
  {
    icon: <SearchCheck />,
    heading: "Product Review",
    detail:
      "Gives you the best info on the top products of your search",
  },
  {
    icon: <Compass />,
    heading: "Product Comparison Tool",
    detail: "Guides you by comparing Prices and Ratings of different Products",
  },
  {
    icon: <Bot />,
    heading: "AI Chatbot",
    detail: "Gives you personalized details on the products you should use for any scenario",
  },
];

export default ourServices;
