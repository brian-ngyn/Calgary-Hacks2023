import InstructorCard from "../components/InstructorCard";
import SkillCard from "../components/SkillCard";
import { UserData, SkillsData } from "../../data.js";

const HEADER = "text-4xl font-bold mb-5"
const INSTRUCTOR_CAROUSEL = "flex flex-row overflow-scroll h-fit gap-12 pb-5 no-scrollbar" 
const HOBBY_GRID = "grid grid-cols-4 gap-10 pb-10" 


function Home() {
  return (
    <>
			<div className="px-[9%] bg-white font-Varela">
				<div>
					<div className="h-1/2 pt-10 mb-5">
						<h2 className={HEADER}>Recommended Instructors</h2>
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
				
			</div>
    </>
  )
}

export default Home;