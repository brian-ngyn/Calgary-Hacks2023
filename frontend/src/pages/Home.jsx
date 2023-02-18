import InstructorCard from "../components/InstructorCard";
import HobbyCard from "../components/HobbyCard";
import { UserData } from "../../data.js";

const HEADER = "text-4xl font-bold mb-5"
const INSTRUCTOR_CAROUSEL = "flex flex-row overflow-scroll h-fit gap-12 pb-5" 
const HOBBY_GRID = "flex flex-row flex-wrap gap-12 pb-10" 


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
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
							<HobbyCard/>
						</div>
					</div>
				</div>
				
			</div>
    </>
  )
}

export default Home;