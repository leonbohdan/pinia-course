import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore.js";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: [],
        };
    },

    getters: {
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: (state) => {
            const grouped = groupBy(state.items, item => item.name);
            const sorted = Object.keys(grouped).sort();
            let inOrder = {};
            sorted.forEach(key => inOrder[key] = grouped[key]);
            return inOrder;
        },
        groupCount: (state) => (name) => state.grouped[name].length,
        totalPrice: (state) => state.items.reduce((total, next) => total + next.price, 0),
    },

    actions: {
        checkout() {
            const authUserStore = useAuthUserStore();

            alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.totalPrice}`);
        },

        addItems(count, item) {
            count = parseInt(count);

            for (let i = 0; i < count; i++) {
                this.items.push({...item});
            }
        },

        removeItem(name) {
            this.items = this.items.filter(item => item.name !== name);
        },

        setItemCount(item, count) {
            this.removeItem(item.name);
            this.addItems(count, item);
        }
    }
});

// make sure to pass the right store definition, `useAuth` in this case.
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot))
}
