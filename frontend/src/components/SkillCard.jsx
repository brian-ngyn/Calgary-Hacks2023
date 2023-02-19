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
			className="bg-accent/5 rounded lg:p-4 p-2 flex justify-between"
		>
			<div className="flex flex-col justify-between">
				<div className="text-xl">
					{data.name}
				</div>
				<div className="text-sm">
					Active users: {data.usersInvolved}
				</div>
			</div>
			<div className="lg:w-[80px] w-[50px]">
				<img src={"https://static.vecteezy.com/system/resources/previews/002/323/513/original/piano-isolated-icon-music-instrument-icon-symbol-free-vector.jpg"} width="100%" height="100%">
				</img>
			</div>
		</div>
	)
}

export default SkillCard;
