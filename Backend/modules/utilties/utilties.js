export const responseFunction = (req, res, err, result, secondCondition, message = 'Somthing went Wrong') => {
    if (err) {
        res.json({ message: 'query error', err })
    } else {
        if (secondCondition) {
            res.json({ message: "done", result })
        } else {
            res.json({ message: message, result })
        }
    }
}

export const addToQuery = (searchQuery, query) => {
    if (!searchQuery.length) {
        searchQuery += query
    } else {
        searchQuery += ` AND ${query}`
    }
    return searchQuery
}