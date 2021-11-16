import React from "react";

/**
 * Default filter method, filters by the string received on "filterValue".
 * Can be used in any column.
 * 
 * @returns Input field to introduce text, and the listeners to search upon it.
 */
function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
    const count = preFilteredRows.length;

    return (
        <input
            value={filterValue || ''}
            onChange={e => setFilter(e.target.value || undefined)}
            placeholder={`Search ${count} records...`}
        />
    );
}

export default DefaultColumnFilter;