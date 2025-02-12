// App.tsx
import { useEffect, useMemo, useState } from "react";
import { AllCommunityModule, ModuleRegistry, ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import useStore, { ICar } from "./store/store";
import AddCarForm from "./AddCarForm";

// Register the AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
	// Retrieve rowData and fetchRowData from the Zustand store
	const rowData = useStore((state: { rowData: any; }) => state.rowData);
	const fetchRowData = 
		useStore((state: { fetchRowData: any; }) => state.fetchRowData);
	const loading = useStore((state) => state.loading);

	// When the component mounts, trigger the simulated API call
	useEffect(() => {
		fetchRowData();
	}, [fetchRowData]);

	// Column Definitions remain the same
	const [colDefs] = useState<ColDef<ICar>[]>([
		{ field: "make", editable: true, filter: true },
		{ field: "model" },
		{ field: "price", editable: true },
		{ field: "electric" },
	]);

	const defaultColDef = useMemo(() => ({ flex: 1 }), []);

	return (
		<div style={{ width: '100%', padding: '1rem' }}>
		  {/* Render the separate form component */}
		  <AddCarForm />
	
		  <div style={{ width: '100%', height: '80vh', marginTop: '1rem' }}>
			<AgGridReact
			  rowData={rowData}
			  columnDefs={colDefs as any}
			  defaultColDef={defaultColDef}
			  loading={loading}
			  loadingCellRenderer="agLoadingCellRenderer"
			/>
		  </div>
		</div>
	);
}

export default App;
