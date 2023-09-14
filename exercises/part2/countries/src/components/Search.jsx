const Search = ({ text, handleChange }) =>
  <div>
    find countries <input type="text" value={text} onChange={handleChange} />
  </div>

export default Search
