import * as React from "react";
import {Button} from "@mui/material";
import Collapse from "@mui/material/Collapse";

export default function ShowMore() {
	const [checked, setChecked] = React.useState(false);

	const handleChange = () => {
		setChecked(prev => !prev);
	};

	return (
		<>
			<Collapse in={checked}></Collapse>
			<Button onClick={handleChange}>
				{checked ? "Show Less" : "Show More"}
			</Button>
		</>
	);
}
