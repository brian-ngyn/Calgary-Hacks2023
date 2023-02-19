import { useUserAuth } from "../authentication/UserAuthContext";

function PortfolioCard(props) {
	const data = props.data;

	return ( 
		<div className="shadow-md bg-[#FFFFFF] justify-center items-center rounded-2xl p-2">
			<img className="object-cover mb-5" src={data.media[0]}/>
			<div>
				<div>
					{data.skill}
				</div>
			</div>
		</div>		
	 );
}

export default PortfolioCard;