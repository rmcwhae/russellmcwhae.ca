// Via: https://stackoverflow.com/questions/42761068/paginate-javascript-array
export function paginate(array, pageSize, currentPage) {
    // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
    return array.slice((currentPage - 1) * pageSize, currentPage * pageSize)
}
