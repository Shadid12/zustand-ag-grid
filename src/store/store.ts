import { create } from 'zustand';

export type ICar = {
    make: string;
    model: string;
    price: number;
    electric: boolean;
};
  
interface CarStore {
    rowData: ICar[];
    loading: boolean;
    fetchRowData: () => void;
    addRow: (newCar: ICar) => void;
}
  
const useStore = create<CarStore>((set) => ({
    // Start with an empty array (or you could prepopulate if needed)
    rowData: [],
    loading: false,
    // Function to simulate an API call that fetches the row data
    fetchRowData: () => {
        // Set loading to true before starting the "API call"
        set({ loading: true });
        // Simulate an API delay of 2 seconds
        setTimeout(() => {
            const data: ICar[] = [
                { make: "Tesla", model: "Model Y", price: 64950, electric: true },
                { make: "Ford", model: "F-Series", price: 33850, electric: false },
                { make: "Toyota", model: "Corolla", price: 29600, electric: false },
                { make: "Mercedes", model: "EQA", price: 48890, electric: true },
                { make: "Fiat", model: "500", price: 15774, electric: false },
                { make: "Nissan", model: "Juke", price: 20675, electric: false },
            ];
            // Update the state with the fetched data
            set({ rowData: data, loading: false });
        }, 2000);
    },

    addRow: (newCar: ICar) => {
        set((state) => ({
          rowData: [...state.rowData, newCar],
        }));
    },
}));
  
export default useStore;
