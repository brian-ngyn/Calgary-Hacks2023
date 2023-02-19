import { useUserAuth } from "../authentication/UserAuthContext";

function PortfolioCard() {
	const docSnap = useUserAuth();
	console.log(docSnap)

	return ( 
		<div className="shadow-md w-[250px] h-[280px] bg-[#FFFFFF] flex flex-col justify-center items-center rounded-2xl">
			<img className="w-[200px] h-[180px] mb-5" src={""}/>
			<h2>SPORT</h2>
		</div>		
	 );
}

export default PortfolioCard;