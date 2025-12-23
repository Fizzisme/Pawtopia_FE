/**
 * @typedef {Object} PriceFilterState
 * @property {number} min - The minimum price value.
 * @property {number} max - The maximum price value.
 */

/**
 * @param {Object} props
 * @param {PriceFilterState} props.priceFilter
 * @param {(nextState: PriceFilterState | ((prev: PriceFilterState) => PriceFilterState)) => void} props.onApply - Callback to update the filter. It accepts either a `{ min, max }` object or a function that receives the previous state and returns the new one.
 * @param {() => void} props.onReset - Callback to reset the filter to its default state.
 * @param {(nextScheme: string | (prev: string => string)) => void} props.onSortSchemeChange - Callback to update the sort scheme.
 * @param {string} sortScheme
 * @returns {JSX.Element}
 */
export const ProductToolbar = ({ sortScheme, onApply: applyPriceFilter, priceFilter, onReset: resetPriceFilter, onSortSchemeChange: changeSortScheme }) => {
    return (
        <div className="py-4 w-full bg-linear-to-r px-[100px] from-pink-50 to-white border-b border-pink-100 shadow-sm sticky top-0 z-10 backdrop-blur-sm bg-opacity-90">
            <div className="px-4 sm:px-6">
                <div className="flex flex-col lg:flex-row items-center gap-4">

                    {/* Left Section: Label & Inputs */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">

                        {/* Title with Icon */}
                        <div className="flex items-center gap-2 text-pink-800 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                            </svg>
                            <span className="font-bold tracking-wide text-sm uppercase">Lọc giá</span>
                        </div>

                        {/* Input Group */}
                        <div className="flex items-center gap-2 w-full sm:w-auto bg-white p-1 rounded-lg border border-pink-200 shadow-sm focus-within:ring-2 focus-within:ring-pink-300 focus-within:border-pink-300 transition-all">
                            <input
                                type="number"
                                min="0"
                                value={priceFilter.min}
                                onChange={({ target: { valueAsNumber } }) => applyPriceFilter((prev) => ({ ...prev, min: valueAsNumber }))}
                                className="w-28 px-3 py-1.5 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none text-center bg-transparent"
                            />
                            <span className="text-pink-300 font-light px-1">|</span>
                            <input
                                type="number"
                                min="0"
                                value={priceFilter.max}
                                onChange={({ target: { valueAsNumber } }) => applyPriceFilter((prev) => ({ ...prev, max: valueAsNumber }))}
                                className="w-28 px-3 py-1.5 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none text-center bg-transparent"
                            />
                        </div>
                    </div>

                    {/* Right Section: Quick Presets & Reset */}
                    <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-end w-full lg:w-auto">
                        <PresetButton onClick={() => applyPriceFilter({ min: 0, max: 100000 })}>
                            &lt; 100k
                        </PresetButton>

                        <PresetButton onClick={() => applyPriceFilter({ min: 100000, max: 300000 })}>
                            100k - 300k
                        </PresetButton>

                        <PresetButton onClick={() => applyPriceFilter({ min: 300000, max: 1000000 })}>
                            &gt; 300k
                        </PresetButton>

                        <div className="w-px h-6 bg-pink-200 mx-1 hidden sm:block"></div>

                        <button
                            type="button"
                            onClick={resetPriceFilter}
                            className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-pink-600 bg-pink-50 hover:bg-pink-100 rounded-lg transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:-rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Đặt lại
                        </button>
                    </div>

                    {/* Sort section */}
                    <div className="ml-auto">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-3">
                                <label htmlFor="sort-select" className="text-sm text-gray-600 font-medium hidden sm:block">
                                    Sắp xếp theo:
                                </label>

                                <div className="relative group">
                                    {/* Custom Select Icon (Chevron) */}
                                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-pink-500 group-hover:text-pink-700 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>

                                    {/* Styled Native Select */}
                                    <select
                                        id="sort-select"
                                        onChange={({ target: { value } }) => changeSortScheme(value)}
                                        value={sortScheme}
                                        className="appearance-none pl-4 pr-10 py-2 bg-white border border-pink-200 text-pink-700 text-sm font-medium rounded-full shadow-sm hover:border-pink-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all cursor-pointer w-full sm:w-48"
                                    >
                                        <option value="price_asc">Giá: Thấp đến Cao</option>
                                        <option value="price_desc">Giá: Cao đến Thấp</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const PresetButton = ({ children, onClick }) => (
    <button
        type="button"
        onClick={onClick}
        className="px-4 py-1.5 rounded-full text-sm font-medium text-pink-600 bg-white border border-pink-200 shadow-sm hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:shadow-md active:scale-95 transition-all duration-200 ease-in-out"
    >
        {children}
    </button>
);
