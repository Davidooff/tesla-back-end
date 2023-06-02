export const userController = (login: string, password: string) => {
    if (password.length < 8) {
        return false;
    } else {
        return;
    }
};
