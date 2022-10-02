import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => {
        return {
            username: "Bohdan"
        };
    },

    getters: {
        getterusername: (state) => state.username,
    },
});
