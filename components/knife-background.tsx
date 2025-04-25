export default function KnifeBackground() {
    return (
      <svg
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45"
        width="800"
        height="800"
        viewBox="0 0 800 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M400 100C400 100 420 150 420 300C420 450 350 600 300 700"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M400 100C400 100 380 150 380 300C380 450 450 600 500 700"
          stroke="#FFFFFF"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path d="M400 100C400 100 400 150 400 700" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" />
        <path
          d="M350 80L450 80C450 80 470 80 470 100C470 120 450 120 450 120L350 120C350 120 330 120 330 100C330 80 350 80 350 80Z"
          fill="#FFFFFF"
        />
      </svg>
    )
  }
  