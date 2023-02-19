import { useNavigate } from "react-router-dom";

function InstructorCard( props ) {
	const navigate = useNavigate();
	const data = props.data;
	const handleClick = () => {
		navigate("/portfolio/" + data.firstName + data.lastName, { state: data });
	}

	return(  
		<div
			className="flex flex-col shadow-md w-[250px] h-[250px] rounded-lg justify-center items-center text-center hover:cursor-pointer hover:bg-black/5 ease-in duration-300"
			onClick={() => handleClick()}
		>
			<img className="w-[100px] h-[100px] rounded-full mb-5" src={data.imageUrl}/>
			<div className="px-5 w-[400px]">
				<h2 className="font-bold text-2xl mb-1">{data.firstName} {data.lastName}</h2>
				<p className="font-extralight text-sm">{data.interests[0]}, {data.interests[1]}, {data.interests[2]}</p>
			</div>
		</div>
	)
}

export default InstructorCard;
