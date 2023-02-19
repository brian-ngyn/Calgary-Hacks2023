import { Link, useNavigate } from "react-router-dom";

function SkillCard( props ) {
	const navigate = useNavigate();
	const data = props.data;
	const handleClick = () => {
		navigate("/instructors/" + data.name, {state : data});
	}

	return (
		<div 
			className="flex flex-col shadow-md rounded-lg text-center hover:cursor-pointer hover:bg-black/10 ease-in duration-300"
			onClick={() => handleClick()}
		>
			<Link to=""/>
			<img className="w-[350px] h-[300px] mb-2 rounded-t-lg" src={data.imageURL}/>
			<h2 className="font-thin pb-2">{data.name}</h2>
		</div>
	)
}

export default SkillCard;
