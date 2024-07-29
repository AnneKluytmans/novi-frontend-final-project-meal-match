import { jwtDecode } from 'jwt-decode';

function isTokenValid(JWT) {
    const decodedToken = jwtDecode(JWT);
    const tokenExpirationInUnix = decodedToken.exp;

    const now = new Date().getTime();
    const nowInUnix = Math.round(now / 1000);

    return tokenExpirationInUnix - nowInUnix > 0;
}

export default isTokenValid;