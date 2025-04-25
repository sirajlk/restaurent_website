import FoodMenu from "./FoodMenu";
import FoodMenuEnhanced from "./FoodMenu";

export default function TodaysSpecial() {
    return (
      <div className="w-full bg-black py-16 relative">
        <div className="container mx-auto px-4 max-w-3xl relative">
          {/* Left Arrow */}
          <svg
            className="absolute left-0 top-1/2 transform -translate-y-1/2 w-32 md:w-40"
            viewBox="0 0 150 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M149 1C149 1 100 10 60 50C20 90 1 99 1 99"
              stroke="#4D4D4D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
  
          {/* Content */}
          <div className="text-center z-10 relative">
            <h2 className="text-amber-500 font-serif text-3xl md:text-4xl font-medium mb-3">Today's Special</h2>
          </div>
  
          {/* Right Arrow */}
          <svg
            className="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 md:w-40"
            viewBox="0 0 150 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1C1 1 50 10 90 50C130 90 149 99 149 99"
              stroke="#4D4D4D"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <FoodMenuEnhanced />
      </div>
    )
  }
  