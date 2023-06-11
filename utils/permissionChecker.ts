import UnauthorizedError from "../errors/unauthorized";

const checkPermission = (ressourceId: string, requestId: string) => {    
    if (ressourceId.toString() === requestId.toString()) {
        return;
    }
    throw new UnauthorizedError("You dont have access to these ressources");
}

export default checkPermission;