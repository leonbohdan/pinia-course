import { defineStore } from "pinia";
import { groupBy } from "lodash";

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
