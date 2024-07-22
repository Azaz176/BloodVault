import moment from 'moment'
export const getLoggedInUserName = (user) => {
    if (!user || !user.userType) {
        return "Unknown User"; // Handle case where user or userType is undefined
    }

    switch (user.userType) {
        case "donor":
            return user.name;
        case "hospital":
            return user.hospitalName;
        case "organization":
            return user.organizationName;
        default:
            return "Unknown User Type"; // Handle unknown user types
    }
};

export const getAndInputValidation = () => {
    return [
        {
            required: true,
            message: "Required",
        },
    ];
};

export const getDateFormat= (date)=>{
    return moment(date).format("DD MMM YYYY hh:mm A")
}