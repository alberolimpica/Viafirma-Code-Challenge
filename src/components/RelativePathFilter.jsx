import React from "react";

/**
 * Custom relative path filter method, filters by 3 individual combos containing environment, area and country.
 * 
 * @returns A set of 3 combos that can be drawn by React and used as filters
 */
function RelativePathCustomFilter(filterData) {
    const { column: { filterValue = {}, setFilter, preFilteredRows } } = filterData;

    // Based on the rows available to filter, calculate the combobox unique values
    const options = RelativePathUniqueOptions(preFilteredRows);

    // Combos structures and listeners
    return (
        <div>
            <select
                value={filterValue.env}
                onChange={e => {
                    setFilter({ ...filterValue, env: e.target.value || undefined })
                }}>
                <option value="">All</option>
                {
                    options.env.map((option, i) => (
                        <option key={i} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
            <select
                value={filterValue.area}
                onChange={e => {
                    setFilter({ ...filterValue, area: e.target.value || undefined })
                }}>
                <option value="">All</option>
                {
                    options.area.map((option, i) => (
                        <option key={i} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
            <select
                value={filterValue.country}
                onChange={e => {
                    setFilter({ ...filterValue, country: e.target.value || undefined })
                }}>
                <option value="">All</option>
                {
                    options.country.map((option, i) => (
                        <option key={i} value={option}>
                            {option}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

/**
 * Parses the field relativePath and extracts all unique values for environment, area and country.
 * 
 * relativePath follows the format:
 *      environment/area/country/caName/policyId
 * 
 * @param rows Collection of individual rows on the table.
 * @returns An object containing collections for environment, area and country (unique values only)
 */
function RelativePathUniqueOptions(rows) {
    return React.useMemo(() => {
        const valuesEnv = new Set();
        const valuesArea = new Set();
        const valuesCountry = new Set();

        rows.forEach(row => {
            const splitedString = row.values.relativePath.split("/");

            valuesEnv.add(splitedString[0]);
            valuesArea.add(splitedString[1]);
            valuesCountry.add(splitedString[2]);
        });

        return {
            env: Array.from(valuesEnv),
            area: Array.from(valuesArea),
            country: Array.from(valuesCountry)
        }
    }, [rows]);
}

export default RelativePathCustomFilter;
