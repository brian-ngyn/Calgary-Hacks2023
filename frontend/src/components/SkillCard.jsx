import { useNavigate } from "react-router-dom";

function SkillCard( props ) {
	const navigate = useNavigate();
	const data = props.data;
	const handleClick = () => {
		navigate("/instructors/" + data.name, {state : data});
	}
	// data.picture_Url, data.name, data.usersInvolved
	return (
		<div
			onClick={handleClick}
			className="bg-accent/5 rounded p-4 flex justify-between hover:scale-[102%] transition-scale hover:cursor-pointer duration-150"
		>
			<div className="flex flex-col justify-between">
				<div className="text-xl">
					{data.name}
				</div>
				<div className="text-sm">
					Active users: {data.usersInvolved}
				</div>
			</div>
			<div className="lg:w-[60px] lg:h-[60px] w-[50px] h-[50px]">
				<img src={data.picture_Url} width="100%" height="100%">
				</img>
			</div>
		</div>
	)
}

export default SkillCard;
