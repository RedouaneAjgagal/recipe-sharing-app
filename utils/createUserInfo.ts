import User from "../models/user"

const createUserInfo = (userInfo: User) => {
    return { id: userInfo._id, name: userInfo.name, role: userInfo.role }
}

export default createUserInfo;