const createdAtFormated = (createdAt: Date) => {
    const now = new Date();
    const passedTime = now.getTime() - createdAt.getTime();
    const getSeconds = Math.floor(passedTime / 1000);
    const getMinutes = Math.floor(passedTime / 60 / 1000);
    const getHours = Math.floor(passedTime / 60 / 60 / 1000);
    const getDays = Math.floor(passedTime / 24 / 60 / 60 / 1000);
    const getWeeks = Math.floor(passedTime / 7 / 24 / 60 / 60 / 1000);
    const getMonths = Math.floor(passedTime / 4 / 7 / 24 / 60 / 60 / 1000);
    const getYears = Math.floor(passedTime / 12 / 4 / 7 / 24 / 60 / 60 / 1000);

    if (getYears) {
        const msg = getYears === 1 ? `${getYears} year ago` : `${getYears} years ago`;
        return msg;
    }
    if (getMonths) {
        const msg = getMonths === 1 ? `${getMonths} month ago` : `${getMonths} months ago`;
        return msg;
    }
    if (getWeeks) {
        const msg = getWeeks === 1 ? `${getWeeks} week ago` : `${getWeeks} weeks ago`;
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