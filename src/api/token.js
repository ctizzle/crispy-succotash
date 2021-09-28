const TOKEN_KEY = 'token';

export default {
    getTokenLocal: function() {
        return localStorage.getItem(TOKEN_KEY);
    },

    storeTokenLocal: function(token) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    removeTokenLocal: function() {
        localStorage.removeItem(TOKEN_KEY);
    }
}