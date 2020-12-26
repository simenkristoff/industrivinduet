
export const checkUserIsAdmin = currentUser => {
    if(!currentUser || !Array.isArray(currentUser.permissions)){
        return false;
    }

    const {permissions} = currentUser;
    if(permissions.includes('PERMISSION_ADMIN')){
        return true;
    }

    return false;
};