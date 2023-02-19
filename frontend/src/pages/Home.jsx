import { useState, useEffect } from "react";
import InstructorCard from "../components/InstructorCard";
import SkillCard from "../components/SkillCard";
import { UserData } from "../../data.js";
import { useUserAuth } from "../authentication/UserAuthContext";
import axios from "axios";

const HEADER = "text-4xl font-black mb-5 text-black border-b-4 border-accent w-fit pb-2"
const INSTRUCTOR_CAROUSEL = "flex flex-row overflow-scroll h-fit gap-12 pb-5 no-scrollbar" 
const HOBBY_GRID = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 pb-10" 

function Home() {
	const { docSnap } = useUserAuth();
	const [skillData, setSkillData] = useState(null);
	// console.log(docSnap);

	useEffect(() => {
		axios.get("https://jos6ylumd75az7s4a5ajqyaqoi0iafmd.lambda-url.us-west-2.on.aws/skills")
		.then((response) => setSkillData(response.data));
	}, []);

  return (
    <>
		{skillData ? (
			<div className="px-[9%] bg-white font-Varela text-black">
				<div>
					<div className="h-1/2 pt-10 mb-5">
						<h2 className={HEADER}>Recommended Instructors</h2>
						<p className="text-lg w-1/2 mb-5">
							Based on your interests and skills, we picked out these highly-talented individuals to help
							you out! Click on any of their tiles to find out more about them and get connected!
						</p>
						<div className={INSTRUCTOR_CAROUSEL}>
							{UserData.map((data, index) => {
								return (
									<InstructorCard key={index} data={data} user={docSnap}/>
								)
							})}
						</div>
					</div>
				<div>
						<h2 className={HEADER}>Pick Up a New Hobby</h2>
						<p className="text-lg w-2/3 mb-5">
							Looking to pick up a new skill or hobby? Check out any of the categories we have below and 
							see what's trending among your fellow peers! Click on any of the tiles to check out the list of instructors
							for each skill!
						</p>
					</div>
					<div className={HOBBY_GRID}>
						{
							skillData.map((data, index) => {
								return (
									<SkillCard key={index} data={data}/>
								)
						})}
					</div>
				</div>
			</div>

		): (
			<div className="bg-white min-h-screen"/>
		)
		}
    </>
  )
}

export default Home;