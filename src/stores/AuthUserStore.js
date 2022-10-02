import { defineStore } from "pinia";

export const useAuthUserStore = defineStore("AuthUserStore", {
    state: () => {
        return {
            username: "leonbohdan"
        };
    },

    getters: {
        getterusername: (state) => state.username,
    },

    actions: {
        visitGithubProfile() {
            window.open(`https://github.com/${this.username}`);
        },
    }
});
