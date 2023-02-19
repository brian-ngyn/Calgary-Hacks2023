import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import InstructorCard from "../components/InstructorCard";
import axios from "axios";
import { useUserAuth } from "../authentication/UserAuthContext";
import CircularProgress from '@mui/material/CircularProgress';

const INSTRUCTORS_GRID = "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 place-content-evenly gap-10" 

function InstructorsPage() {
	const [instructorsThatTeachHobby, setInstructorsThatTeachHobby] = useState([]);
	const [loading, setLoading] = useState(true);
	const location = useLocation();
	const data = location.state;
	const { docSnap } = useUserAuth();

	useEffect(() => {
		axios.get(`https://4ltkqflxgpkhdmqkrjm5w3ia340gceyn.lambda-url.us-west-1.on.aws/instructors/${data.name}`)
		.then((response) => {
			setInstructorsThatTeachHobby(response.data);
			setLoading(false);
		})
	}, []);

	return (  
		<div className="min-h-screen bg-white font-body px-[9%] pt-10">
			<h2 className="text-5xl font-header mb-5 border-b-4 border-accent w-fit pb-5">{data.name} Instructors</h2>
			<p className="text-xl w-1/2 mb-10">
				Find peers that also share your love for {data.name.toLowerCase()}!
				These individuals love what they do and would love to share their experience with others too. Select from the 
				few great instructors below!
			</p>
			{loading ? 
				<CircularProgress></CircularProgress>
			:
				instructorsThatTeachHobby.length !== 0 ? 
					<div className={INSTRUCTORS_GRID}>
						{instructorsThatTeachHobby.map((data, index) => {
							if (data.id != docSnap.id){
								return (
									<InstructorCard key={index} data={data}/>
								)
							}
						})}
					</div>
				:
					<div className="font-body">
						No instructors available at the moment. Check again soon!
					</div>
				}
		</div>
	);
}

export default InstructorsPage;