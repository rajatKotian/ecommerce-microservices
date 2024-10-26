import { Schema } from "express-validator";
import { ERROR_MESSAGES } from "../../../../utils/constants";

export const paginationSchema: Schema = {
    limit: {
        in: ['body'],
        isInt: {
            options: { min: 1 },
            errorMessage: ERROR_MESSAGES.LIMIT_VALIDATION,
        },
        toInt: true, // Converts the value to an integer
    },
};
