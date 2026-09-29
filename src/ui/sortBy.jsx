import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import PropTypes from "prop-types";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";

  function handleChange(e) {
    // searchParams.set("sortBy", e.target.value);
    // setSearchParams(searchParams);
    const next = new URLSearchParams(searchParams);
    next.set("sortBy", e.target.value);
    next.set("page", "1"); // ← add this
    setSearchParams(next);
  }

  return (
    <Select options={options} onChange={handleChange} value={sortBy}></Select>
  );
}

SortBy.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default SortBy;
