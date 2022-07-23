export const getUserFullName = ({ firstName, lastName } = {}) => {
    return [firstName, lastName].join(" ")
}