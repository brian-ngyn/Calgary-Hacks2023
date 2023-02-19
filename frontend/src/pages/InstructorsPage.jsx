import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InstructorCard from "../components/InstructorCard";
import axios from "axios";

const INSTRUCTORS_GRID = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 place-content-evenly gap-10" 

function InstructorsPage() {
	const [instructors, setInstructors] = useState(null);
	const location = useLocation();
	const data = location.state;

	useEffect(() => {
		axios.get(`https://jos6ylumd75az7s4a5ajqyaqoi0iafmd.lambda-url.us-west-2.on.aws/instructors/${data.name}`)
		.then((response) => console.log(response))
	}, []);

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
				{/* {UserData.map((data, index) => {
					return (
						<InstructorCard key={index} data={data}/>
					)
				})} */}
			</div>
		</div>
	);
}

export default InstructorsPage;