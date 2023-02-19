import { useLocation } from "react-router-dom";
import { UserData } from "../../data.js";
import InstructorCard from "../components/InstructorCard";

const INSTRUCTORS_GRID = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 place-content-evenly gap-10" 

function InstructorsPage() {
	const location = useLocation();
	const data = location.state;

	return (  
		<div className="min-h-screen bg-white font-Varela px-[9%] pt-10">
			<h2 className="text-5xl font-bold mb-5 border-b-4 border-accent w-fit pb-5">{data.name} Instructors</h2>
			<p className="text-xl w-1/2 mb-10">
				Find peers that also share your love for <span className="text-2xl font-bold mr-1">{data.name}!</span> 
				These individuals love what they do and would love to share their experience with others too. Select from the 
				few great instructors below!
			</p>
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