import InstructorCard from "../components/InstructorCard";
import SkillCard from "../components/SkillCard";
import { UserData, SkillsData } from "../../data.js";
import { useUserAuth } from "../authentication/UserAuthContext";

const HEADER = "text-4xl font-black mb-5 text-accent"
const INSTRUCTOR_CAROUSEL = "flex flex-row overflow-scroll h-fit gap-12 pb-5 no-scrollbar" 
const HOBBY_GRID = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10" 

function Home() {
	const { docSnap } = useUserAuth();
	console.log(docSnap);
  return (
    <>
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
									<InstructorCard key={index} data={data}/>
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
							SkillsData.map((data, index) => {
								return (
									<SkillCard key={index} data={data}/>
								)
						})}
					</div>
				</div>
				
			</div>
    </>
  )
}

export default Home;