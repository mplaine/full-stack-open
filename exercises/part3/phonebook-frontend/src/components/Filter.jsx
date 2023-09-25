const Filter = ({ text, handleChange }) =>
  <div>
    filter shown with <input type="text" value={text} onChange={handleChange} />
  </div>

export default Filter
