const Filter = (props) => {
   return (
      <div>
         Filter hown with: <input value={props.filter} onChange={props.handleFilterChange} />
      </div>
   )
}

export default Filter;