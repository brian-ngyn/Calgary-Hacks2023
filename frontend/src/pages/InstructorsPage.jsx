import { useLocation } from "react-router-dom";
import { UserData } from "../../data.js";
import InstructorCard from "../components/InstructorCard";

const INSTRUCTORS_GRID = "grid grid-cols-5 place-content-evenly gap-10" 

function InstructorsPage() {
	const location = useLocation();
	const data = location.state;

	return (  
		<div className="min-h-screen bg-white font-Varela px-[9%] pt-10">
			<h2 className="text-4xl font-bold mb-5">{data.name} Instructors</h2>
			<div className={INSTRUCTORS_GRID}>
				{/* {Going to make a call to all instructors that have the specified hobby} */}
				{UserData.map((data, index) => {
					return (
						<InstructorCard key={index} data={data}/>
					)
				})}
			</div>
		</div>
	);
}

export default InstructorsPage;