import { Link } from "@tanstack/react-router";

const QuotationsMain = () => {
  return (
    <div>
      <p>QuotationsMain</p>
      <Link
        to="/app/quotations/create"
        className="font-bold text-sm flex items-center justify-center px-4 text-gray-900 bg-gray-200 rounded"
      >
        <p>Create quotation</p>
      </Link>
    </div>
  )
};

export default QuotationsMain;