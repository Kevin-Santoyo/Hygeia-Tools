let decimalSort = (rowA, rowB, id) => {
    if (rowA.values[id] > rowB.values[id]) return 1;
    if (rowB.values[id] > rowA.values[id]) return -1;
    return 0;
}

export default decimalSort;