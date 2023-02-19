import { useNavigate } from "react-router-dom";
import LoopIcon from '@mui/icons-material/Loop';

function InstructorCard( props ) {
	const navigate = useNavigate();
	const data = props.data;
	const handleClick = () => {
		navigate("/portfolio/" + data.firstName + data.lastName, { state: data });
	}

	return(  
		<div
			className="flex flex-col w-[250px] h-[250px] rounded-lg justify-center items-center text-center hover:cursor-pointer hover:bg-black/5 ease-in duration-300 static"
			onClick={() => handleClick()}
		>
			<div className="bg-accent w-8 h-8 rounded-full relative animate-bounce top-0 self-end p-auto">
				<LoopIcon/>
			</div>
			<img className="w-[100px] h-[100px] rounded-full mb-4" src={data.imageUrl}/>
			<div className="px-5 w-60">
				<h2 className="font-bold text-2xl mb-1" >{data.firstName} {data.lastName}</h2>
				<ul className="flex flex-wrap gap-2 justify-items-start justify-center">
					{data.interests.slice(0, 3).map((data, index) => {
						return(
							<li key={index} className="text-sm font-thin bg-accent/10 rounded-full h-5 px-4 text-accent">{data}</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}

export default InstructorCard;
