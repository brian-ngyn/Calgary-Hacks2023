import { useNavigate } from "react-router-dom";

function SkillCard( props ) {
	const navigate = useNavigate();
	const data = props.data;
	const handleClick = () => {
		navigate("/instructors/" + data.name, {state : data});
	}

	return (
		<div 
			className="flex flex-col shadow-md rounded-lg pb-4 text-center hover:cursor-pointer hover:bg-black/10 ease-in duration-200"
			onClick={() => handleClick()}
		>
			<img className="w-[350px] h-[300px] mb-2 rounded-t-lg" src={data.picture_Url}/>
			<h2 className="font-bold text-accent">{data.name}</h2>
			<p className="font-thin">Users Active: {data.usersInvolved}</p>
		</div>
	)
}

export default SkillCard;
