import InstructorCard from "../components/InstructorCard";
import HobbyCard from "../components/HobbyCard";

const HEADER = "text-3xl font-bold mb-5"
const INSTRUCTOR_CAROUSEL = "flex flex-row overflow-scroll h-fit gap-12 pb-5 w" 
const HOBBY_GRID = "flex flex-row flex-wrap gap-12" 

function Home() {
  return (
    <>
			<div className="bg-white text-black min-h-screen pl-20 overflow-hidden">
				<div className="w-screen h-1/2 pt-10 mb-5">
					<h2 className={HEADER}>Recommended Instructors</h2>
					<div className={INSTRUCTOR_CAROUSEL}>
						<InstructorCard/>
						<InstructorCard/>
						<InstructorCard/>
						<InstructorCard/>
						<InstructorCard/>
						<InstructorCard/>
						<InstructorCard/>
						<InstructorCard/>
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
    </>
  )
}

export default Home;