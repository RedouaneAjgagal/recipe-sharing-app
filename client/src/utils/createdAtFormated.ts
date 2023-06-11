const createdAtFormated = (createdAt: Date) => {
    const currentDate = new Date();
    const getSeconds = currentDate.getSeconds() - createdAt.getSeconds();
    const getMinutes = currentDate.getMinutes() - createdAt.getMinutes();
    const getHours = currentDate.getHours() - createdAt.getHours();
    const getDays = currentDate.getDay() - createdAt.getDay();
    const getMonths = currentDate.getMonth() - createdAt.getMonth();
    const getYears = currentDate.getFullYear() - createdAt.getFullYear();

    if (getYears) {
        const msg = getYears === 1 ? `${getYears} year ago` : `${getYears} years ago`;
        return msg;
    }
    if (getMonths) {
        const msg = getMonths === 1 ? `${getMonths} month ago` : `${getMonths} months ago`;
        return msg;
    }
    if (getDays) {
        const msg = getDays === 1 ? `${getDays} day ago` : `${getDays} day ago`;
        return msg;
    }
    if (getHours) {
        const msg = getHours === 1 ? `${getHours} hour ago` : `${getHours} hours ago`;
        return msg;
    }
    if (getMinutes) {
        const msg = getMinutes === 1 ? `${getMinutes} minute ago` : `${getMinutes} minutes ago`;
        return msg;
    }

    // seconds
    const msg = getSeconds === 1 ? `${getSeconds} second ago` : `${getSeconds} seconds ago`;
    return msg;

}

export default createdAtFormated;