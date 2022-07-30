const UNKNOWN_ERROR = "UNKNOWN"

export const GQL_DUPLICATE_ERROR = "DUPLICATE"
export const GQL_FORBIDDEN_ERROR = "FORBIDDEN"
export const GQL_INTERNAL_ERROR = "INTERNAL_ERROR"
export const GQL_NOT_FOUND_ERROR = "NOT_FOUND"
export const GQL_UNAUTHORISED_ERROR = "UNAUTHORISED"

export const getGqlErrorCode = error => {
    const err = error?.graphQLErrors;
    try {
        if (Array.isArray(err)) {
            if (!err.length) return null
            if (err.length === 1) return err[0].extensions.code
        }
        return UNKNOWN_ERROR
    } catch {
        return UNKNOWN_ERROR
    }
}